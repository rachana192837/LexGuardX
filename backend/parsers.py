import fitz  # PyMuPDF
import mammoth
import io
from fastapi import UploadFile


def _parse_pdf(content: bytes) -> str:
    doc = fitz.open(stream=content, filetype="pdf")
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text.strip()


def _parse_docx(content: bytes) -> str:
    result = mammoth.extract_raw_text(io.BytesIO(content))
    return result.value.strip()


def _parse_text(content: bytes) -> str:
    return content.decode("utf-8", errors="ignore").strip()


async def parse_document(file: UploadFile) -> str:
    """
    Extracts raw text from uploaded PDF or DOCX documents.
    """
    content = await file.read()
    filename = file.filename or ""

    if filename.lower().endswith(".pdf"):
        return _parse_pdf(content)
    elif filename.lower().endswith(".docx"):
        return _parse_docx(content)
    else:
        return _parse_text(content)
