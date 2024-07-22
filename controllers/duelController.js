import User from "../models/User.js";
import Duel from "../models/Duel.js";

export const sendDuelRequest = async (req, res) => {
  const { senderUsername, receiverUsername, difficulty } = req.body;

  try {
    const senderUser = await User.findOne({ username: senderUsername });
    const receiverUser = await User.findOne({ username: receiverUsername });
    if (senderUser == receiverUser) return

    if (!senderUser || !receiverUser) {
      return res.status(404).json({ error: "One or both users not found" });
    }

    const duel = new Duel({
      sender: senderUser._id,
      receiver: receiverUser._id,
      difficulty,
      status: "PENDING",
    });
    await duel.save();

    res.status(201).json(duel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


export const acceptDuelRequest = async (req, res) => {
  const { duelId } = req.body;

  try {
    const duel = await Duel.findByIdAndUpdate(
      duelId,
      { status: "ACTIVE" },
      { new: true }
    );

    res.status(200).json(duel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const denyDuelRequest = async (req, res) => {
  const { duelId } = req.body;

  try {
    await Duel.findByIdAndDelete(duelId);
    res.status(200).json({ message: "Duel request denied" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteDuel = async (req, res) => {
    const { duelId } = req.body;
    try {
      await Duel.findByIdAndDelete(duelId);
      res.status(200).json({ message: "Duel deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };

export const recordDuelGuesses = async (req, res) => {
  const { duelId, username, guesses } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOne({ username });

    const duel = await Duel.findById(duelId);

    if (!duel || duel.status !== "ACTIVE") {
      return res.status(404).json({ message: "Duel not found or not active" });
    }

    if (duel.sender.toString() === user._id.toString()) {
      duel.senderGuesses = guesses;

    } else if (duel.receiver.toString() === user._id.toString()) {
      duel.receiverGuesses = guesses;
    }
    await duel.save();

    if (duel.senderGuesses && duel.receiverGuesses) {
      let winner;
      if (duel.senderGuesses < duel.receiverGuesses) {
        winner = duel.sender;
      } else if (duel.receiverGuesses < duel.senderGuesses) {
        winner = duel.receiver;
      } else {
        // Tie
        await User.findByIdAndUpdate(duel.sender, { $inc: { duelXP: 2 } });
        await User.findByIdAndUpdate(duel.receiver, { $inc: { duelXP: 2 } });
        duel.status = "FINISHED";
        await duel.save();
        return res
          .status(200)
          .json({ message: "Guesses recorded, it's a tie", duel });
      }

      if (winner) {
        duel.winner = winner;
        const xp =
          duel.difficulty === "EASY"
            ? 4
            : duel.difficulty === "MEDIUM"
            ? 6
            : 10;
        await User.findByIdAndUpdate(winner, { $inc: { duelXP: xp } });
      }

      duel.status = "FINISHED";
      await duel.save();

      res.status(200).json({ message: "Guesses recorded", duel });
    } else {
      res
        .status(400)
        .json({ message: "Both players need to record their guesses" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getUserDuelRequests = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const requests = await Duel.find({ receiver: user._id, status: "PENDING" });
    res.status(200).json({ requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getActiveDuels = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const duels = await Duel.find({
      $or: [{ sender: user._id }, { receiver: user._id }],
      status: "ACTIVE",
    });
    res.status(200).json({ duels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getFinishedDuels = async (req, res) => {
  const { username } = req.query;
  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const duels = await Duel.find({
      $or: [{ sender: user._id }, { receiver: user._id }],
      status: "FINISHED",
    });
    res.status(200).json({ duels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
