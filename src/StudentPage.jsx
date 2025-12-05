import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import studentsData from "./students.json";
import coursesData from "./courses.json";
import StudentForm from "./studentForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StudentsPage() {
  // Load students
  let initialStudents;
  const storedStudents = localStorage.getItem("students");

  if (storedStudents) {
    initialStudents = JSON.parse(storedStudents);
  } else {
    initialStudents = studentsData;
  }

  const [students, setStudents] = useState(initialStudents);

  // Load courses
  let initialCourses;
  const storedCourses = localStorage.getItem("courses");

  if (storedCourses) {
    initialCourses = JSON.parse(storedCourses);
  } else {
    initialCourses = coursesData;
  }

  const [courses, setCourses] = useState(initialCourses);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [courseId, setCourseId] = useState("");

  const [isStudentEditing, setIsStudentEditing] = useState(false);
  const [studentIndex, setStudentIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // ADD Student
  function addStudent(e) {
    e.preventDefault();

    // Check if roll no is unique
    let rollExists = false;
    for (let i = 0; i < students.length; i++) {
      if (isStudentEditing && i === studentIndex) continue;
      if (students[i].roll === roll) {
        rollExists = true;
        break;
      }
    }

    if (rollExists) {
      toast.error("Roll number already exists!");
      return;
    }

    if (isStudentEditing) {
      const updatedStudents = students.slice();
      updatedStudents[studentIndex].name = name;
      updatedStudents[studentIndex].roll = roll;
      updatedStudents[studentIndex].courseId = courseId;
      setStudents(updatedStudents);

      toast.success("Student updated!");
      setIsStudentEditing(false);
      setStudentIndex(-1);
    } else {
      // ADD new student
      const newStudent = {
        id: `S00${students.length + 1}`,
        name,
        roll,
        courseId,
      };

      setStudents([...students, newStudent]);
      toast.success("Student added!");
    }

    // Reset form
    setName("");
    setRoll("");
    setCourseId("");
  }

  // DELETE student
  function deleteStudent(index) {
    const newStudents = students.slice();
    newStudents.splice(index, 1);
    setStudents(newStudents);

    toast.success("Student deleted!");
  }

  // EDIT student
  function editStudent(index) {
    const s = students[index];
    setName(s.name);
    setRoll(s.roll);
    setCourseId(s.courseId);

    setIsStudentEditing(true);
    setStudentIndex(index);
  }

  return (
    <div className="p-8">
      <ToastContainer />

      <h1 className="text-4xl font-bold mb-6 text-center">Student Table</h1>

      <StudentForm
        name={name}
        roll={roll}
        courseId={courseId}
        setName={setName}
        setRoll={setRoll}
        setCourseId={setCourseId}
        addStudent={addStudent}
        isEditing={isStudentEditing}
        courses={courses}
      />
      <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-400 shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Roll No</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => {
            const courseTitle =
              courses.find((c) => c.id === s.courseId)?.title || "N/A";

            return (
              <tr key={s.id}>
                <td className="border px-4 py-2">{s.id}</td>
                <td className="border px-4 py-2">{s.name}</td>
                <td className="border px-4 py-2">{s.roll}</td>
                <td className="border px-4 py-2">{courseTitle}</td>

                <td className="border px-4 py-2">
                  <button
                    onClick={() => editStudent(index)}
                    className="bg-blue-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(index)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default StudentsPage;
