"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const port = process.env.PORT;

const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");
const logger = require("./auth/middleware/logger");
const v1Routes = require("./auth/routes/v1");
const v2Routes = require("./auth/routes/v2");

const authRoutes = require("./auth/routes/routes");

// Prepare the express app
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("Hello world 🤪");
});
// App Level MW
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);

// Catchalls
app.use(logger);
app.use(notFound);
app.use("/api/v1", v1Routes);
app.use("/api/v1", v2Routes);

app.use("*", notFound);
app.use(errorHandler);
module.exports = {
  server: app,
  start: (port) => {
    if (!port) {
      throw new Error("Missing Port");
    }
    app.listen(port, () => console.log(`Listening on ${port}`));
  },
};
