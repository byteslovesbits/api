const express = require("express");
const User = require("../database/models/userModel");

const userRouter = new express.Router();

userRouter.post("/users", (req, res) => {
  // res.send(req.body);
  const user = new User(req.body);
  user
    .save(user)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = userRouter;
