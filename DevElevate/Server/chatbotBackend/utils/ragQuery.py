# chatbotBackend/utils/ragQuery.py
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.chains import RetrievalQA
from langchain_ollama import OllamaLLM
import os

from .pdfLoader import load_pdf

PDF_PATH = "chatbotBackend/data/chatbotInfo.pdf"
INDEX_DIR = "chatbotBackend/embeddings/vector_index"

def build_vector_index():
    text_chunks = load_pdf(PDF_PATH)

    splitter = CharacterTextSplitter(chunk_size=300, chunk_overlap=30)
    docs = splitter.split_text("\n".join(text_chunks))

    embeddings = OllamaEmbeddings(model="llama2")
    vectorstore = FAISS.from_texts(docs, embeddings)
    vectorstore.save_local(INDEX_DIR)
    return "Vector index built successfully."

def answer_query(query: str) -> str:
    try:
        embeddings = OllamaEmbeddings(model="llama2")
        db = FAISS.load_local(INDEX_DIR, embeddings,allow_dangerous_deserialization=True)
        retriever = db.as_retriever()
        llm = OllamaLLM(model="llama2")

        qa = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
        docs = retriever.get_relevant_documents(query)
        for i, doc in enumerate(docs):
            print(f"[Match {i+1}] {doc.page_content[:300]}")

        result= qa.invoke(query)
        return result
    except Exception as e:
        print(f"[ERROR] Query failed: {e}")
        return "I'm currently trained only on placement and DSA-related topics. Please try asking something from those areas!"
