import express from "express"
import { getAllWords, getSingleWord } from "../controllers/word.js"

const router = express.Router();


router.get("/single", getSingleWord)
router.get("/all", getAllWords)

export default router;