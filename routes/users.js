import express from "express";
import {
  signup,
  login,
  logout,
  getUsers,
  deleteUser,
  getSingleUser,
  changeUsername,
} from "../controllers/userController.js";

import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout)
router.delete("/delete", deleteUser);
router.get("/all", getUsers);
router.get("/one", getSingleUser);
router.put("/changeusername", authenticateToken, changeUsername);

export default router;
