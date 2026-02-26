import os
from typing import List, Optional
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from fastapi.responses import StreamingResponse # <-- NEW
from groq import AsyncGroq # <-- CHANGED

# Groq Client
from groq import Groq

# LangChain components
# LangChain components
from langchain_community.vectorstores.upstash import UpstashVectorStore
# Replace HuggingFaceEndpointEmbeddings
from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_core.prompts import ChatPromptTemplate

# 1) Load Env
load_dotenv()

# Verify API Key
if not os.getenv("GROQ_API_KEY"):
    print("⚠️ WARNING: GROQ_API_KEY not found in .env file!")

app = FastAPI()

# 2) CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This version is a simple HTTP call. It doesn't load heavy ML libraries.
embedding_model = HuggingFaceEndpointEmbeddings(
        model="sentence-transformers/all-MiniLM-L6-v2",
        task="feature-extraction",
        huggingfacehub_api_token=os.environ.get("HF_TOKEN")
    )

# 3) Load Vector Store with Explicit Credentials
print("⏳ Connecting to Upstash Vector DB...")
try:
    # Fetch credentials explicitly
    UPSTASH_URL = os.getenv("UPSTASH_VECTOR_REST_URL")
    UPSTASH_TOKEN = os.getenv("UPSTASH_VECTOR_REST_TOKEN")

    if not UPSTASH_URL or not UPSTASH_TOKEN:
        raise ValueError("Missing Upstash Credentials in .env")

    vector_store = UpstashVectorStore(
        embedding=embedding_model,
        index_url=UPSTASH_URL,
        index_token=UPSTASH_TOKEN
    )
    
    retriever = vector_store.as_retriever(
        search_type="similarity", # Changed from MMR for better accuracy on facts
        search_kwargs={"k": 5} 
    )
    print("✅ Vector Store Online and Verified!")
    
except Exception as e:
    print(f"❌ CRITICAL: Vector Store failed to initialize: {e}")
    retriever = None

# 4) Groq Client
# 4) Groq Client (Async for Streaming)
client = AsyncGroq(api_key=os.environ.get("GROQ_API_KEY"))
# 5) Prompt with History Support


template = """
You are Ankit's professional AI Portfolio Assistant.

**INSTRUCTIONS:**
1. **ANSWERING:** Use the **Context** below to answer the user's question accurately. 
2. **FORMATTING:** Provide comprehensive but easy-to-read answers. Use bullet points (-) to list skills, projects, or experiences. Do not restrict the length if the user asks for a list (like "what are his skills").
3. **SUBTLE PROMOTION:** If appropriate, end your answer with one short sentence highlighting why Ankit is a strong candidate.
4. **MISSING INFO:** If the context does not contain the answer, simply say "I don't have that specific information, but I can tell you about Ankit's projects and skills."

**Chat History:**
{chat_history}

**Context:**
{context}

**User Question:** {question}

**Answer:**
"""






prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs):
    return "\n\n".join([d.page_content.replace("\n", " ") for d in docs])

def format_history(history):
    """
    Converts the list of messages into a string for the prompt.
    """
    formatted_history = ""
    # We only take the last 4 messages to save tokens
    for msg in history[-4:]:
        # FIX: Use dot notation (msg.role) instead of brackets (msg['role'])
        role = "User" if msg.role == 'user' else "AI"
        formatted_history += f"{role}: {msg.content}\n"
    return formatted_history if formatted_history else "No previous history."
# 6) Updated API Schema
class Message(BaseModel):
    role: str
    content: str

class QueryRequest(BaseModel):
    query: str
    history: List[Message] = []  # New field for history

def extract_sources(docs):
    sources = []
    seen = set()
    for d in docs:
        filename = os.path.basename(d.metadata.get("source", "Unknown"))
        if filename not in seen:
            sources.append({"source_file": filename, "snippet": d.page_content[:100] + "..."})
            seen.add(filename)
    return sources

from fastapi.responses import StreamingResponse
import json

# 7) Chat Endpoint (Now with Streaming!)
@app.post("/chat")
async def chat(request: QueryRequest):
    if not retriever:
        raise HTTPException(status_code=500, detail="Vector Store not loaded.")

    # We define an asynchronous generator function inside the route
    async def generate_chat_stream():
        try:
            # 1. Retrieve docs (Keep this synchronous if using standard Upstash client)
            docs = retriever.invoke(request.query)
            context_text = format_docs(docs)
            history_text = format_history(request.history)

            # 2. Format the prompt
            formatted_prompt = prompt.format(
                context=context_text, 
                question=request.query,
                chat_history=history_text
            )

            # 3. Call Groq asynchronously WITH stream=True
            stream = await client.chat.completions.create(
                messages=[{"role": "user", "content": formatted_prompt}],
                model="llama-3.1-8b-instant",
                temperature=0.6,
                max_tokens=300,
                stream=True # <-- CRITICAL FOR STREAMING
            )

            # 4. Yield each word as it generates
            async for chunk in stream:
                if chunk.choices[0].delta.content is not None:
                    yield chunk.choices[0].delta.content
                    
        except Exception as e:
            print(f"Streaming Error: {e}")
            yield f"Error generating response: {str(e)}"

    # Return the generator as a StreamingResponse
    return StreamingResponse(generate_chat_stream(), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)