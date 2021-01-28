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

module.exports = jobRouter;
