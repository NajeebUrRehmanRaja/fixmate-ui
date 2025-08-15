import { Router } from "express";
import {
  reviewCode,
  saveCodeSnippet,
  findBugs,
  getCodeStats,
  getRecentActivity,
} from "../Controllers/code.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/code-stats", authMiddleware, getCodeStats);
router.get("/recent-activity", authMiddleware, getRecentActivity);
router.post("/review-code", reviewCode);
router.post("/find-bugs", findBugs);
router.post("/save-code", saveCodeSnippet);

export default router;
