import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Container from "../components/Container"
import Footer from "../pages/Footer"
const tabs = ["All", "Bugs", "Security", "Performance", "Style"];

const GetStarted = () => {
  const [activeTab, setActiveTab] = useState("All");

  const results = [
    {
      type: "Bug",
      title: "Potential infinite loop due to incorrect loop condition",
      suggestion: "Change '<=' to '<' in the for loop condition",
      line: 3,
      column: 32,
    },
    {
      type: "Security",
      title: "Potential null reference exception when accessing properties",
      suggestion:
        "Add a null check before accessing the price property: if(items[i] && items[i].price)",
      line: 4,
      column: 10,
    },
    {
      type: "Performance",
      title:
        "Consider using reduce() method instead of for loop for better performance",
      suggestion: "",
      line: 2,
      column: 3,
    },
  ];

  const filteredResults =
    activeTab === "All"
      ? results
      : results.filter((item) => item.type === activeTab);

  return (
    <Container className="pt-30 min-h-screen bg-[#0f172a] text-white p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-8">AI Code Review</h1>
      <div className="flex flex-1 gap-8">
        {/* Code Editor Section */}
        <div className="flex flex-col w-full md:w-1/2 border border-gray-700 rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Code Input</h2>
            <select className="bg-[#1e293b] text-white p-2 rounded">
              <option>C#</option>
              <option>JavaScript</option>
              <option>Python</option>
            </select>
          </div>

          {/* Tabs */}
          <div className="flex mb-4 border-b border-gray-600">
            <button className="px-4 py-2 border-b-2 border-blue-500 font-bold">
              Code Editor
            </button>
            <button className="px-4 py-2 text-gray-400">Upload File</button>
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 bg-[#1e293b] rounded-lg overflow-hidden">
            <Editor
              height="300px"
              defaultLanguage="javascript"
              defaultValue={`// Enter your code here\n\nfunction example() {\n  const x = 5;\n  console.log("This is a sample function");\n  return x;\n}`}
              theme="vs-dark"
            />
          </div>

          {/* Review Code Button */}
          <div className="mt-4">
            <button className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600">
              Review Code
            </button>
          </div>
        </div>

        {/* Analysis Results Section */}
        <div className="flex flex-col w-full md:w-1/2 border border-gray-700 rounded-lg p-5">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Analysis Results</h2>
            <div className="text-sm text-gray-400">
              Code Quality: <span className="text-white font-bold">76/100</span>
            </div>
          </div>

          {/* Result Tabs */}
          <div className="flex mb-4 gap-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-3 py-1 rounded ${
                  activeTab === tab
                    ? "bg-blue-500 text-white"
                    : "bg-[#1e293b] text-gray-400"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* List of Results */}
          <div className="flex-1 overflow-y-auto">
            {filteredResults.map((result, index) => (
              <div
                key={index}
                className="bg-[#1e293b] rounded p-4 mb-4 border border-gray-600"
              >
                <div className="flex justify-between">
                  <span
                    className={`font-bold ${
                      result.type === "Bug"
                        ? "text-red-400"
                        : result.type === "Security"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {result.type}
                  </span>
                  <span className="text-gray-400 text-sm">
                    Line {result.line}, Column {result.column}
                  </span>
                </div>
                <p className="mt-2 text-white">{result.title}</p>
                {result.suggestion && (
                  <div className="mt-2 text-gray-300 text-sm">
                    <strong>Suggestion:</strong> {result.suggestion}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
              Export Report
            </button>
            <button className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
              Copy All Fixes
            </button>
            <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
              Fix Selected Issues
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </Container>
  );
};

export default GetStarted;
