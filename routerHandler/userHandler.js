const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchemas");
const verifyLogin = require("../middlewares/verifyLogin");

const User = new mongoose.model("User", userSchema);

// signup user
router.post("/signup", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
      status: req.body.status,
    });
    await user.save();

    const { password, __v, ...newUser } = user._doc;
    res.status(200).json({
      success: true,
      message: "Singup was successfull.",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        // generate token
        const payload = {
          username: user.username,
          userId: user._id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        res.status(200).json({
          success: true,
          message: "Login successfull",
          access_token: token,
        });
      } else {
        res.status(401).json({
          error: "Authentication failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication failed!",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// get all the users
router.get("/", verifyLogin, async (req, res) => {
  try {
    const user = await User.find().populate("todos");
    res.status(200).json({
      success: true,
      message: "",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

module.exports = router;
