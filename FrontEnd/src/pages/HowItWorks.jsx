import React from "react";
import Container from "../components/Container";
import Cards from "../components/Cards";

const HowItWorks = () => {
  return (
    <Container className="mt-5 bg-purple-600 w-auto rounded p-5">
      {/* Header Section */}
      <div className="flex flex-col justify-center py-4 items-center text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">How It Works</h1>
        <p className="text-base md:text-lg max-w-2xl">
          Get started in minutes and improve your code quality with our
          AI-powered review process.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 bg-purple-700 rounded gap-6 p-5">
        <Cards
          title="Submit Your Code"
          content="Upload a file or paste your code directly into our editor. We support multiple programming languages."
        />
        <Cards
          title="AI Analysis"
          content="Our advanced AI engine analyzes your code for bugs, security vulnerabilities, performance issues, and style inconsistencies."
        />
        <Cards
          title="Review Results"
          content="See a detailed breakdown of issues found, categorized by type and severity, along with suggestions for fixes."
        />
        <Cards
          title="Apply Improvements"
          content="Apply suggested fixes automatically, or manually implement the recommendations to improve your code quality."
        />
      </div>
      <div className="mt-5 rounded flex flex-col md:flex-row justify-center items-start max-w-6xl mx-auto bg-gray-400 p-4 gap-5">
        {/* Code Preview Section */}
        <div className="w-full md:w-1/2 h-[250px] md:h-[300px] overflow-x-auto bg-black rounded-md p-3">
          <pre className="text-green-300 text-sm md:text-base">
            <code>
              {`function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i <= items.length; i++) { // Bug: <= should be <
    total += items[i].price; // Potential error: items[i] might be undefined
  }
  return total;
}`}
            </code>
          </pre>
        </div>

        {/* Bug Details Section */}
        <div className="w-full md:w-1/2 bg-black rounded-md p-4 space-y-4">
          {/* Critical Bug */}
          <div className="border-l-4 border-red-500 pl-3">
            <h1 className="text-red-400 font-bold text-sm md:text-base">
              Critical Bug: Out of bounds access
            </h1>
            <p className="text-red-300 text-xs md:text-sm mt-1">
              Line 3: Using <code>&lt;=</code> instead of <code>&lt;</code> will
              cause an out of bounds array access.
            </p>
          </div>

          {/* Security Warning */}
          <div className="border-l-4 border-yellow-400 pl-3">
            <h1 className="text-yellow-400 font-bold text-sm md:text-base">
              Security Warning: Potential crash
            </h1>
            <p className="text-yellow-300 text-xs md:text-sm mt-1">
              Line 4: No null check before accessing <code>.price</code>{" "}
              property.
            </p>
          </div>

          {/* Suggested Fix */}
          <div className="border-l-4 border-green-400 pl-3">
            <h1 className="text-green-400 font-bold text-sm md:text-base">
              Suggested fix:
            </h1>
            <pre className="text-green-300 text-xs md:text-sm mt-1 overflow-x-auto">
              <code>
                {`for (let i = 0; i < items.length; i++) {
  if (items[i]) {
    total += items[i].price || 0;
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;
