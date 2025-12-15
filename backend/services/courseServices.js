const db = require("../db");

exports.getCourses = () => {
  return db.query(`
    SELECT id, title, duration, description 
    FROM courses 
    WHERE is_active = TRUE
    ORDER BY id;
  `);
};

exports.addCourse = ({ title, duration, description }) => {
  return db.query(
    `INSERT INTO courses(title, duration, description)
     VALUES ($1, $2, $3)`,
    [title, duration, description]
  );
};

exports.deleteCourse = (id) => {
  return db.query(
    `UPDATE courses SET is_active = FALSE, updated_at = NOW() WHERE id = $1`,
    [id]
  );
};
