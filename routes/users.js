
import express from 'express';
import { addUsers, getUsers, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/all', getUsers);
router.post("/add", addUsers);
router.delete("/delete", deleteUser)

export default router;
