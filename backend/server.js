const express = require("express");
const cors = require("cors");

const studentRoutes = require("./routes/students");
const courseRoutes = require("./routes/courses");

const app = express();
app.use(cors());
app.use(express.json());

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running correctly!");
});

// TEST ROUTE
app.get("/test-students", (req, res) => {
  res.send("test-students from server.js");
});

// USE ROUTES
app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

app.listen(4000, () => console.log("Backend running on port 4000"));
