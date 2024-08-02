// ========== MODELS ========== \\
import User from "../models/User.js";

export const saveHighScore = async (req, res) => {
  const { username, score, difficulty } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (difficulty === "EASY") {
      if (score < user.numSinglePlayScore.easy) {
        user.numSinglePlayScore.easy = score;
      }
    } else if (difficulty === "MEDIUM") {
      if (score < user.numSinglePlayScore.medium) {
        user.numSinglePlayScore.medium = score;
      }
    } else if (difficulty === "HARD") {
      if (score < user.numSinglePlayScore.hard) {
        user.numSinglePlayScore.hard = score;
      }
    } else {
      return res.status(400).json({ message: "Invalid difficulty level" });
    }

    await user.save();
    res.status(200).json({ score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
