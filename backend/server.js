const express = require("express");
const cors = require("cors");
const logger = require("./logger");

// ROUTES
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// HEALTH CHECK
app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Backend is running correctly!");
});

// ROUTES
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

// START SERVER
app.listen(4000, () => {
  logger.info("Backend running on port 4000");
  console.log("Backend running on port 4000");
});
