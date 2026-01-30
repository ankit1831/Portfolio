from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnablePassthrough
from huggingface_hub import InferenceClient

# 1. Load Environment Variables (Your Token)
load_dotenv() 

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# --- ADD THIS SECTION ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all websites to talk to this server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ------------------------
# 3. Load the "Brain" (Vector Store) - Runs once when server starts
print("⏳ Loading Vector Store...")
try:
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vector_store = FAISS.load_local("faiss_index", embedding_model, allow_dangerous_deserialization=True)
    retriever = vector_store.as_retriever(search_kwargs={"k": 3})
    print("✅ Vector Store Loaded Successfully!")
except Exception as e:
    print(f"❌ Error loading vector store: {e}")

# 4. Define the Chat Function (The one we fixed!)
def query_zephyr_chat(prompt_text):
    token = os.getenv("HF_TOKEN")
    if not token:
        return "Error: HF_TOKEN not found. Check your .env file."

    client = InferenceClient(api_key=token)
    messages = [{"role": "user", "content": prompt_text}]
    
    try:
        response = client.chat_completion(
            model="HuggingFaceH4/zephyr-7b-beta",
            messages=messages,
            max_tokens=500,
            temperature=0.5
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error from AI: {e}"

# 5. Define the Chain
template = """You are Ankit's AI Portfolio Assistant. Answer strictly based on the context.
If the answer is not in the context, say "I don't have that info about Ankit."

Context:
{context}

Question: {question}

Answer:"""

prompt = ChatPromptTemplate.from_template(template)

def format_docs(docs):
    return "\n\n".join([d.page_content for d in docs])

rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | (lambda x: x.to_string())
    | query_zephyr_chat
)

# 6. Define the API Input (The "Door")
class QueryRequest(BaseModel):
    query: str

@app.post("/chat")
async def chat(request: QueryRequest):
    """
    This is the endpoint your website will call.
    It takes a question -> runs the chain -> returns the answer.
    """
    try:
        response_text = rag_chain.invoke(request.query)
        return {"answer": response_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 7. Health Check (To see if server is alive)
@app.get("/")
def home():
    return {"status": "AI Server is Active"}

if __name__ == "__main__":
    import uvicorn
    # Run the server on localhost:8000
    uvicorn.run(app, host="0.0.0.0", port=8000)