import { useState } from "react";
import { Upload, ArrowLeftRight, FileText, Loader2 } from "lucide-react";
import DiffPanel from "./DiffPanel";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function CompareTab() {
  const [originalFile, setOriginalFile] = useState(null);
  const [revisedFile, setRevisedFile] = useState(null);
  const [originalSentences, setOriginalSentences] = useState([]);
  const [revisedSentences, setRevisedSentences] = useState([]);
  const [riskAnalysis, setRiskAnalysis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [swapped, setSwapped] = useState(false);

  const handleSwap = () => {
    setSwapped(!swapped);
    const tempFile = originalFile;
    setOriginalFile(revisedFile);
    setRevisedFile(tempFile);
    if (originalSentences.length > 0) {
      const tempSentences = originalSentences;
      setOriginalSentences(revisedSentences);
      setRevisedSentences(tempSentences);
    }
  };

  const handleCompare = async () => {
    if (!originalFile || !revisedFile) return;

    setLoading(true);
    setError(null);
    setRiskAnalysis([]);

    try {
      const formData = new FormData();
      formData.append("original_file", originalFile);
      formData.append("revised_file", revisedFile);

      const response = await fetch(`${API_BASE}/compare`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "Comparison failed");
      }

      const data = await response.json();
      setOriginalSentences(data.original);
      setRevisedSentences(data.revised);

      // Start risk analysis in background
      setAnalyzing(true);
      fetch(`${API_BASE}/compare/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ original: data.original, revised: data.revised }),
      })
        .then((res) => res.json())
        .then((items) => {
          setRiskAnalysis(items);
          setAnalyzing(false);
        })
        .catch(() => setAnalyzing(false));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderUploadZone = (label, file, setFile, disabled) => (
    <div className="flex-1">
      <label className="block text-sm font-medium text-white/60 mb-2">{label}</label>
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
          file
            ? "border-emerald-500/50 bg-emerald-500/5"
            : "border-white/20 hover:border-white/40 bg-white/5"
        } ${disabled ? "opacity-50" : "cursor-pointer hover:bg-white/10"}`}
        onClick={() => !disabled && document.getElementById(`file-${label}`).click()}
      >
        <input
          id={`file-${label}`}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
          disabled={disabled}
        />
        {file ? (
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <FileText size={20} />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
          </div>
        ) : (
          <div className="text-white/40">
            <Upload size={24} className="mx-auto mb-2" />
            <p className="text-sm">Drop PDF or DOCX here</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-white">Contract Comparison</h2>
        {analyzing && (
          <span className="flex items-center gap-1 text-xs text-cyan-400">
            <Loader2 size={12} className="animate-spin" />
            Analyzing risks...
          </span>
        )}
      </div>

      {/* Upload Section */}
      <div className="flex items-end gap-4">
        {renderUploadZone("Original", swapped ? revisedFile : originalFile, setOriginalFile, loading)}
        <button
          onClick={handleSwap}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all mb-7"
          title="Swap files"
        >
          <ArrowLeftRight size={20} />
        </button>
        {renderUploadZone("Revised", swapped ? originalFile : revisedFile, setRevisedFile, loading)}
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCompare}
          disabled={!originalFile || !revisedFile || loading}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            originalFile && revisedFile && !loading
              ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" />
              Comparing...
            </span>
          ) : (
            "Compare Contracts"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Diff Results */}
      {originalSentences.length > 0 && revisedSentences.length > 0 && (
        <DiffPanel
          original={originalSentences}
          revised={revisedSentences}
          riskAnalysis={riskAnalysis}
        />
      )}
    </div>
  );
}
