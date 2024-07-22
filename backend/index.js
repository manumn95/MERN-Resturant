const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const PORT = process.env.PORT || 8080;

// mongodb connection

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

//Schema

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    Unique: true,
  },
  password: String,
  confirmPassword: String,
  image: String,
});
const UserModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Server is Running");
});

//signup API
app.post("/signUp", async (req, res) => {
  const { email } = req.body;
  const alreadySignUp = await UserModel.findOne({ email });
  if (alreadySignUp) {
    res.send({
      message: "Email already registerd",
      error: true,
      success: false,
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);
    const data = await UserModel({
      ...req.body,
      password: hashPassword,
    });
    const save = data.save();
    res.send({
      message: "User signedUp Successfully",
      success: true,
      error: false,
    });
  }
});

//Login API

app.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    image: user.image,
    _id:user._id
  };
  if (user) {
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (isPasswordValid) {
      res.send({
        message: "Login success",
        data: payload,
        success: true,
        error: false,
      });
    } else {
      res.send({
        message: "Incorrect password",
        success: false,
        error: true,
      });
    }
  } else {
    res.send({
      message: "User not found",
      success: false,
      error: true,
    });
  }
});

app.listen(PORT, () => {
  console.log("server is running at" + PORT);
});
