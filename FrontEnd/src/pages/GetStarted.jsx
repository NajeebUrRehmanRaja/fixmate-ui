import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const tabs = ["All", "Security", "Performance", "Style"];
const tabsBug = ["All", "Syntax Errors", "Logical Errors", "Runtime Errors"];

const mockResults = [
  {
    type: "Bug",
    title: "Potential infinite loop due to incorrect loop condition",
    suggestion: "Change '<=' to '<' in the for‑loop condition",
    location: "Line 3, Col 32",
  },
  {
    type: "Security",
    title: "Possible null reference when accessing price",
    suggestion: "Add a null check before accessing price",
    location: "Line 4, Col 10",
  },
  {
    type: "Performance",
    title: "Use reduce() instead of for‑loop",
    suggestion: "Switch to Array.reduce for better perf",
    location: "Line 2, Col 3",
  },
];
const mockResultsBugs = [
  {
    type: "Bug",
    title: "Potential infinite loop due to incorrect loop condition",
    suggestion: "Change '<=' to '<' in the for‑loop condition",
    location: "Line 3, Col 32",
  },
  {
    type: "Security",
    title: "Possible null reference when accessing price",
    suggestion: "Add a null check before accessing price",
    location: "Line 4, Col 10",
  },
  {
    type: "Performance",
    title: "Use reduce() instead of for‑loop",
    suggestion: "Switch to Array.reduce for better perf",
    location: "Line 2, Col 3",
  },
];

