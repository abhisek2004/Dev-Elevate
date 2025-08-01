# chatbotBackend/utils/pdfLoader.py
import fitz  # PyMuPDF

def load_pdf(path: str) -> list:
    doc = fitz.open(path)
    pages = []
    for page in doc:
        text = page.get_text().strip()
        if text:
            pages.append(text)
    return pages
