import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./src/Config/db.config.js"; // also make sure the file ends in .js if you're using ES Modules
import dotenv from "dotenv";
import authRoutes from "./src/Routes/auth.routes.js";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is Running on PORT: ${PORT}`);
});