
import User from '../models/User.js';

export const addUsers = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      if (user.password != password) {
        res.status(403).json({ message: "wrong password" })
      } else {
        res.status(200).json( user );
      }
    } else {
      user = new User({ username, password });
      await user.save();
      res.status(201).json(user);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({score: -1})
    res.status(200).json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({error: "server error"})
  }
}

export const deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      await User.deleteOne({ username });
      res.status(200).json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};