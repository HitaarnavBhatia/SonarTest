import React, { useState, useEffect } from "react";
import CourseForm from "./courseForm";
import api from "./api/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CoursesPage() {
  const [courses, setCourses] = useState([]);

  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch {
      toast.error("Failed to load courses");
    }
  }

  // ADD course
  async function addCourse(e) {
    e.preventDefault();

    try {
      if (isEditingCourse) {
        toast.info("Update API not implemented yet");
      } else {
        await api.post("/courses", {
          title,
          duration,
          description,
        });
        toast.success("Course added");
      }

      fetchCourses();
      resetForm();
    } catch (err) {
      toast.error("Error saving course");
    }
  }

  //DELETE course
  async function deleteCourse(id) {
    try {
      await api.delete(`/courses/${id}`);
      toast.success("Course deleted");
      fetchCourses();
    } catch {
      toast.error("Error deleting course");
    }
  }

  function editCourse(course) {
    setTitle(course.title);
    setDuration(course.duration);
    setDescription(course.description);
    setEditingCourseId(course.id);
    setIsEditingCourse(true);
    setShowForm(true);
  }

  function resetForm() {
    setTitle("");
    setDuration("");
    setDescription("");
    setIsEditingCourse(false);
    setEditingCourseId(null);
    setShowForm(false);
  }

  return (
    <div className="p-8">
      <ToastContainer />

      <h1 className="text-4xl font-bold mb-6 text-center">Courses</h1>

      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6"
      >
        Add Course
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-xl w-[500px] relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-red-600 text-xl"
            >
              x
            </button>

            <CourseForm
              title={title}
              duration={duration}
              description={description}
              setTitle={setTitle}
              setDuration={setDuration}
              setDescription={setDescription}
              addCourse={addCourse}
              isEditing={isEditingCourse}
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Course Title</th>
              <th className="border px-4 py-2">Duration</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="border px-4 py-2">{course.id}</td>
                <td className="border px-4 py-2">{course.title}</td>
                <td className="border px-4 py-2">{course.duration}</td>
                <td className="border px-4 py-2">{course.description}</td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() => editCourse(course)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
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
