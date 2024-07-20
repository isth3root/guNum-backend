
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import highScoresRouter from './routes/highScores.js';
import usersRouter from './routes/users.js';
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors())
const PORT = process.env.PORT;

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
