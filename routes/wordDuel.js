// routes/wordDuel.js
import express from 'express';
// import { authenticateToken } from '../middleware/auth.js';
import { 
  requestWordDuel, 
  acceptWordDuel, 
  denyWordDuel, 
  startWordRound, 
  recordWordGuess,
  allWordDuels
} from '../controllers/wordDuel.js';

const router = express.Router();

router.post('/request', requestWordDuel);
router.post('/accept', acceptWordDuel);
router.post('/deny', denyWordDuel);
router.post('/round', startWordRound);
router.post('/guess', recordWordGuess);
router.get('/all', allWordDuels);

export default router;