const CodeReviewPage = () => {
  /* ───────────────────────────── state ───────────────────────────── */
  const [activeTab, setActiveTab] = useState("All");
  const [activeTabsBugs, setActiveTabsBugs] = useState("All");
  const [editorTab, setEditorTab] = useState("Code Editor");
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState(""); // ← shared text
  // const [isReviewStarted, setIsReview] = useState(false);
  // const [isBugDetectStarted, setIsBugging] = useState(false);
  const [activeMode, setActiveMode] = useState(null); // "review" | "debug" | null

  /* ────────────────────────── derived data ───────────────────────── */
  const filtered =
    activeTab === "All"
      ? mockResults
      : mockResults.filter((r) => r.type === activeTab);

  const filteredBugs =
    activeTabsBugs === "All"
      ? mockResultsBugs
      : mockResultsBugs.filter((r) => r.type === activeTabsBugs);

  /* ─────────────────────────── handlers ──────────────────────────── */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => setCode(evt.target.result);
    reader.readAsText(file);
  };

  const handleExportReport = () => {
    const text = "Your code analysis results go here!";
    setAnalysis(text); // save for copy
    saveAs(
      new Blob([text], { type: "text/plain;charset=utf‑8" }),
      "code‑analysis.txt"
    );
    toast.success("Report exported");
  };

  const handleCopyAllFixes = () => {
    if (!analysis) {
      toast.error("Nothing to copy — run a review first");
      return;
    }
    navigator.clipboard
      .writeText(analysis)
      .then(() => toast.success("✅ Copied all fixes"))
      .catch(() => toast.error("Clipboard failed"));
  };

  const handleReviewCode = () => {
    if (!code.trim()) {
      toast.error("Enter code before reviewing");
      return;
    }
    setActiveMode("review"); // mock text
    toast.success("🔍 Code review started");
  };

  const handleBugDetect = () => {
    if (!code.trim()) {
      toast.error("Enter code before debugging");
      return;
    }
    setActiveMode("debug");
    toast.success("Bug detection started");
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Code Review Tool</h1>

      <div
        className={`flex flex-1 gap-8 flex-col ${
          activeMode !== null ? "md:flex-row" : ""
        }`}
      >
        {/* ──────── code input ──────── */}
        <div
          className={`flex flex-col ${
            activeMode !== null ? "w-full md:w-1/2" : "w-full"
          } border border-gray-700 rounded-lg p-5`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Code Input</h2>
            <select
              className="bg-gray-800 text-white p-2 rounded"
              defaultValue="JavaScript"
            >
              <option value="C#">C#</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
            </select>
          </div>

          <div className="flex mb-4">
            {["Code Editor", "Upload File"].map((tab) => (
              <button
                key={tab}
                onClick={() => setEditorTab(tab)}
                className={`flex-1 p-2 ${
                  editorTab === tab ? "bg-blue-600" : "bg-gray-700"
                } first:rounded-l last:rounded-r`}
              >
                {tab}
              </button>
            ))}
          </div>

          {editorTab === "Code Editor" ? (
            <Editor
              height="300px"
              language="javascript"
              value={code}
              onChange={(val) => setCode(val ?? "")}
              theme="vs-dark"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-500 rounded">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".js,.txt,.py,.cs"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <span className="text-gray-400 hover:text-white">
                  📂 Click to upload your code file
                </span>
              </label>
            </div>
          )}

          <div className="flex justify-end gap-6">
            <button
              className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleReviewCode}
            >
              Review Code
            </button>
            <button
              className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              onClick={handleBugDetect}
            >
              Debug Code
            </button>
          </div>
        </div>

        {/* ──────── analysis results ──────── */}
        {activeMode === "review" && (
          <div className="flex flex-col w-full md:w-1/2 border border-gray-700 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              <span className="text-sm text-gray-400">
                Code Quality:{" "}
                <span className="text-green-400 font-bold">76/100</span>
              </span>
            </div>

            <div className="flex mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 p-2 cursor-pointer ${
                    activeTab === tab ? "bg-blue-600" : "bg-gray-700"
                  } first:rounded-l last:rounded-r`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto max-h-96">
              {filtered.map((r, i) => (
                <div
                  key={i}
                  className="bg-[#1e293b] rounded p-4 mb-4 border border-gray-600"
                >
                  <span
                    className={`font-bold ${
                      r.type === "Bug"
                        ? "text-red-400"
                        : r.type === "Security"
                        ? "text-yellow-400"
                        : r.type === "Performance"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {r.type}
                  </span>
                  <p className="mt-2">{r.title}</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Suggestion: {r.suggestion}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{r.location}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                onClick={handleExportReport}
              >
                Export Report
              </button>
              <button
                className="flex-1 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                onClick={handleCopyAllFixes}
              >
                Copy All Fixes
              </button>
              <button className="flex-1 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Fix Selected Issues
              </button>
            </div>
          </div>
        )}
        <div></div>
        {activeMode === "debug" && (
          <div className="flex flex-col w-full md:w-1/2 border border-gray-700 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              <span className="text-sm text-gray-400">
                Code Quality:{" "}
                <span className="text-green-400 font-bold">76/100</span>
              </span>
            </div>

            <div className="flex mb-4">
              {tabsBug.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTabsBugs(tab)} // ✅ Fixed here
                  className={`flex-1 p-2 ${
                    activeTabsBugs === tab ? "bg-blue-600" : "bg-gray-700"
                  } first:rounded-l last:rounded-r`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto max-h-96">
              {filteredBugs.map((r, i) => (
                <div
                  key={i}
                  className="bg-[#1e293b] rounded p-4 mb-4 border border-gray-600"
                >
                  <span
                    className={`font-bold ${
                      r.type === "Bug"
                        ? "text-red-400"
                        : r.type === "Security"
                        ? "text-yellow-400"
                        : r.type === "Performance"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {r.type}
                  </span>
                  <p className="mt-2">{r.title}</p>
                  <p className="text-gray-300 text-sm mt-2">
                    Suggestion: {r.suggestion}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">{r.location}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="flex-1 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                onClick={handleExportReport}
              >
                Export Report
              </button>
              <button
                className="flex-1 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600"
                onClick={handleCopyAllFixes}
              >
                Copy All Fixes
              </button>
              <button className="flex-1 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
                Fix Selected Issues
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeReviewPage;
