import mongoose from 'mongoose';

const wordDuelSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED'],
    default: 'PENDING',
  },
  rounds: [
    {
      roundNumber: Number,
      subject: String,
      senderGuess: Number,
      receiverGuess: Number, 
    }
  ],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
  versionKey: false,
  timestamps: true,
});

const WordDuel = mongoose.model('WordDuel', wordDuelSchema);

export default WordDuel;
