import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, require: true },
    score: {
      easy: { type: Number, default: 50 },
      medium: { type: Number, default: 100 },
      hard: { type: Number, default: 200 },
    },
    duelXP: { type: Number, default: 0 },
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
