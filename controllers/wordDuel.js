// ========== MODELS ========== \\
import User from '../models/User.js';
import WordDuel from '../models/wordDuel.js';
import Word from '../models/Word.js';

export const requestWordDuel = async (req, res) => {
  const { receiverId, senderId } = req.body;

  try {
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: 'One or both users not found' });
    }

    if (sender._id.equals(receiver._id)) {
      return res.status(400).json({ error: "You can't request a duel with yourself" });
    }

    const existingDuel = await WordDuel.findOne({
      sender: sender._id,
      receiver: receiver._id,
      status: 'PENDING',
    });

    if (existingDuel) {
      return res.status(400).json({ message: 'A pending duel request already exists' });
    }

    const duel = new WordDuel({
      sender: sender._id,
      receiver: receiver._id,
    });
    await duel.save();

    res.status(201).json(duel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const acceptWordDuel = async (req, res) => {
  const { duelId } = req.body;

  try {
    const duel = await WordDuel.findByIdAndUpdate(
      duelId,
      { status: 'ACCEPTED' },
      { new: true }
    );

    res.status(200).json(duel);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const denyWordDuel = async (req, res) => {
  const { duelId } = req.body;

  try {
    await WordDuel.findByIdAndDelete(duelId);
    res.status(200).json({ message: 'Duel request denied' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const startWordRound = async (req, res) => {
  const { duelId, subject } = req.body;

  try {
    const duel = await WordDuel.findById(duelId);

    if (!duel || duel.status !== 'ACCEPTED') {
      return res.status(404).json({ error: 'Duel not found or not accepted' });
    }

    const roundNumber = duel.rounds.length + 1;

    if (roundNumber > 4) {
      return res.status(400).json({ error: 'Maximum rounds reached' });
    }

    const wordData = await Word.findOne({ subject });
    if (!wordData) {
      return res.status(404).json({ error: 'No words found for the selected subject' });
    }

    const randomWord = wordData.words[Math.floor(Math.random() * wordData.words.length)];

    duel.rounds.push({
      roundNumber,
      subject,
      senderGuess: null,
      receiverGuess: null,
    });

    await duel.save();
    res.status(200).json({ message: 'Round started', word: randomWord, duel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const recordWordGuess = async (req, res) => {
  const { duelId, roundNumber, guess, userId } = req.body;

  try {
    const duel = await WordDuel.findById(duelId);
    const round = duel.rounds.find(r => r.roundNumber === roundNumber);

    if (!duel || !round) {
      return res.status(404).json({ error: 'Invalid duel or round' });
    }

    if (userId.equals(duel.sender._id)) {
      if (round.senderGuess !== null) {
        return res.status(400).json({ error: 'Guess already made for this round' });
      }
      round.senderGuess = guess;
    } else if (userId.equals(duel.receiver._id)) {
      if (round.receiverGuess !== null) {
        return res.status(400).json({ error: 'Guess already made for this round' });
      }
      round.receiverGuess = guess;
    } else {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await duel.save();

    if (round.senderGuess !== null && round.receiverGuess !== null) {
      if (roundNumber === 4) {
        const senderScore = duel.rounds.reduce((score, round) => score + (round.senderGuess || 0), 0);
        const receiverScore = duel.rounds.reduce((score, round) => score + (round.receiverGuess || 0), 0);

        const winner = senderScore < receiverScore ? duel.sender : duel.receiver;

        duel.winner = winner;
        duel.status = 'COMPLETED';
        await duel.save();

        return res.status(200).json({ message: 'Duel completed', duel });
      }
    }

    res.status(200).json({ message: 'Guess recorded', duel });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const allWordDuels = async (req, res) => {

  try {
    const wordDuels = await WordDuel.find({});
    res.status(200).json({ wordDuels});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};