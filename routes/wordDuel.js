// ========== PACKAGES ========== \\
import express from 'express';

// ========== CONTROLLERS ========== \\
import { 
  requestWordDuel, 
  acceptWordDuel, 
  denyWordDuel, 
  startWordRound, 
  recordWordGuess,
  allWordDuels
} from '../controllers/wordDuel.js';

// ========== MIDDLEWARE ========== \\
import { authenticateToken as generalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/request',generalAuth, requestWordDuel);
router.post('/accept',generalAuth, acceptWordDuel);
router.post('/deny', generalAuth, denyWordDuel);
router.post('/round',generalAuth, startWordRound);
router.post('/guess', generalAuth, recordWordGuess);
router.get('/all',generalAuth, allWordDuels);

export default router;
