import RiskBadge from "./RiskBadge";

export default function DiffPanel({ original, revised, riskAnalysis }) {
  const riskMap = {};
  if (riskAnalysis) {
    riskAnalysis.forEach((item) => {
      riskMap[item.clause_id] = item;
    });
  }

  // Build aligned pairs for side-by-side display
  const pairs = alignSentences(original, revised);

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Original Panel */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 overflow-y-auto max-h-[600px]">
        <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
          Original
        </h3>
        <div className="space-y-2">
          {pairs.map((pair, idx) => {
            const risk = riskMap[`sentence-${pair.originalIdx}`];
            return (
              <div
                key={idx}
                className={`p-2 rounded text-sm ${
                  pair.status === "removed"
                    ? "bg-red-500/20 border-l-2 border-red-500"
                    : pair.status === "modified"
                    ? "bg-yellow-500/20 border-l-2 border-yellow-500"
                    : "text-white/70"
                }`}
              >
                {pair.originalText}
                {risk && (
                  <span className="ml-2">
                    <RiskBadge level={risk.risk_level} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Revised Panel */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 p-4 overflow-y-auto max-h-[600px]">
        <h3 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">
          Revised
        </h3>
        <div className="space-y-2">
          {pairs.map((pair, idx) => {
            const risk = riskMap[`sentence-${pair.revisedIdx}`];
            return (
              <div
                key={idx}
                className={`p-2 rounded text-sm ${
                  pair.status === "added"
                    ? "bg-emerald-500/20 border-l-2 border-emerald-500"
                    : pair.status === "modified"
                    ? "bg-yellow-500/20 border-l-2 border-yellow-500"
                    : "text-white/70"
                }`}
              >
                {pair.revisedText}
                {risk && (
                  <span className="ml-2">
                    <RiskBadge level={risk.risk_level} />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function alignSentences(original, revised) {
  // Simple alignment: match by position, mark additions/removals
  const pairs = [];
  const maxLen = Math.max(original.length, revised.length);

  for (let i = 0; i < maxLen; i++) {
    const origText = i < original.length ? original[i] : null;
    const revText = i < revised.length ? revised[i] : null;

    if (origText && revText) {
      if (origText === revText) {
        pairs.push({
          status: "unchanged",
          originalText: origText,
          revisedText: revText,
          originalIdx: i,
          revisedIdx: i,
        });
      } else {
        pairs.push({
          status: "modified",
          originalText: origText,
          revisedText: revText,
          originalIdx: i,
          revisedIdx: i,
        });
      }
    } else if (origText) {
      pairs.push({
        status: "removed",
        originalText: origText,
        revisedText: "",
        originalIdx: i,
        revisedIdx: null,
      });
    } else if (revText) {
      pairs.push({
        status: "added",
        originalText: "",
        revisedText: revText,
        originalIdx: null,
        revisedIdx: i,
      });
    }
  }

  return pairs;
}
