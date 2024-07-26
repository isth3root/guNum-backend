import express from "express";
import {
  signup,
  login,
  logout,
  deleteUser,
  sortUsers,
  getUsers,
  getSingleUser,
  changeUsername,
} from "../controllers/userController.js";

import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", deleteUser);
router.get("/sort", authenticateToken, sortUsers);
router.get("/all", authenticateToken, getUsers);
router.get("/one", authenticateToken, getSingleUser);
router.put("/changeusername", authenticateToken, changeUsername);

export default router;
