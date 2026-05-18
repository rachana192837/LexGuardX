# Contributing to LexGuard

Thanks for contributing.

## Project layout
- `backend/`: FastAPI API (`main.py`) and AI pipeline logic (`agents.py`, `parsers.py`).
- `frontend/`: React + Vite app (`src/pages/Dashboard.jsx` is the main product UI).

## Local setup
1. Backend dependencies:
   - `python -m pip install -r backend/requirements.txt`
2. Frontend dependencies:
   - `cd frontend && npm install`

Run apps in separate terminals:
- Backend (from `backend/`):
  - `uvicorn main:app --reload --host 0.0.0.0 --port 8000`
- Frontend (from `frontend/`):
  - `npm run dev`

## Validation before opening a PR
- Frontend build (reliable):
  - `cd frontend && npm run build`
- Backend smoke check (reliable):
  - `cd backend && python -c "import main"`

Known baseline issues in current repo state:
- `cd frontend && npm run lint` reports existing lint errors.
- `cd backend && pytest -q` may fail import collection.
- `cd backend && python -m pytest -q` collects tests but async tests fail without `pytest-asyncio`.

## Code and security notes
- Do not commit secrets or real API keys.
- Keep environment values in local `.env` / `.env.local` files only.
- In `frontend/src/pages/Dashboard.jsx`, upload calls are currently hardcoded to the deployed Cloud Run URL.

## Pull requests
- Keep PRs focused and small.
- Include a short summary of changes and how you validated them.
