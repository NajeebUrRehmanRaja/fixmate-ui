import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import axiosInstance from "../lib/axios";
import { parseResponse } from "../utils/parse-response";
import { LuLoaderCircle } from "react-icons/lu";
import { AVAILABLE_LANGUAGES } from "../constants";
import { IoChevronDownOutline } from "react-icons/io5";
// import { User } from "lucide-react";

const tabs = ["All", "Security", "Performance", "Style"];
const tabsBug = ["All", "Syntax Errors", "Logical Errors", "Runtime Errors"];

const CodeReviewPage = () => {
  /* ───────────────────────────── state ───────────────────────────── */
  const [activeTab, setActiveTab] = useState("All");
  const [activeTabsBugs, setActiveTabsBugs] = useState("All");
  const [editorTab, setEditorTab] = useState("Code Editor");
  const [code, setCode] = useState("");
  const [analysis, setAnalysis] = useState(""); // ← shared text
  const [activeMode, setActiveMode] = useState(null); // "review" | "debug" | null
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(null);
  const [codeQuality, setCodeQuality] = useState(0);
  const [report, setReport] = useState("");

  const [reviewResults, setReviewResults] = useState([]);
  const [debugResults, setDebugResults] = useState([]);

  /* ────────────────────────── derived data ───────────────────────── */
  const filtered =
    activeTab === "All"
      ? reviewResults
      : reviewResults.filter((r) => r.type === activeTab);

  const filteredBugs =
    activeTabsBugs === "All"
      ? debugResults
      : debugResults.filter((r) => r.type === activeTabsBugs);

  /* ─────────────────────────── handlers ──────────────────────────── */
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".")[1].toLowerCase();
    setLanguage(AVAILABLE_LANGUAGES[ext]);

    const reader = new FileReader();
    reader.onload = (evt) => {
      setCode(evt.target.result);
      setEditorTab("Code Editor");
    };
    reader.readAsText(file);
  };

  const handleExportReport = () => {
    saveAs(
      new Blob([report], { type: "text/plain;charset=utf-8" }),
      "code-analysis.txt"
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

  const handleReviewCode = async () => {
    if (!code.trim()) {
      toast.error("Enter code before reviewing");
      return;
    }

    try {
      setLoading("review");
      const res = await axiosInstance.post("/code/review-code", { code });
      const { feedback } = res.data;

      const parsedResponse = parseResponse(feedback);

      setReviewResults(parsedResponse.report);
      setCodeQuality(parsedResponse.codeQuality);
      setAnalysis(parsedResponse.correctedCode);
      setReport(parsedResponse.reportInText);
      setActiveMode("review");
      toast.success("🔍 Code review successfully");
    } catch (error) {
      console.log("Something went wrong while getting current user", error);
      toast.error(error.response?.data?.msg || "Please Create an account");
    } finally {
      setLoading(null);
    }
  };

  const handleBugDetect = async () => {
    if (!code.trim()) {
      toast.error("Enter code before debugging");
      return;
    }

    try {
      setLoading("debug");
      const res = await axiosInstance.post("/code/find-bugs", { code });
      const { feedback } = res.data;

      const parsedResponse = parseResponse(feedback);
      console.log("parsedResponse", parsedResponse);

      setDebugResults(parsedResponse.bugs);
      setCodeQuality(parsedResponse.codeQuality);
      setAnalysis(parsedResponse.correctedCode);
      setReport(parsedResponse.reportInText);
      setActiveMode("debug");
      toast.success("🐞 Bug detected successfully");
    } catch (error) {
      console.log("Something went wrong while getting current user", error);
      toast.error(error.response?.data?.msg || "Please Create an account");
    } finally {
      setLoading(null);
    }
  };

  const handleFixChanges = () => {
    console.log("clicked");
    setCode(analysis);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 my-15">Fixmate AI Tool</h1>

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
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn min-w-[120px]">
                <span className="capitalize">{language}</span>
                <IoChevronDownOutline />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                {Object.values(AVAILABLE_LANGUAGES).map((lang) => (
                  <li key={lang}>
                    <button
                      className={`capitalize ${
                        language === lang && "bg-primary/50"
                      }`}
                      onClick={() => setLanguage(lang)}
                    >
                      {lang}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex mb-4">
            {["Code Editor", "Upload File"].map((tab) => (
              <button
                key={tab}
                onClick={() => setEditorTab(tab)}
                className={`flex-1 p-2 cursor-pointer ${
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
              language={language}
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
              className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={handleReviewCode}
              disabled={loading === "review" || loading === "debug"}
            >
              {loading === "review" ? (
                <LuLoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Review Code"
              )}
            </button>
            <button
              className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={handleBugDetect}
              disabled={loading === "review" || loading === "debug"}
            >
              {loading === "debug" ? (
                <LuLoaderCircle className="w-4 h-4 animate-spin" />
              ) : (
                "Debug Code"
              )}
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
                <span className="text-green-400 font-bold">
                  {codeQuality}/100
                </span>
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
              <button
                className="flex-1 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleFixChanges}
              >
                Fix Selected Issues
              </button>
            </div>
          </div>
        )}

        {/* ──────── debug results ──────── */}
        {activeMode === "debug" && (
          <div className="flex flex-col w-full md:w-1/2 border border-gray-700 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Debugging Results</h2>
              <span className="text-sm text-gray-400">
                Code Quality:{" "}
                <span className="text-green-400 font-bold">
                  {codeQuality}/100
                </span>
              </span>
            </div>

            <div className="flex mb-4">
              {tabsBug.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTabsBugs(tab)}
                  className={`flex-1 p-2 cursor-pointer ${
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
                        : r.type === "Syntax Errors"
                        ? "text-yellow-400"
                        : r.type === "Logical Errors"
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
                className="flex-1 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                onClick={handleExportReport}
              >
                Export Report
              </button>
              <button
                className="flex-1 bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                onClick={handleCopyAllFixes}
              >
                Copy All Fixes
              </button>
              <button
                className="flex-1 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                onClick={handleFixChanges}
              >
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
