import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ButtonComponents";
import { GoArrowRight } from "react-icons/go";
import AIReviewBox from "../Layouts/AiReviewBox";
// import Cards from "../components/Cards";

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
    <div className="flex flex-col items-center justify-center pt-50">
      <div className="flex flex-col items-center justify-center space-y-2 ">
        <h6 className="px-3 py-1 border rounded-full">
          New Feature: Multi-language Support
        </h6>
        <h1 className="text-3xl flex flex-col justify-center items-center font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
          AI-Powered Code Review <br />
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent h-20">
            Detect Bugs Before They Ship
          </span>
        </h1>
      </div>
      <p className="mx-auto flex flex-col justify-center items-center max-w-[700px] text-muted-foreground md:text-xl text-gray-400">
        CodeScribe helps developers write better code with instant automated{" "}
        <span></span>
        code reviews, bug detection, and smart suggestions.
      </p>
      <Link to={"/getstarted"}>
        <Button
          variant="primary"
          className="mt-4 flex flex-row items-center gap-2 hover:gap-3"
        >
          Try it for free
          <GoArrowRight className="text-2xl " />
        </Button>
      </Link>
      <AIReviewBox
        filename="code-example.js"
        code={codeExmple}
        issues={issues}
      />
      
    </div>
  );
};

export default Home;
