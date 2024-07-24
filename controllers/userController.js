import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res
      .status(201)
      .json( user );
  } catch (err) {
    res.status(500).json({ error: "Error during signup" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "15d" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(201).json( user );
  } catch (err) {
    res.status(500).json({ error: "Error during Login" });
  }
};

export const logout = async (req, res) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Username not found" });
    }
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out and cookie cleared" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({score: -1});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error during getting all users" });
  }
};

export const getSingleUser = async (req, res) => {
  const username = req.query.username;
  try {
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Error during get single user" });
  }
};

export const deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      await User.deleteOne({ username });
      res.cookie("token", "", {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        expires: new Date(0),
      });
      res.status(200).json({ message: "User deleted and cookie cleared" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error during delete a user" });
  }
};

export const changeUsername = async (req, res) => {
  const { currentUsername, newUsername } = req.body;

  try {
    let user = await User.findOne({ username: currentUsername });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = newUsername;
    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
