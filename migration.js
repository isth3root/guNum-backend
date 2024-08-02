import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv"
dotenv.config()

const removeWordSinglePlayScore = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    console.log('MongoDB connected');


    const result = await User.updateMany(
      {},
      { $unset: { wordSinglePlayScore: "" } }
    );

    console.log(`Updated ${result.modifiedCount} users.`);
  } catch (err) {
    console.error('Error removing wordSinglePlayScore:', err);
  } finally {
    mongoose.disconnect();
  }
};

removeWordSinglePlayScore();
