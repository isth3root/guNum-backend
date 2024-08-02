// ========== PACKAGES ========== \\
import express from "express";

// ========== CONTROLLERS ========== \\
import {
  signup,
  login,
  logout,
  deleteUser,
  sortUsers,
  getUsers,
  getSingleUser,
} from "../controllers/user.js";

// ========== MIDDLEWARE ========== \\
import { authenticateToken as generalAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", deleteUser);
router.get("/sort",generalAuth, sortUsers);
router.get("/all",generalAuth, getUsers);
router.get("/one",generalAuth, getSingleUser);

export default router;
