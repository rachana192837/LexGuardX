from pydantic import BaseModel
from typing import List, Optional

class RiskScore(BaseModel):
    category: str # e.g. "Financial", "Compliance", "Operational"
    score: int # 1 to 10
    reasoning: str

class ClauseHighlight(BaseModel):
    clause_text: str
    risk_level: str # Low, Medium, High, Critical
    agent_verdict: str
    prosecutor_argument: Optional[str] = None
    defense_argument: Optional[str] = None

class DocumentAnalysisResponse(BaseModel):
    document_type: str
    overall_status: str # e.g. "High Risk", "Acceptable"
    risk_scores: List[RiskScore]
    problematic_clauses: List[ClauseHighlight]
    negotiation_suggestions: Optional[List[str]] = None


class ComparisonResponse(BaseModel):
    original: List[str]
    revised: List[str]


class RiskAnalysisItem(BaseModel):
    clause_id: str
    change_type: str  # "added", "removed", "modified"
    risk_level: str   # "critical", "high", "moderate", "low"
    summary: str


class ComparisonAnalyzeRequest(BaseModel):
    original: List[str]
    revised: List[str]
