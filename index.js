const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const todoHandler = require("./routerHandler/todoHandler");
const userHandler = require("./routerHandler/userHandler");
const verifyLogin = require("./middlewares/verifyLogin");

const app = express();
dotenv.config();
app.use(express.json());

// database connection with mongoose
mongoose
  .connect("mongodb://localhost/todos")
  .then(() => console.log("DB Connected successfully."))
  .catch((e) => console.log(e));

// application routes
app.use("/todo", verifyLogin, todoHandler);
app.use("/user", userHandler);

app.get("/", (req, res) => {
  res.send("Hello Pavel");
});

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
  console.log(`App listining at port 3000`);
});
