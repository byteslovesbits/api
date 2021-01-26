const mongoose = require("mongoose");

// SCHEMA
// A schema defines and maps the shape of a document within a mongodb collection.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

// MODELS
// An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

const User = mongoose.model("User", userSchema);

module.exports = User;
