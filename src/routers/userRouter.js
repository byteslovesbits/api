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

// UPDATE UPDATE UPDATE
userRouter.patch("/users/:id", async (req, res) => {
  // Provide a better validation response to the client if they attempt to update invalid properties
  // If an incoming update is not in the permitted updates list then throw an error

  const updatesRequested = Object.keys(req.body);
  const permittedUpdates = ["name", "email", "password"];

  const isValidUpdate = updatesRequested.every((update) =>
    permittedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res
      .status(400)
      .send({ Error: "You have attempted to perform an invalid update!" });
  }

  try {
    const updatedUser = await User.findById(req.params.id);
    updatesRequested.forEach(
      (requestedUpdate) =>
        (updatedUser[requestedUpdate] = req.body[requestedUpdate])
    );

    await updatedUser.save();

    if (!updatedUser) {
      return res.status(404).send({ Error: "User not found!" });
    }

    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE DELETE DELETE
userRouter.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send();
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(400).send();
  }
});

module.exports = userRouter;
