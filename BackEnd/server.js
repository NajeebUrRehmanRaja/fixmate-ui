import express from "express";
import connectDB from "./src/Config/db.config.js"; // also make sure the file ends in .js if you're using ES Modules
import dotenv from "dotenv";
import authRoutes from "./src/Routes/auth.routes.jsx";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
app.use("/api/auth", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});