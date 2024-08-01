import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
    subject: String,
    language: {
        type: String,
        enum: ["English", "Persian"],
        required: true
    },
    words: [String]
});

const Word = mongoose.model("Word", wordSchema)

export default Word;