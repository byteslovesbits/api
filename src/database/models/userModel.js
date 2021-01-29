const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// SCHEMA
// A schema defines and maps the shape of a document within a mongodb collection.

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    unique: true,

    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error(
          "ValidationError: Email address has an incorrect format!"
        );
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (!validator.isStrongPassword(value)) {
        throw new Error(
          "ValidatorError: Password is too weak! Consider adding some capital letters, special characters and numbers to increase your security..."
        );
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  // this binds to the user.
  // NOTE: We cannot use arrow functions in mongoose middle ware as they do not bind this
  const user = this;
  console.log("Middleware active right before saving...");

  if (user.isModified("password")) {
    // The salt cannot be too short or too long. To long and it will take forever to generate a hashed password.
    // If the salt is too short it is easier to break the hash
    user.password = await bcrypt.hash(user.password, 8);
  }
  // We must call next() or the middleware will just hang and the request will eventually timeout!
  next();
});

// MODELS
// An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

const User = mongoose.model("User", userSchema);

module.exports = User;
