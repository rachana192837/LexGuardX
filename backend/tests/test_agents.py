import pytest
from agents import run_analysis_pipeline, _inference_cache

@pytest.mark.asyncio
async def test_multi_agent_pipeline():
    """Test full analysis pipeline using Gemini API integration"""
    text = "The employee agrees not to compete for a duration of 5 years following termination of employment."
    result = await run_analysis_pipeline(text, "Employee")
    
    assert result.document_type is not None
    assert len(result.risk_scores) > 0
    assert len(result.problematic_clauses) > 0

@pytest.mark.asyncio
async def test_persona_specific_analysis_cache_bypass():
    """Test different personas produce different cache keys and isolated logic runs"""
    text = "IP transfer clause. Employee surrenders all rights to side projects developed on their own time."
    # Ensure cache is clean
    _inference_cache.clear()
    
    employee_result = await run_analysis_pipeline(text, "Employee")
    freelancer_result = await run_analysis_pipeline(text, "Freelancer")
    
    # Ensure they create separate cached instances representing different evaluations
    assert id(employee_result) != id(freelancer_result)
