const courseServices = require("../services/courseServices");
const logger = require("../logger");

exports.getCourses = async (req, res) => {
  logger.info("GET /courses called");

  try {
    const result = await courseServices.getCourses();
    logger.info("Courses fetched");
    res.json(result.rows);
  } catch (err) {
    logger.error("Error fetching courses FULL:", err);
    res.status(500).json({ error: "Error fetching courses" });
  }
};

exports.addCourse = async (req, res) => {
  logger.info("POST /courses — adding course");

  try {
    await courseServices.addCourse(req.body);
    logger.info("Course added");
    res.json({ message: "Course added" });
  } catch (err) {
    logger.error("Error adding course FULL:", err);
    res.status(500).json({ error: "Error adding course" });
  }
};

exports.deleteCourse = async (req, res) => {
  logger.info(`DELETE /courses/${req.params.id}`);

  try {
    await courseServices.deleteCourse(req.params.id);
    logger.info("Course deleted");
    res.json({ message: "Course deleted" });
  } catch (err) {
    logger.error("Error deleting course FULL:", err);
    res.status(500).json({ error: "Error deleting course" });
  }
};
