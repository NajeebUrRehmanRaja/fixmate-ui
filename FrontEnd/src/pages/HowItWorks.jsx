import React from "react";
import Container from "../components/Container";
import Cards from "../components/Cards";

const HowItWorks = () => {
  return (
    <Container className="mt-5 bg-purple-900 rounded p-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">How It Works</h1>
        <p>
          Get started in minutes and improve your code quality with our
          AI-powered review process.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 lg:grid-cols-4 p-5">
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
    </Container>
  );
};

export default HowItWorks;
