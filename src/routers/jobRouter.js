const express = require("express");
const Job = require("../database/models/jobModel");

const jobRouter = new express.Router();

// CREATE CREATE CREATE
jobRouter.post("/jobs", async (req, res) => {
  const job = new Job(req.body);

  try {
    await job.save();
    res.send(job);
  } catch (error) {
    res.status(400).send(error);
  }
});

// READ READ READ
jobRouter.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find({});
    res.send(jobs);
  } catch (error) {
    res.status(500).send();
  }
});

jobRouter.get("/jobs/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).send();
    }
    res.send(job);
  } catch (error) {
    res.status(500).send();
  }
});

// UPDATE UPDATE UPDATE
jobRouter.patch("/jobs/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true,
    });
    if (!updatedJob) {
      res.status(404).send();
    }
    res.send(updatedJob);
  } catch (error) {
    res.status(400).send();
  }
});

// DELETE DELETE DELETE
jobRouter.delete("/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) {
      return res.status(404).send();
    }
    res.send(deletedJob);
  } catch (error) {
    res.status(400).send();
  }

  const deletedJob = await Job.findByIdAndDelete(req.params.id);
});

module.exports = jobRouter;
