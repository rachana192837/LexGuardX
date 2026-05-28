import { useState, useRef, useCallback } from "react";
import { Upload, ArrowLeftRight, FileText, Loader2, X, RotateCcw } from "lucide-react";
import DiffPanel from "./DiffPanel";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function UploadZone({ label, file, onFileSelect, disabled }) {
  const inputRef = useRef(null);

  const handleClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      onFileSelect(selected);
    }
  };

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-white/60 mb-2">{label}</label>
      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={`Upload ${label} document`}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all outline-none ${
          file
            ? "border-emerald-500/50 bg-emerald-500/5"
            : "border-white/20 hover:border-white/40 bg-white/5 focus:border-white/40 focus:bg-white/10"
        } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
          aria-hidden="true"
          tabIndex={-1}
        />
        {file ? (
          <div className="flex items-center justify-center gap-2 text-emerald-400">
            <FileText size={20} aria-hidden="true" />
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
          </div>
        ) : (
          <div className="text-white/40">
            <Upload size={24} className="mx-auto mb-2" aria-hidden="true" />
            <p className="text-sm">Drop PDF or DOCX here</p>
          </div>
        )}
      </div>
    </div>
  );
}

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
  const [identical, setIdentical] = useState(false);

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

  const handleClear = () => {
    setOriginalFile(null);
    setRevisedFile(null);
    setOriginalSentences([]);
    setRevisedSentences([]);
    setRiskAnalysis([]);
    setError(null);
    setIdentical(false);
  };

  const validateFile = useCallback((file) => {
    if (file.size > MAX_FILE_SIZE) {
      setError(`File "${file.name}" exceeds 10MB limit.`);
      return false;
    }
    const ext = file.name.toLowerCase().split(".").pop();
    if (ext !== "pdf" && ext !== "docx") {
      setError(`Invalid file type. Only PDF and DOCX files are supported.`);
      return false;
    }
    return true;
  }, []);

  const handleOriginalFileSelect = useCallback((file) => {
    setError(null);
    setOriginalFile(file);
  }, []);

  const handleRevisedFileSelect = useCallback((file) => {
    setError(null);
    setRevisedFile(file);
  }, []);

  const handleCompare = async () => {
    if (!originalFile || !revisedFile) return;

    setLoading(true);
    setError(null);
    setRiskAnalysis([]);
    setIdentical(false);

    if (!validateFile(originalFile) || !validateFile(revisedFile)) {
      setLoading(false);
      return;
    }

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

      if (JSON.stringify(data.original) === JSON.stringify(data.revised)) {
        setIdentical(true);
        setLoading(false);
        return;
      }

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

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCompare();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">Contract Comparison</h2>
          {analyzing && (
            <span role="status" className="flex items-center gap-1 text-xs text-cyan-400">
              <Loader2 size={12} className="animate-spin" aria-hidden="true" />
              Analyzing risks...
            </span>
          )}
        </div>
        {(originalFile || revisedFile || originalSentences.length > 0) && (
          <button
            onClick={handleClear}
            aria-label="Clear all files and results"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-white/60 hover:text-white bg-white/10 hover:bg-white/20 rounded-lg transition-all"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* Upload Section */}
      <div className="flex flex-col sm:flex-row items-end gap-4">
        <UploadZone
          label="Original"
          file={swapped ? revisedFile : originalFile}
          onFileSelect={handleOriginalFileSelect}
          disabled={loading}
        />
        <button
          onClick={handleSwap}
          aria-label="Swap original and revised files"
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-all sm:mb-7"
        >
          <ArrowLeftRight size={20} aria-hidden="true" />
        </button>
        <UploadZone
          label="Revised"
          file={swapped ? originalFile : revisedFile}
          onFileSelect={handleRevisedFileSelect}
          disabled={loading}
        />
      </div>

      {/* Compare Button */}
      <div className="flex justify-center">
        <button
          onClick={handleCompare}
          onKeyDown={handleKeyDown}
          disabled={!originalFile || !revisedFile || loading}
          aria-label="Compare the two uploaded contracts"
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            originalFile && revisedFile && !loading
              ? "bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/25"
              : "bg-white/10 text-white/30 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 size={16} className="animate-spin" aria-hidden="true" />
              Comparing...
            </span>
          ) : (
            "Compare Contracts"
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div role="alert" className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <X size={16} aria-hidden="true" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} aria-label="Dismiss error" className="text-red-400 hover:text-red-300">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Identical Documents */}
      {identical && (
        <div role="status" className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center">
          <p className="text-emerald-400 font-medium">Documents are identical</p>
          <p className="text-emerald-400/60 text-sm mt-1">No differences found between the two versions.</p>
        </div>
      )}

      {/* Empty Documents Warning */}
      {originalSentences.length === 0 && revisedSentences.length === 0 && !loading && !identical && (
        <div role="status" className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm text-center">
          No text could be extracted from one or both documents.
        </div>
      )}

      {/* Diff Results */}
      {originalSentences.length > 0 && revisedSentences.length > 0 && !identical && (
        <DiffPanel
          original={originalSentences}
          revised={revisedSentences}
          riskAnalysis={riskAnalysis}
        />
      )}
    </div>
  );
}
