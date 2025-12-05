import React, { useState, useEffect } from "react";
import coursesData from "./courses.json";
import CourseForm from "./courseForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CoursesPage() {
  // Load from localStorage or courses.json
  let initialCourses;
  const stored = localStorage.getItem("courses");

  if (stored) {
    initialCourses = JSON.parse(stored);
  } else {
    initialCourses = coursesData;
  }

  // State
  const [courses, setCourses] = useState(initialCourses);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [Description, setDescription] = useState("");

  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [courseIndex, setCourseIndex] = useState(-1);

  // Save whenever courses change
  useEffect(
    () => localStorage.setItem("courses", JSON.stringify(courses)),
    [courses]
  );

  // ADD or UPDATE course
  function addCourse(e) {
    e.preventDefault();

    let titleExists = false;

    for (let i = 0; i < courses.length; i++) {
      // allow same course title for the one being edited
      if (isEditingCourse && i === courseIndex) continue;

      if (courses[i].title.toLowerCase() === title.toLowerCase()) {
        titleExists = true;
        break;
      }
    }

    if (titleExists) {
      toast.error("Course title already exists!");
      return;
    }

    if (isEditingCourse) {
      // Update
      const updated = courses.slice();
      updated[courseIndex].title = title;
      updated[courseIndex].duration = duration;
      updated[courseIndex].Description = Description;

      setCourses(updated);

      toast.success("Course updated!");
      setIsEditingCourse(false);
      setCourseIndex(-1);
    } else {
      const newCourse = {
        id: `C00${courses.length + 1}`,
        title,
        duration,
        Description,
      };

      setCourses([...courses, newCourse]);
      toast.success("Course added!");
    }

    // clear form
    setTitle("");
    setDuration("");
    setDescription("");
  }

  // DELETE Course
  function deleteCourse(index) {
    const newData = courses.slice();
    newData.splice(index, 1);
    setCourses(newData);
    toast.success("Course deleted!");
  }

  // EDIT Course
  function editCourse(index) {
    const c = courses[index];
    setTitle(c.title);
    setDuration(c.duration);
    setDescription(c.Description);
    setIsEditingCourse(true);
    setCourseIndex(index);
  }

  return (
    <div className="p-8">
      <ToastContainer />

      <h1 className="text-4xl font-bold mb-6 text-center">Courses</h1>

      <CourseForm
        title={title}
        duration={duration}
        Description={Description}
        setTitle={setTitle}
        setDuration={setDuration}
        setDescription={setDescription}
        addCourse={addCourse}
        isEditing={isEditingCourse}
      />
      <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-400 shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-2 px-4 py-2">ID</th>
            <th className="border-2 px-4 py-2">Course Title</th>
            <th className="border-2 px-4 py-2">Duration</th>
            <th className="border-2 px-4 py-2">Description</th>
            <th className="border-2 px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course, index) => (
            <tr key={course.id}>
              <td className="border px-4 py-2">{course.id}</td>
              <td className="border px-4 py-2">{course.title}</td>
              <td className="border px-4 py-2">{course.duration}</td>
              <td className="border px-4 py-2">{course.Description}</td>

              <td className="border px-4 py-2">
                <button
                  onClick={() => editCourse(index)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteCourse(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default CoursesPage;
