const express = require("express");
require("./src/database/mongoose");
const jobRouter = require("./src/routers/jobRouter");
const userRouter = require("./src/routers/userRouter");

const app = express();

// Process the incoming request object as a JSON object
app.use(express.json());
app.use(jobRouter);
app.use(userRouter);

module.exports = app;
