const RISK_CONFIG = {
  critical: { color: "from-red-600 to-pink-600", label: "Critical" },
  high: { color: "from-orange-500 to-amber-500", label: "High" },
  moderate: { color: "from-yellow-400 to-amber-400", label: "Moderate" },
  low: { color: "from-emerald-400 to-cyan-400", label: "Low" },
};

export default function RiskBadge({ level }) {
  const config = RISK_CONFIG[level] || RISK_CONFIG.moderate;

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${config.color}`}
    >
      {config.label}
    </span>
  );
}
