const db = require("../db");
const logger = require("../logger");

const getStudents = async () => {
  logger.info("Service: Fetching students from DB");

  const result = await db.query(`
    SELECT 
      s.id,
      s.name,
      s.roll,
      ARRAY_AGG(c.title) AS courses
    FROM students s
    LEFT JOIN student_courses sc ON sc.student_id = s.id
    LEFT JOIN courses c ON c.id = sc.course_id
    WHERE s.is_active = TRUE
    GROUP BY s.id
    ORDER BY s.id;
  `);

  return result.rows;
};

const addStudent = async ({ name, roll, courseIds = [] }) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const studentRes = await client.query(
      `INSERT INTO students(name, roll, is_active)
       VALUES ($1, $2, TRUE)
       RETURNING id`,
      [name, roll]
    );

    const studentId = studentRes.rows[0].id;

    for (const cid of courseIds) {
      await client.query(
        `INSERT INTO student_courses(student_id, course_id)
         VALUES ($1, $2)`,
        [studentId, cid]
      );
    }

    await client.query("COMMIT");
    return { id: studentId };

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const updateStudent = async (id, { name, roll, courseIds = [] }) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `UPDATE students
       SET name = $1, roll = $2, updated_at = NOW()
       WHERE id = $3`,
      [name, roll, id]
    );

    await client.query(
      `DELETE FROM student_courses WHERE student_id = $1`,
      [id]
    );

    for (const cid of courseIds) {
      await client.query(
        `INSERT INTO student_courses(student_id, course_id)
         VALUES ($1, $2)`,
        [id, cid]
      );
    }

    await client.query("COMMIT");
    return { success: true };

  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const deleteStudent = async (id) => {
  await db.query(
    `UPDATE students
     SET is_active = FALSE, updated_at = NOW()
     WHERE id = $1`,
    [id]
  );

  return { success: true };
};

module.exports = {
  getStudents,
  addStudent,
  updateStudent,   
  deleteStudent
};
