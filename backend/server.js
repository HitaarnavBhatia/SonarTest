const express = require("express");
const cors = require("cors");
const logger = require("./logger");

// ROUTES
const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

const app = express();

app.use(cors({
  origin: "https://sonar-test-sigma.vercel.app/"
}));
app.use(express.json());

app.get("/", (req, res) => {
  logger.info("Home route accessed");
  res.send("Backend is running correctly!");
});

// ROUTES
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

// START SERVER
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Backend running on port ${PORT}`);
  console.log(`Backend running on port ${PORT}`);
});
