import User from '../models/User.js';

export const saveHighScore = async (req, res) => {
  const { username, score, difficulty } = req.body;

  try {
    
    let user = await User.findOne({ username });
    
    
    // if (!user) {
    //   user = new User({
    //     username,
    //     score: {
    //       easy: Infinity, 
    //       medium: Infinity,
    //       hard: Infinity
    //     }
    //   });
    // }
    
    
    if (difficulty === "EASY") {
      if (score < user.score.easy) {
        user.score.easy = score;
      } else {
        return res.status(400).json({ "message": "User easy score already smaller or equal" });
      }
    } else if (difficulty === "MEDIUM") {
      if (score < user.score.medium) {
        user.score.medium = score;
      } else {
        return res.status(400).json({ "message": "User medium score already smaller or equal" });
      }
    } else if (difficulty === "HARD") {
      if (score < user.score.hard) {
        user.score.hard = score;
      } else {
        return res.status(400).json({ "message": "User hard score already smaller or equal" });
      }
    } else {
      return res.status(400).json({ "message": "Invalid difficulty level" });
    }
    
    await user.save();
    res.status(200).json({ score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
