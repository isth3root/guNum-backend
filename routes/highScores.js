
import express from 'express';
import { saveHighScore } from '../controllers/highScoreController.js';

const router = express.Router();

router.post('/', saveHighScore);

export default router;
