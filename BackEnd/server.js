// index.js
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { clerkMiddleware } = require('@clerk/express')
// Middleware
app.use(express.json()); // to parse JSON request bodies
app.use(clerkMiddleware());
// Test route
app.get("/", (req, res) => {
  res.send("Hello, Express Backend!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
