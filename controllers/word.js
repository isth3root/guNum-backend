import Word from "../models/Word.js"

export const getSingleWord = async (req, res) => {
    const { subject, difficulty, language } = req.query;

    if (!language || !['English', 'Persian'].includes(language)) {
        return res.status(400).json({ message: 'Invalid or missing language parameter' });
    }

    try {
        const result = await Word.findOne({ subject, difficulty, language });
        
        if (!result) {
            return res.status(404).json({ message: 'No words found for the given criteria' });
        }

        const randomWord = result.words[Math.floor(Math.random() * result.words.length)].toUpperCase();
        res.json({ word: randomWord });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred while fetching the word' });
    }
};

export const getAllWords = async (req,res) => {
    try {
        const result = await Word.find({})
        if (!result) {
            return res.status(404).json({ message: 'No words found for the given criteria' });
        }
    res.json({ result });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'An error occurred while fetching the word' });
    }
}