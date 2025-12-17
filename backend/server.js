const express = require("express");
const cors = require("cors");
const app = express();

const studentRoutes = require("./routes/studentRoutes");
const courseRoutes = require("./routes/courseRoutes");

app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running correctly!");
});

app.use("/students", studentRoutes);
app.use("/courses", courseRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
