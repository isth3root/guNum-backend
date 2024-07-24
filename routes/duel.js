import express from 'express';
import {
  sendDuelRequest,
  acceptDuelRequest,
  denyDuelRequest,
  recordDuelGuesses,
  getUserDuelRequests,
  getActiveDuels,
  getFinishedDuels,
  deleteDuel
} from '../controllers/duelController.js';


const router = express.Router();


router.post('/send', sendDuelRequest);


router.post('/accept', acceptDuelRequest);


router.post('/deny', denyDuelRequest);


router.post('/delete', deleteDuel);


router.post('/record', recordDuelGuesses);


router.get('/requests', getUserDuelRequests);


router.get('/active', getActiveDuels);


router.get('/finished', getFinishedDuels);


export default router;
