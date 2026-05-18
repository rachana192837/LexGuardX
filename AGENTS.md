# AGENTS

## Scope and entrypoints
- This repo has two apps: `backend/` (FastAPI) and `frontend/` (React + Vite).
- Backend API entrypoint is `backend/main.py` (`app = FastAPI(...)`, routes: `/`, `/upload`, `/simulate`, `/negotiate`).
- AI orchestration is in `backend/agents.py`; document parsing is in `backend/parsers.py`; response schemas are in `backend/models.py`.
- Frontend entrypoint is `frontend/src/main.jsx`; routing is in `frontend/src/App.jsx`.
- Main product UI is `frontend/src/pages/Dashboard.jsx`.

## Commands that actually matter
- Backend setup: `python -m pip install -r backend/requirements.txt`
- Run backend (dev): `uvicorn main:app --reload --host 0.0.0.0 --port 8000` (run from `backend/`).
- Frontend setup: `npm install` (run from `frontend/`).
- Run frontend (dev): `npm run dev` (Vite is pinned to port `5173` with `strictPort: true` in `frontend/vite.config.js`).
- Frontend build: `npm run build` (works on current repo state).

## Verification gotchas (current repo state)
- `frontend` lint is not a reliable gate right now: `npm run lint` fails with existing baseline issues (unused vars, `react-hooks/set-state-in-effect`, and test globals not configured in `frontend/src/__tests__/Dashboard.test.jsx`).
- Backend tests are not a reliable gate right now:
  - `pytest -q` from `backend/` can fail at import collection (`ModuleNotFoundError` for `main`/`agents`/`parsers`).
  - `python -m pytest -q` runs collection but fails because async tests use `@pytest.mark.asyncio` and `pytest-asyncio` is not in `backend/requirements.txt`.
- If you must validate backend changes quickly, use targeted smoke checks (for example `python -c "import main"` from `backend/`) plus manual API checks.

## Runtime and env behavior you should not guess
- `backend/main.py` calls `load_dotenv()` at import time.
- Backend auth behavior is demo-tolerant: bearer token verification is optional/non-fatal in `/upload` (exceptions are logged and ignored).
- If `GEMINI_API_KEY` is missing (or model call fails), `backend/agents.py` returns mock/fallback analysis data instead of hard-failing.
- Upload size limit is enforced in backend: `10MB` (`MAX_FILE_SIZE` in `backend/main.py`).
- Frontend OAuth client ID comes from `VITE_GOOGLE_CLIENT_ID` with a hardcoded fallback in `frontend/src/App.jsx`.

## Integration quirks worth knowing before edits
- `frontend/src/pages/Dashboard.jsx` posts uploads to a hardcoded Cloud Run URL (`https://lexguardx-851043397374.europe-west1.run.app/upload`), not a local env-based API URL.
- `Dashboard.jsx` uses large built-in persona datasets for displayed findings/scores; backend response is stored in state but most visible analysis blocks are driven by static persona objects.
- CORS is currently wide open in backend (`allow_origins=["*"]` in `backend/main.py`). Keep this in mind before claiming production-hardening.

## Docker/deploy facts
- Root `Dockerfile` builds and serves the backend only (copies `backend/` into image and runs `uvicorn` on port `8080`).
- `backend/Dockerfile` also expects repo-root build context (`COPY backend/requirements.txt` and `COPY backend/ .`), so building from inside `backend/` without changing context will fail.
- Frontend containerization is separate in `frontend/Dockerfile` (Vite build stage + Nginx runtime).

## Secret handling
- `.env` files are gitignored at repo root (`.gitignore`), but local env files may still contain real keys. Do not copy secrets into code, docs, commits, or logs.
