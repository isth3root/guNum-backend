import mongoose from 'mongoose';

const duelSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  difficulty: { type: String, enum: ['EASY', 'MEDIUM', 'HARD'], required: true },
  status: { type: String, enum: ['PENDING', 'ACTIVE', 'FINISHED'], default: 'PENDING' },
  senderGuesses: { type: Number },
  receiverGuesses: { type: Number },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
  versionKey: false,
  timestamps: true
});

const Duel = mongoose.model('Duel', duelSchema);

export default Duel;
