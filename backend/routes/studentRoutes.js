const express = require("express");
const router = express.Router();

const StudentController = require("../controllers/studentControllers");

router.get("/", StudentController.getStudents);
router.post("/", StudentController.addStudent);
router.put("/:id", StudentController.updateStudent);
router.delete("/:id", StudentController.deleteStudent);


module.exports = router;
