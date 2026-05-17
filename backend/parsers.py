import fitz  # PyMuPDF
import io
from fastapi import UploadFile

async def parse_document(file: UploadFile) -> str:
    """
    Extracts raw text from uploaded PDF or DOCX documents.
    """
    text = ""
    content = await file.read()
    
    if file.filename.endswith(".pdf"):
        doc = fitz.open(stream=content, filetype="pdf")
        try:
            for page in doc:
                text += page.get_text()
        finally:
            doc.close()  # Critical for Memory Efficiency / Resource Handling
    elif file.filename.endswith(".docx"):
        # For a hackathon, we could use python-docx. PyMuPDF handles some XPS/DOCX but we'll stick to a simple fallback.
        # To save time, we will assume PDF for the demo or use python-docx.
        # Alternatively, we just use fitz if it supports it in this version, or fallback to returning text for testing.
        try:
            import docx
            doc = docx.Document(io.BytesIO(content))
            text = "\n".join([para.text for para in doc.paragraphs])
        except ImportError:
            text = "DOCX extraction requires python-docx. Assuming raw string for now."
    else:
        text = content.decode("utf-8", errors="ignore")
        
    return text.strip()
