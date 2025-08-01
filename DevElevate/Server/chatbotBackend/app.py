# chatbotBackend/app.py
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from chatbotBackend.utils.ragQuery import answer_query, build_vector_index

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def init_vector_db():
    build_vector_index()

@app.post("/chat-pdf")
async def chat_with_pdf(request: Request):
    data = await request.json()
    query = data.get("question")

    if not query:
        return {"answer": "Please enter a question."}

    result = answer_query(query)
    return {"answer": result}
