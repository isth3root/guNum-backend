
import express from 'express';
import { addUsers, getUsers, deleteUser, getSingleUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/all', getUsers);
router.post('/add', addUsers);
router.delete("/delete", deleteUser)
router.get('/one', getSingleUser)

export default router;
