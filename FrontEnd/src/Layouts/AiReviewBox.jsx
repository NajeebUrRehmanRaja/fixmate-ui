import React from "react";

const AIReviewBox = ({ filename = "code-example.js", code, issues = [] }) => {
  return (
    <div className="relative mt-16 rounded-lg border bg-code w-[700px] md:w-[80%] text-code-foreground overflow-hidden shadow-xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <div className="flex items-center space-x-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
        </div>
        <div className="text-xs">{filename}</div>
        <div></div>
      </div>

      <div className="p-4">
        <pre className="text-sm overflow-x-auto">
          <code>{code}</code>
        </pre>

        <div className="absolute top-14 right-4 w-64 animate-pulse-slow space-y-2">
          {issues.map((issue, index) => (
            <div
              key={index}
              className={`p-2 rounded-md text-xs animate-pulse ${
                issue.type === "bug"
                  ? "bg-red-500/20 text-red-400"
                  : "bg-yellow-500/20 text-yellow-400"
              }`}
            >
              <span className="font-semibold capitalize">{issue.type}:</span>{" "}
              {issue.message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIReviewBox;
