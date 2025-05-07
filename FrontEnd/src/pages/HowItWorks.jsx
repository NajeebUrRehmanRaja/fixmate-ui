import React from "react";
import Container from "../components/Container";
import Cards from "../components/Cards";

const HowItWorks = () => {
  return (
    <Container className="mt-15 bg-purple-600 w-auto rounded p-5">
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
      <div className="mt-5 text-center rounded p-4">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-gray-800 border border-border shadow-lg">
          <div className="bg-primary flex items-center p-2 text-xs text-muted-foreground">
            <div className="flex space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
              <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-center text-xs">Demo</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 bg-code">
            <div className="p-4 border-r border-border">
              <pre className="text-xs md:text-sm text-code-foreground">
                <code>
                  <span className="text-purple-400">function</span>{" "}
                  <span className="text-blue-600">calculateTotal</span>(items){" "}
                  {"{"}
                  <br />
                  {"  "}
                  <span className="text-purple-400">let</span>{" "}
                  <span className="text-pink-500">total</span> ={" "}
                  <span className="text-sky-500">0</span>;
                  <br />
                  {"  "}
                  <span className="text-purple-400">for</span> (
                  <span className="text-purple-400">let</span>{" "}
                  <span className="syntax-variable">i</span> ={" "}
                  <span className="text-sky-500">0</span>; i &lt;= items.length;
                  i++) {"{"}{" "}
                  <span className="text-gray-500">
                    <br />
                    // Bug: &lt;= should be &lt;
                  </span>
                  <br />
                  {"    "}total += items[i].price;{" "}
                  <br />
                  <span className="text-gray-500">
                    // Potential error: items[i] might be undefined
                  </span>
                  <br />
                  {"  "}
                  {"}"}
                  <br />
                  {"  "}
                  <span className="text-purple-400">return</span> total;
                  <br />
                  {"}"}
                  <br />
                </code>
              </pre>
            </div>
            <div className="p-4 bg-gray-800">
              <div className="text-xs text-red-500 mb-4 border-l-2 border-red-500 pl-2">
                <p className="font-semibold">
                  Critical Bug: Out of bounds access
                </p>
                <p>
                  Line 3: Using &lt;= instead of &lt; will cause an out of
                  bounds array access.
                </p>
              </div>
              <div className="text-xs text-yellow-500 mb-4 border-l-2 border-yellow-500 pl-2">
                <p className="font-semibold">
                  Security Warning: Potential crash
                </p>
                <p>Line 4: No null check before accessing .price property.</p>
              </div>
              <div className="text-xs text-green-500 border-l-2 border-green-500 pl-2">
                <p className="font-semibold">Suggested fix:</p>
                <pre className="bg-green-500/10 p-2 rounded text-code-foreground">
                  <code>
                    for (let i = 0; i &lt; items.length; i++) {"{"}
                    <br />
                    {"  "}if (items[i]) {"{"}
                    <br />
                    {"    "}total += items[i].price || 0;
                    <br />
                    {"  "}
                    {"}"}
                    <br />
                    {"}"}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default HowItWorks;
