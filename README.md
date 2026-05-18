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
├── backend/            # FastAPI AI Engine
│   ├── agents.py       # Gemini 1.5 Pro orchestration
│   ├── main.py         # Secure API endpoints & JWT Auth
│   ├── parsers.py      # PyMuPDF processing
│   └── tests/          # Pytest suite
├── frontend/           # React Dashboard
│   ├── src/pages/      # Dashboard & Landing logic
│   └── components/     # UI/UX components
└── Dockerfile          # Root-level GCP deployment config
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
- Note: lint/tests currently have baseline issues in this repo state; see `CONTRIBUTING.md` for details.

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
- **Accessibility**: Semantic HTML and modern accessible UI patterns.

---
**Build with ❤️ for the Hack2Skill Community** 🥂🚀
