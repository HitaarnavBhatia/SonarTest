import api from "./api/api";
import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import StudentForm from "./studentForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [courseIds, setCourseIds] = useState([]);

  const [isStudentEditing, setIsStudentEditing] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [showForm, setShowForm] = useState(false);

  // Load from backend
  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  async function fetchStudents() {
    try {
      const res = await api.get("/students");
      setStudents(res.data);
    } catch (err) {
      toast.error("Failed to load students");
    }
  }

  async function fetchCourses() {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      toast.error("Failed to load courses");
    }
  }

  // Add or update student
  async function addStudent(e) {
    e.preventDefault();

    try {
      if (isStudentEditing) {
        // UPDATE
        await api.put(`/students/${editingStudentId}`, {
          name,
          roll,
          courseIds,
        });
        toast.success("Student updated!");
      } else {
        // ADD
        await api.post("/students", {
          name,
          roll,
          courseIds,
        });
        toast.success("Student added!");
      }

      fetchStudents(); // refresh
      resetForm();
    } catch (err) {
      toast.error("Error saving student");
    }
  }

  async function deleteStudent(id) {
    try {
      await api.delete(`/students/${id}`);
      toast.success("Student deleted!");
      fetchStudents();
    } catch (err) {
      toast.error("Error deleting student");
    }
  }

  function editStudent(index) {
    const s = students[index];

    setName(s.name);
    setRoll(s.roll);

    // backend returns course_ids as array of numbers
    setCourseIds(s.course_ids || []);

    setIsStudentEditing(true);
    setEditingStudentId(s.id);
    setShowForm(true);
  }

  function resetForm() {
    setName("");
    setRoll("");
    setCourseIds([]);
    setIsStudentEditing(false);
    setEditingStudentId(null);
    setShowForm(false);
  }

  return (
    <div className="p-8">
      <ToastContainer />

      <h1 className="text-4xl font-bold mb-6 text-center">Student Table</h1>

      <button
        onClick={() => {
          resetForm();
          setShowForm(true);
        }}
        className="bg-green-600 text-white px-4 py-2 rounded mb-6"
      >
        Add Student
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-2xl w-[450px] relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3 text-red-600 text-xl"
            >
              x
            </button>

            <StudentForm
              name={name}
              roll={roll}
              courseIds={courseIds}
              setName={setName}
              setRoll={setRoll}
              setCourseIds={setCourseIds}
              addStudent={addStudent}
              isEditing={isStudentEditing}
              courses={courses}
              isModal={true}
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-400 shadow-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Roll No</th>
              <th className="border px-4 py-2">Courses</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => (
              <tr key={s.id}>
                <td className="border px-4 py-2">{s.id}</td>
                <td className="border px-4 py-2">{s.name}</td>
                <td className="border px-4 py-2">{s.roll}</td>
                <td className="border px-4 py-2">
                  {s.courses || "No courses"}
                </td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() => editStudent(index)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(s.id)}
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

export default StudentsPage;
