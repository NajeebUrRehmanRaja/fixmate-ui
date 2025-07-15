import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { saveAs } from "file-saver";

const tabs = ["All", "Bugs", "Security", "Performance", "Style"];

const results = [
  {
    type: "Bug",
    title: "Potential infinite loop due to incorrect loop condition",
    suggestion: "Change '<=' to '<' in the for loop condition",
    location: "Line 3, Column 32",
  },
  {
    type: "Security",
    title: "Potential null reference exception when accessing properties",
    suggestion: "Add a null check before accessing the price property",
    location: "Line 4, Column 10",
  },
  {
    type: "Performance",
    title: "Consider using reduce() method instead of for loop",
    suggestion: "Use reduce() for better performance",
    location: "Line 2, Column 3",
  },
];

const CodeReviewPage = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [activeEditorTab, setActiveEditorTab] = useState("Code Editor");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [code, setCode] = useState(``);
  const [isReviewStarted, setIsReviewStarted] = useState(false); // New state to track review start

  const filteredResults =
    activeTab === "All"
      ? results
      : results.filter((item) => item.type === activeTab);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCode(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleExportReport = () => {
    const analysis = "Your code analysis results go here!";

    const blob = new Blob([analysis], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "code-analysis.txt");
  };

  const handleCopyAllFixes = () => {
    if (analysis) {
      navigator.clipboard
        .writeText(analysis)
        .then(() => {
          console.log("Form submitted!");
          setToastMessage("✅ Copied all fixes successfully!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 3000);
        })
        .catch((err) => {
          console.error("Failed Copy:", err);
        });
    }
  };
  const handleReviewCode = () => {
    if (code.trim() !== "") {
      setIsReviewStarted(true);
    } else {
      alert("Please enter some code before starting review.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8 flex flex-col">
      <h1 className="text-2xl font-bold mb-6">Code Review Tool</h1>
      <div
        className={`flex flex-1 gap-8 flex-col ${
          isReviewStarted ? "md:flex-row" : ""
        }`}
      >
        {/* Code Input Section */}
        <div
          className={`flex flex-col ${
            isReviewStarted ? "w-full md:w-1/2" : "w-full"
          } border border-gray-700 rounded-lg p-5`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Code Input</h2>
            <select
              className="bg-gray-800 text-white p-2 rounded cursor-pointer"
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
                onClick={() => setActiveEditorTab(tab)}
                className={`flex-1 p-2 cursor-pointer ${
                  activeEditorTab === tab ? "bg-blue-600" : "bg-gray-700"
                } rounded-l first:rounded-r-none last:rounded-r`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeEditorTab === "Code Editor" ? (
            <Editor
              height="300px"
              language="javascript"
              value={code}
              onChange={(value) => setCode(value)}
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
                <div className="text-gray-400 hover:text-white">
                  📂 Click to upload your code file
                </div>
              </label>
            </div>
          )}

          <div className="flex">
            <button
              className="mt-4 bg-blue-600 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={handleReviewCode}
            >
              Review Code
            </button>
            <button
              className="ml-10 mt-4 bg-blue-600 p-2 rounded hover:bg-blue-700 cursor-pointer"
              onClick={handleReviewCode}
            >
              Detect Bugs
            </button>
          </div>
        </div>

        {/* Analysis Results Section */}
        {isReviewStarted && (
          <div className="flex flex-col w-full md:w-1/2 border border-gray-700 rounded-lg p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Analysis Results</h2>
              <div className="text-sm text-gray-400">
                Code Quality:{" "}
                <span className="text-green-400 font-bold">76/100</span>
              </div>
            </div>

            <div className="flex mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 p-2 cursor-pointer ${
                    activeTab === tab ? "bg-blue-600" : "bg-gray-700"
                  } rounded-l  first:rounded-r-none last:rounded-r`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-y-auto max-h-96">
              {filteredResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-[#1e293b] rounded p-4 mb-4 border border-gray-600"
                >
                  <span
                    className={`font-bold ${
                      result.type === "Bug"
                        ? "text-red-400"
                        : result.type === "Security"
                        ? "text-yellow-400"
                        : result.type === "Performance"
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  >
                    {result.type}
                  </span>
                  <p className="mt-2">{result.title}</p>
                  <div className="text-gray-300 text-sm mt-2">
                    Suggestion: {result.suggestion}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {result.location}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                className="bg-gray-700 p-2 rounded hover:bg-gray-600 flex-1 cursor-pointer"
                onClick={handleExportReport}
              >
                Export Report
              </button>
              <button
                className="bg-gray-700 p-2 rounded hover:bg-gray-600 flex-1 cursor-pointer"
                onClick={handleCopyAllFixes}
              >
                Copy All Fixes
              </button>
              {showToast && (
                <div className="fixed bottom-5 right-5 bg-green-500 text-white px-6 py-4 rounded shadow-lg transition-opacity duration-500">
                  {toastMessage}
                </div>
              )}
              <button className="bg-blue-600 p-2 rounded hover:bg-blue-700 flex-1 cursor-pointer">
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
