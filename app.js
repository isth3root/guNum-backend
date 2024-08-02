// ========== PACKAGES ========== \\
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// ========== ROUTES ========== \\
import highScores from "./routes/highScores.js";
import users from "./routes/users.js";
import duel from "./routes/duel.js";
import word from "./routes/word.js"
import wordDuel from "./routes/wordDuel.js"

dotenv.config();

const localPORT = process.env.LOCALHOST_PORT;
const devPORT = process.env.DEV_PORT;
const app = express();
app.use(
  cors({
    origin: "https://gunumber.netlify.app",
    // origin: `http://localhost:${devPORT}`,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.json());

app.use("/hs", highScores);
app.use("/users", users);
app.use("/duel", duel);
app.use("/word", word);
app.use("/word-duel",wordDuel)

app.listen(localPORT, () => {
  console.log(`Server is running on ${localPORT}`);
});

export default app;
