# LexGuard X: AI-Powered Adversarial Legal Guard ⚖️🤖

**LexGuard X** is a production-ready legal analysis engine built for the **Hack2Skill Hackathon**. It leverages the power of **Google Gemini 1.5 Pro** to perform adversarial contract review, simulating real-world consequences and providing strategic negotiation leverage for consumers, employees, and freelancers.

---

## 🚀 Live Demo
**Dashboard URL**: [https://lexguard-851043397374.europe-west1.run.app/](https://lexguard-851043397374.europe-west1.run.app/)

---

## ✨ Key Features
- **Persona-Based Analysis**: Tailors legal risk assessment based on the user's role (Employee, Freelancer, Small Business, Consumer).
- **Gemini 1.5 Pro Engine**: Leverages high-context window AI for massive document analysis and nuanced adversarial reasoning.
- **Consequence Simulation**: Predicts "What happens if I sign?" with real-world impact scenarios.
- **Negotiation Strategist**: Generates concrete counter-proposals and leverage points.
- **Adversarial Debate**: Parallel AI agents simulate "Counsel vs. Corporate" debates to expose hidden traps.
- **Document Comparison**: Side-by-side diff of two contract versions with AI-powered risk analysis of changes.

---

## 🛠️ Tech Stack & Google Services
- **LLM**: Google Gemini 1.5 Pro
- **Backend**: FastAPI (Python)
- **Frontend**: React (Vite) + Tailwind CSS
- **Infrastructure**: 100% Google Cloud (Dual Cloud Run Services)
- **CI/CD**: Automatic Cloud Build via GitHub Integration
- **Security**: Google OAuth 2.0 & JWT Validation

---

## 📦 Project Structure
```bash
├── backend/                # FastAPI AI Engine
│   ├── agents.py           # Gemini 1.5 Pro orchestration
│   ├── main.py             # Secure API endpoints & JWT Auth
│   ├── parsers.py          # PyMuPDF & mammoth processing
│   ├── models.py           # Pydantic response schemas
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Container config for Cloud Run
│   └── tests/              # Pytest suite (20+ tests)
│       ├── test_main.py
│       ├── test_agents.py
│       ├── test_compare.py
│       ├── test_docx_parser.py
│       └── test_parsers.py
├── frontend/               # React Dashboard
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Main product UI
│   │   │   ├── LandingPage.jsx    # Marketing landing
│   │   │   └── SignupPage.jsx     # User registration
│   │   └── components/
│   │       ├── CompareTab.jsx     # Document comparison UI
│   │       ├── DiffPanel.jsx      # Side-by-side diff view
│   │       ├── RiskBadge.jsx      # Risk level indicator
│   │       └── ErrorBoundary.jsx
│   ├── package.json
│   └── Dockerfile          # Nginx container for Cloud Run
├── Dockerfile              # Root-level GCP deployment config
└── CONTRIBUTING.md
```

---

## 🔧 Installation & Local Setup

### Backend
1. `cd backend`
2. `python -m pip install -r requirements.txt`
3. Create `.env`: `GEMINI_API_KEY=YOUR_KEY`
4. `uvicorn main:app --reload --host 0.0.0.0 --port 8000`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (runs on `http://localhost:5173`)

### Quick Validation
- Frontend build: `cd frontend && npm run build`
- Backend smoke check: `cd backend && python -c "import main"`
- Run all tests: `cd backend && python -m pytest tests/ -v`

---

## 🧪 Test Structure

| Test File | Coverage |
|-----------|----------|
| `test_main.py` | Health check, `/simulate`, `/negotiate` endpoints |
| `test_agents.py` | AI pipeline, persona cache, fallback behavior |
| `test_compare.py` | `/compare`, `/compare/analyze`, rate limiting, edge cases |
| `test_docx_parser.py` | DOCX text extraction, formatting, empty files |
| `test_parsers.py` | PDF parsing, text fallback |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `POST` | `/upload` | Analyze a single contract |
| `POST` | `/compare` | Parse two contracts for diff comparison |
| `POST` | `/compare/analyze` | AI risk analysis of document changes |
| `POST` | `/simulate` | Simulate real-world consequences |
| `POST` | `/negotiate` | Get negotiation suggestions |

---

## 🤝 Contributing

Contributions are welcome. Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) for setup, validation, and PR expectations.

---

## 📄 License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE).

---

## 🏆 Hack2Skill Evaluation Highlights
- **Google Services Integration**: Native Gemini 1.5 Pro implementation and Google Cloud Run deployment.
- **Security First**: Absolute protection of API keys via environment variables and JWT token verification.
- **Performance**: Integrated LRU caching for hyper-fast repeated analysis.
- **Accessibility**: Semantic HTML, keyboard navigation, and ARIA labels.
- **Testing**: 20+ tests covering endpoints, AI pipeline, parsers, and edge cases.
- **Document Comparison**: PDF and DOCX support with word-level diff and AI risk analysis.

---
**Build with ❤️ for the Hack2Skill Community** 🥂🚀
