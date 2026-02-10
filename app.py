import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Groq Client
from groq import Groq

# LangChain components (keeping your existing vector store logic)
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate

# 1) Load Environment Variables
load_dotenv()

# Verify API Key is present
if not os.getenv("GROQ_API_KEY"):
    print("⚠️ WARNING: GROQ_API_KEY not found in .env file!")

app = FastAPI()

# 2) CORS (Allowing access from your frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3) Load Embeddings + Vector Store
# We keep this part as-is because it works well for retrieval.
print("⏳ Loading Vector Store...")
try:
    embedding_model = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    vector_store = FAISS.load_local(
        "faiss_index",
        embedding_model,
        allow_dangerous_deserialization=True
    )
    # Increased 'k' slightly to give the LLM more context to work with
    retriever = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 5, "fetch_k": 20, "lambda_mult": 0.7}
    )
    print("✅ Vector Store Loaded Successfully!")
except Exception as e:
    print(f"❌ Error loading vector store: {e}")
    retriever = None

# 4) Initialize Groq Client
client = Groq(
    api_key=os.environ.get("GROQ_API_KEY"),
)

# 5) Improved Prompt Template
# I removed the strict "1-line" rule to allow for more natural, conversational answers.
template = """
You are Ankit's professional AI Portfolio Assistant. Your goal is to represent Ankit to recruiters and visitors.

**Instructions:**
1. Answer the user's question **enthusiastically and professionally**.
2. Use **ONLY** the provided Context to answer. Do not make up facts.
3. If the answer is not in the context, say: "I don't have that specific information about Ankit yet, but I can tell you about his projects or skills."
4. Keep answers concise (2-3 sentences max) unless the user asks for a detailed explanation.
5. Format your response nicely (use bullet points if listing multiple items).

**Context about Ankit:**
{context}

**User Question:** {question}

**Your Answer:**
"""

prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs) -> str:
    cleaned = []
    for d in docs:
        # Simple cleanup to remove excessive newlines/headers
        content = d.page_content.replace("\n", " ").strip()
        cleaned.append(content)
    return "\n\n".join(cleaned)

def query_groq_chat(prompt_text: str) -> str:
    """
    Sends the formatted prompt to Groq's Llama 3 model.
    """
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt_text,
                }
            ],
            model="llama-3.1-8b-instant", # Fast and capable
            temperature=0.6,        # Slight creativity for natural tone
            max_tokens=300,
        )
        return chat_completion.choices[0].message.content
    except Exception as e:
        return f"Error communicating with AI: {str(e)}"

# 6) API Request Schema
class QueryRequest(BaseModel):
    query: str

def extract_sources(docs, max_sources=3):
    """
    Helper to clean up source metadata for the UI.
    """
    sources = []
    seen = set()
    for d in docs:
        source = d.metadata.get("source", "Unknown")
        # Just get the filename, not the full path
        filename = os.path.basename(source)
        if filename not in seen:
            sources.append({"source_file": filename, "snippet": d.page_content[:100] + "..."})
            seen.add(filename)
            if len(sources) >= max_sources:
                break
    return sources

# 7) Chat Endpoint
@app.post("/chat")
async def chat(request: QueryRequest):
    if not retriever:
        raise HTTPException(status_code=500, detail="Vector Store not loaded.")

    try:
        # 1. Retrieve relevant documents
        docs = retriever.invoke(request.query)
        
        # 2. Format context
        context_text = format_docs(docs)

        # 3. Create prompt
        formatted_prompt = prompt.format(context=context_text, question=request.query)

        # 4. Get answer from Groq
        response_text = query_groq_chat(formatted_prompt)

        return {
            "answer": response_text,
            "sources": extract_sources(docs)
        }
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# 8) Health Check
@app.get("/")
def home():
    return {"status": "Ankit's AI Portfolio Server is Running 🚀"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)