const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchemas");

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
router.get("/", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// get single user by id
router.get("/:id", async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "",
      data: "",
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// Edit user
router.put("/:id", async (req, res) => {
  try {
    const data = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "User was updated successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    let data = await User.findByIdAndDelete(req.params.id).select({
      name: 0,
      username: 0,
      status: 0,
      password: 0,
      date: 0,
    });
    res.status(200).json({
      success: true,
      message: "User was deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "There was an server side error!",
    });
  }
});

module.exports = router;
