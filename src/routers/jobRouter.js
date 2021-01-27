const express = require("express");
const Job = require("../database/models/jobModel");

const jobRouter = new express.Router();

jobRouter.post("/jobs", (req, res) => {
  // res.send(req.body);
});

module.exports = jobRouter;
