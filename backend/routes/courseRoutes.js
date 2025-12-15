const express = require("express");
const router = express.Router();

const CourseController = require("../controllers/courseControllers");

router.get("/", CourseController.getCourses);
router.post("/", CourseController.addCourse);
router.delete("/:id", CourseController.deleteCourse);

module.exports = router;
