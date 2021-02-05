const express = require("express");
require("./src/database/mongoose");
const jobRouter = require("./src/routers/jobRouter");
const userRouter = require("./src/routers/userRouter");
const cors = require("cors");

const app = express();

// Any request to the site is met with a maintenance mode. Because the next function is never called, none of the
// other routes will ever get executed. It is a simple case of commenting this function out to bring the site
// back online!
// app.use((req, res, next) => {
//   res
//     .status(503)
//     .send(
//       "Site is temporarily down for maintenance. The site will be back online shortly. Appollogies for the inconvenience."
//     );
// });

// Process the incoming request object as a JSON object

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(jobRouter);
app.use(userRouter);

module.exports = app;
