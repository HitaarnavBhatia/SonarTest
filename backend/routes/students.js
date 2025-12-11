const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all active students
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        s.id,
        s.name,
        s.roll,
        s.is_active,
        ARRAY_REMOVE(ARRAY_AGG(sc.course_id), NULL) AS course_ids,
        STRING_AGG(c.title, ', ') AS courses
      FROM students s
      LEFT JOIN student_courses sc ON s.id = sc.student_id
      LEFT JOIN courses c ON sc.course_id = c.id
      WHERE s.is_active = TRUE
      GROUP BY s.id
      ORDER BY s.id;
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching students");
  }
});

// ADD student
router.post("/", async (req, res) => {
  const { name, roll, courseIds } = req.body;

  try {
    const studentRes = await db.query(
      `INSERT INTO students(name, roll)
       VALUES($1, $2)
       RETURNING id`,
      [name, roll]
    );

    const studentId = studentRes.rows[0].id;

    for (let cid of courseIds) {
      await db.query(
        `INSERT INTO student_courses(student_id, course_id) VALUES ($1, $2)`,
        [studentId, cid]
      );
    }

    res.send("Student added");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding student");
  }
});

// UPDATE student
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, roll, courseIds } = req.body;

  try {
    await db.query(
      `UPDATE students 
       SET name = $1, roll = $2, updated_at = NOW() 
       WHERE id = $3`,
      [name, roll, id]
    );

    // Remove previous courses
    await db.query(`DELETE FROM student_courses WHERE student_id = $1`, [id]);

    // Add new ones
    for (let cid of courseIds) {
      await db.query(
        `INSERT INTO student_courses(student_id, course_id) VALUES ($1, $2)`,
        [id, cid]
      );
    }

    res.send("Student updated");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating student");
  }
});

// SOFT DELETE student
router.delete("/:id", async (req, res) => {
  try {
    await db.query(
      `UPDATE students SET is_active = FALSE, updated_at = NOW() WHERE id = $1`,
      [req.params.id]
    );
    res.send("Student deactivated");
  } catch (err) {
    res.status(500).send("Error deleting student");
  }
});

module.exports = router;
