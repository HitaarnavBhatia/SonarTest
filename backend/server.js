const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("OK");
});

// test API route (important)
app.get("/students", (req, res) => {
  res.json([]);
});

// Railway requires process.env.PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("OK server listening on", PORT);
});
