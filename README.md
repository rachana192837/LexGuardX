# LexGuard

AI-powered contract analysis platform that reviews legal documents, identifies risks, and provides negotiation recommendations.

## Features

- **Contract Analysis** — Upload a PDF or DOCX contract and receive a risk assessment with clause-by-clause breakdown
- **Persona-Based Review** — Analyze from different perspectives: Employee, Freelancer, Small Business, Consumer
- **Adversarial Debate** — AI agents simulate prosecution and defense arguments to expose hidden risks
- **Document Comparison** — Side-by-side diff of two contract versions with AI-powered risk analysis
- **Negotiation Suggestions** — Get concrete counter-proposals for problematic clauses

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | FastAPI, Python |
| AI | Google Gemini 1.5 Pro |
| Frontend | React, Vite, Tailwind CSS |
| Deployment | Google Cloud Run |

## Project Structure

```
backend/
  main.py          # API endpoints
  agents.py        # Gemini AI orchestration
  parsers.py       # PDF/DOCX text extraction
  models.py        # Pydantic schemas
  tests/           # Backend tests

frontend/
  src/
    pages/         # Page components
    components/    # Reusable UI components
```

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Google Gemini API key

### Backend

```bash
cd backend
pip install -r requirements.txt

# Create .env file
echo "GEMINI_API_KEY=your_key_here" > .env

# Start server
uvicorn main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173` and proxies API requests to the backend on port 8000.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Analyze a single contract |
| `POST` | `/compare` | Compare two contract versions |
| `POST` | `/compare/analyze` | Get risk analysis for differences |
| `POST` | `/simulate` | Simulate real-world consequences of a clause |
| `POST` | `/negotiate` | Get negotiation suggestions |

## Testing

```bash
cd backend
python -m pytest tests/ -v
```

## License

MIT
