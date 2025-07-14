import { Router } from "express";
import { reviewCode ,saveCodeSnippet} from "../Controllers/code.controller.js";
import { authMiddleware } from "../Middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware)

router.get("/review-code",reviewCode);
router.post("/save-code", saveCodeSnippet);

export default router;
