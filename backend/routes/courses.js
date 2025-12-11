const express = require("express");
const router = express.Router();
const db = require("../db");

// GET active courses
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, title, duration, description 
      FROM courses 
      WHERE is_active = TRUE
      ORDER BY id;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error fetching courses");
  }
});

// ADD course
router.post("/", async (req, res) => {
  const { title, duration, description } = req.body;

  try {
    await db.query(
      `INSERT INTO courses(title, duration, description)
       VALUES ($1, $2, $3)`,
      [title, duration, description]
    );

    res.send("Course added");
  } catch (err) {
    res.status(500).send("Error adding course");
  }
});

// DEACTIVATE course
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query(
      `UPDATE courses SET is_active = FALSE, updated_at = NOW() WHERE id = $1`,
      [id]
    );
    res.send("Course deactivated");
  } catch (err) {
    res.status(500).send("Error deleting course");
  }
});

module.exports = router;
