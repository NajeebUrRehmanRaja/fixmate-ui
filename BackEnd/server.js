// index.js
const express = require("express");
const app = express();
// const PORT = process.env.PORT || 5000;
const { clerkMiddleware } = require( '@clerk/express')
const { env } = require(`env.config.js`)
// Middleware
app.use(express.json()); // to parse JSON request bodies
app.use(clerkMiddleware());

const PORT = env.PORT || 3000;
// Start server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
