const mongoose = require("mongoose");

const userPress = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  keywords: { type: String },
});

const UserPress = mongoose.model("UserPress", userPress);

module.exports = UserPress;
