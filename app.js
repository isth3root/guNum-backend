
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import highScoresRouter from './routes/highScores.js';
import usersRouter from './routes/users.js';
import cors from "cors";
import duelRoutes from "./routes/duel.js"
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGOOSE_URL)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());

app.use('/hs', highScoresRouter);
app.use('/users', usersRouter);
app.use('/duel', duelRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;
