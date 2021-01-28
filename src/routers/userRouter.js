const express = require("express");
const User = require("../database/models/userModel");

const userRouter = new express.Router();

// CREATE CREATE CREATE
userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    // 201 is semantically a creation code -
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ READ READ
userRouter.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

userRouter.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userRouter;
