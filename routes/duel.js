// ========== PACKAGES ========== \\
import express from "express";


// ========== CONTROLLERS ========== \\
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

// ========== MIDDLEWARE ========== \\
import { authenticateToken as generalAuth} from "../middleware/auth.js";

const router = express.Router();

router.post("/send", generalAuth, sendDuelRequest);
router.post("/accept", generalAuth, acceptDuelRequest);
router.post("/deny", generalAuth, denyDuelRequest);
router.post("/delete", generalAuth, deleteDuel);
router.post("/record", generalAuth, recordDuelGuesses);
router.get("/requests", generalAuth, getUserDuelRequests);
router.get("/active", generalAuth, getActiveDuels);
router.get("/finished", generalAuth, getFinishedDuels);

export default router;
