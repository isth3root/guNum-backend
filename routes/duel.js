import express from "express";
import {
  sendDuelRequest,
  acceptDuelRequest,
  denyDuelRequest,
  recordDuelGuesses,
  getUserDuelRequests,
  getActiveDuels,
  getFinishedDuels,
  deleteDuel,
} from "../controllers/duel.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/send", authenticateToken, sendDuelRequest);
router.post("/accept", authenticateToken, acceptDuelRequest);
router.post("/deny", authenticateToken, denyDuelRequest);
router.post("/delete", authenticateToken, deleteDuel);
router.post("/record", authenticateToken, recordDuelGuesses);
router.get("/requests", authenticateToken, getUserDuelRequests);
router.get("/active", authenticateToken, getActiveDuels);
router.get("/finished", authenticateToken, getFinishedDuels);

export default router;
