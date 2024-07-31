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
} from "../controllers/user.js";

// import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/delete", deleteUser);
router.get("/sort", sortUsers);
router.get("/all", getUsers);
router.get("/one", getSingleUser);
router.put("/changeusername", changeUsername);

export default router;
