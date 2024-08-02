// ========== PACKAGES ========== \\
import express from "express";

// ========== CONTROLLERS ========== \\
import { saveHighScore } from "../controllers/highScore.js";

// ========== MIDDLEWARE ========== \\
import { authenticateToken as generalAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", generalAuth, saveHighScore);

export default router;
