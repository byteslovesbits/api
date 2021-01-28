const mongoose = require("mongoose");

// SCHEMA
// A schema defines and maps the shape of a document within a mongodb collection.

const jobSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false, // Jobs default to incomplete when added
  },
});

// MODELS
// An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

const JobModel = mongoose.model("Job", jobSchema);

module.exports = JobModel;
