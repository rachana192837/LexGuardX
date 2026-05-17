import pytest
from httpx import AsyncClient, ASGITransport
from main import app

@pytest.mark.asyncio
async def test_health_check():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

@pytest.mark.asyncio
async def test_simulate_scenario():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/simulate", data={"clause": "The employee cannot work anywhere."})
    assert response.status_code == 200
    data = response.json()
    assert "scenario_title" in data
    assert "description" in data

@pytest.mark.asyncio
async def test_negotiate_clause():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        response = await ac.post("/negotiate", data={"clause": "The employee cannot work anywhere."})
    assert response.status_code == 200
    data = response.json()
    assert "original_clause" in data
    assert "suggested_clause" in data
    assert "rationale" in data
