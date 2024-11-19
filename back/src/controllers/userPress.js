const express = require("express");
const router = express.Router();
const UserPress = require("../models/userPress");

exports.addKeyword = async (req, res) => {
  try {
    const { userId, keyword } = req.body;

    const userPress = await UserPress.findOne({ userId });

    if (!userPress) {
      const newUserPress = new UserPress({ userId, keywords: keyword });
      const savedUserPress = await newUserPress.save();
      res.json(savedUserPress);
    } else {
      userPress.keywords = keyword;
      const updatedUserPress = await userPress.save();
      res.json(updatedUserPress);
    }
  } catch (error) {
    console.error("Error adding keyword:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
  exports.getUserKeywords = async (req, res) => {
    try {
      const { userId } = req.params;

      const userPress = await UserPress.findOne({ userId });

      if (userPress) {
        res.json({ keywords: userPress.keywords });
      } else {
        res.status(404).json({ error: "UserPress not found" });
      }
    } catch (error) {
      console.error("Error retrieving user keywords:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
exports.getUserKeywords = async (req, res) => {
  try {
    const { userId } = req.params;

    const userPress = await UserPress.findOne({ userId });

    if (userPress) {
      res.json({ keywords: userPress.keywords });
    } else {
      res.status(404).json({ error: "UserPress not found" });
    }
  } catch (error) {
    console.error("Error retrieving user keywords:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.removeKeyword = async (req, res) => {
  try {
    const { userId } = req.body;

    const userPress = await UserPress.findOne({ userId });

    if (userPress) {
      userPress.keywords = "";
      const updatedUserPress = await userPress.save();
      res.json(updatedUserPress);
    } else {
      res.status(404).json({ error: "UserPress not found" });
    }
  } catch (error) {
    console.error("Error removing keyword:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
