import express from "express";
import { saveHighScore } from "../controllers/highScoreController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticateToken, saveHighScore);

export default router;
