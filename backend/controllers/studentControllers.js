const studentServices = require("../services/studentServices");
const logger = require("../logger");

exports.getStudents = async (req, res) => {
  logger.info("GET /students called");

  try {
    const students = await studentServices.getStudents();
    logger.info("Fetched students successfully");
    res.json(students);
  } catch (err) {
    logger.error("Error fetching students FULL:", err);
    res.status(500).send("Error fetching students");
  }
};

exports.addStudent = async (req, res) => {
  logger.info("POST /students — adding student");

  try {
    await studentServices.addStudent(req.body);
    logger.info("Student added");
    res.json({ message: "Student added" });
  } catch (err) {
    logger.error("Error adding student FULL:", err);
    res.status(500).send("Error adding student");
  }
};

exports.updateStudent = async (req, res) => {
  logger.info(`PUT /students/${req.params.id} — updating student`);

  try {
    await studentServices.updateStudent(req.params.id, req.body);
    logger.info("Student updated");
    res.json({ message: "Student updated" });
  } catch (err) {
    logger.error("Error updating student FULL:", err);
    res.status(500).send("Error updating student");
  }
};

exports.deleteStudent = async (req, res) => {
  logger.info(`DELETE /students/${req.params.id}`);

  try {
    await studentServices.deleteStudent(req.params.id);
    logger.info("Student deleted");
    res.json({ message: "Student deleted" });
  } catch (err) {
    logger.error("Error deleting student FULL:", err);
    res.status(500).json({ error: "Error deleting student" });
  }
};
