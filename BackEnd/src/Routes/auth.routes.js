import express from "express";
import {
  signup,
  login,
  logout,
  getUser,
} from "../Controllers/auth.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current-user", authMiddleware, getUser);

export default router;
