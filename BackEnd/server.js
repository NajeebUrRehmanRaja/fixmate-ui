import express from "express";
import connectDB from "./src/Config/db.config.js"; // also make sure the file ends in .js if you're using ES Modules
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});