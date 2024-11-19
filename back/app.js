require("dotenv").config();
const express = require("express");
const expressListEndpoints = require("express-list-endpoints");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/user");
const pressRouter = require("./routes/press");
const userPressRouter = require("./routes/userPress");
const cryptoRouteur = require("./routes/crypto");
const loginRouter = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

// DB connection
var app = express();
const connectionString =
  "mongodb+srv://admin:admin@crypto.g1gwxfl.mongodb.net/";
const mongoDB = process.env.MONGODB_URI || connectionString;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use("/users", loginRouter);
app.use("/cryptos", cryptoRouteur);
app.use("/articles", pressRouter);
app.use("/userPress", userPressRouter);

// Protected routes
app.use(authMiddleware.verifyToken);
app.use("/users", userRouter);

// Routes
console.log(expressListEndpoints(app));
module.exports = app;
