import pytest
from fastapi import UploadFile
import io
from parsers import parse_document

@pytest.mark.asyncio
async def test_pdf_parsing_fallback():
    """Test string stream extraction from parsers"""
    mock_file = io.BytesIO(b"This is a mock contract document text stream.")
    upload_file = UploadFile(filename="test.txt", file=mock_file)
    text = await parse_document(upload_file)
    assert len(text) > 0
    assert "mock contract" in text
