const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
    },
    todos: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Todo",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = userSchema;
