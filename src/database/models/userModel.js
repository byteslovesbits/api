const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  jsonWebTokens: [
    {
      jwt: {
        type: String,
        required: true,
      },
    },
  ],
});

// INSTANCE METHODS
userSchema.methods.makeJWT = async function () {
  const user = this;
  const jsonWebToken = jwt.sign(
    { _id: user._id.toString() },
    "bscomputersciencefinalyearproject"
  );
  user.jsonWebTokens = user.jsonWebTokens.concat({ jwt: jsonWebToken });
  await user.save();
  return jsonWebToken;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.jsonWebTokens;

  return userObject;
};
// MIDDLEWARE
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

// STATICS
userSchema.statics.findByEmailAndPassword = async function (email, password) {
  // First check if a user with the email actually exists
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new Error("Error: Login Failed!");
  }

  // Compare users password with the hashed password
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    throw new Error("Error: 'Login Failed!'");
  }
  return user;
};

// MODELS
// An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

const User = mongoose.model("User", userSchema);

module.exports = User;
