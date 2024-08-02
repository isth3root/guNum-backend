// ========== PACKAGES ========== \\
import express from "express"

// ========== CONTROLLERS ========== \\
import { getAllWords, getSingleWord } from "../controllers/word.js"

// ========== MIDDLEWARE ========== \\
import { authenticateToken as generalAuth} from "../middleware/auth.js";

const router = express.Router();


router.get("/single",generalAuth, getSingleWord)
router.get("/all",generalAuth, getAllWords)

export default router;