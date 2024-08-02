import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    numSinglePlayScore: {
      easy: { type: Number, default: 50 },
      medium: { type: Number, default: 100 },
      hard: { type: Number, default: 200 },
    },

    numDuelXP: { type: Number, default: 0 },
    wordDuelXP: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
