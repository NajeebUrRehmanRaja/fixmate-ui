import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ButtonComponents";
import { GoArrowRight } from "react-icons/go";
import { Bug, Shield, Zap, Code, Check, Sparkles } from "lucide-react";
import AIReviewBox from "../Layouts/AiReviewBox";
import Cards from "../components/Cards";
import Container from "../components/Container"
import Footer from "../pages/Footer"
import HowItWorks from "./HowItWorks";

// For Code Review Dialog Box
const codeExmple = `
import React, { useState, useEffect } from 'react';

  function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserData();
  }); // ❌ Bug: Missing dependency array

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json(); // ⚠️ Warning: No response status check
      setUser(data);
    } catch (err) {
      setError(err.message);
      console.log(err); // 💡 Suggestion: Use a logging service
    } finally {
      setLoading(false);
    }
  };

  if (loading) return 'Loading...';
  if (error) return \`Error: \${error}\`;

  return (
    user && (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>
    )
  );
}

export default UserProfile;
`;

const issues = [
  {
    type: "bug",
    message:
      "Missing dependency array in useEffect may cause infinite render loops",
  },
  {
    type: "warning",
    message: "API response status not checked before parsing JSON",
  },
];

const Home = () => {
  return (
    <Container className="flex flex-col items-center justify-center pt-40 ">
      <div className="flex flex-col items-center justify-center space-y-2 ">
        <h6 className="px-2 py-1 border rounded-full text-[12px]">
          New Feature: Multi-language Support
        </h6>
        <h1 className="text-3xl flex flex-col justify-center items-center font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          AI-Powered Code Review <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent h-20">
            Detect Bugs Before They Ship
          </span>
        </h1>
      </div>
      <div className="text-muted-foreground md:text-xl text-gray-400 text-center">
        <p className="md:flex md:flex-col">
          CodeScribe helps developers write better code with instant automated{" "}
          <span></span>
          code reviews, bug detection, and smart suggestions.
        </p>
      </div>
      <Link to={"/getstarted"}>
        <Button
          variant="primary"
          className="mt-4 flex flex-row items-center gap-1 border hover:border-l-transparent hover:border-r-transparent hover:border-t-transparent hover:shadow-purple-400 hover:border-pink-600"
        >
          Try it for free
          <GoArrowRight className="text-2xl pt-1" />
        </Button>
      </Link>
      <div className="flex justify-center w-full ">
        <AIReviewBox
          filename="code-example.js"
          code={codeExmple}
          issues={issues}
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 mt-10">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 mt-5 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <div className="text-muted-foreground md:text-xl text-gray-400 text-center">
          <p className="md:flex md:flex-col mb-5">
            Our AI-powered code review platform provides comprehensive analysis
            to
            <span></span>
            help you write better, safer code.
          </p>
        </div>
        <div className="grid grid-cols-1 w-[450px] md:w-full md:grid-cols-3 lg:grid-cols-3 gap-5">
          <Cards
            icon={<Bug className="h-10 w-10 text-red-500" />}
            title="Bug Detection"
            content="Advanced AI algorithms identify potential bugs and logic errors in your code before they cause problems."
          />
          <Cards
            icon={<Shield className="h-10 w-10 text-yellow-500" />}
            title="Security Analysis"
            content="Detect security vulnerabilities and potential exploits with our comprehensive security scanning."
          />
          <Cards
            icon={<Zap className="h-10 w-10 text-blue-500" />}
            title="Performance Optimization"
            content="Get suggestions to improve your code's performance and efficiency based on best practices."
          />
        </div>
        <div></div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-[450px] md:w-full lg:grid-cols3 gap-5 ">
          <Cards
            icon={<Check className="h-10 w-10 text-green-500" />}
            title="Code Quality"
            content="Receive insights on code structure, readability, and maintainability to enhance overall quality."
          />
          <Cards
            icon={<Sparkles className="h-10 w-10 text-purple-500" />}
            title="AI-Powered Suggestions"
            content="Smart recommendations to fix issues with code samples tailored to your project's context."
          />
          <Cards
            icon={<Code className="h-10 w-10 text-indigo-500" />}
            title="Multi-Language Support"
            content="Works with multiple programming languages including JavaScript, Python, Java, C#, and more."
          />
        </div>
      </div>
      <HowItWorks />
    </Container>
  );
};

export default Home;