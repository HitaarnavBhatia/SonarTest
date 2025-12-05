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
  const [courseIds, setCourseIds] = useState([]);

  const [isStudentEditing, setIsStudentEditing] = useState(false);
  const [studentIndex, setStudentIndex] = useState(-1);

  const [showForm, setShowForm] = useState(false);

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
      updatedStudents[studentIndex].courseIds = courseIds;
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
        courseIds,
      };

      setStudents([...students, newStudent]);
      toast.success("Student added!");
    }

    // Reset form
    setName("");
    setRoll("");
    setCourseIds([]);
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
    setCourseIds(s.courseIds || []);

    setIsStudentEditing(true);
    setStudentIndex(index);

    setShowForm(true);
  }

  return (
    <div className="p-8">
      <ToastContainer />

      <h1 className="text-4xl font-bold mb-6 text-center">Student Table</h1>

      <button
        onClick={() => {
          setIsStudentEditing(false); 
          setName("");
          setRoll("");
          setCourseIds([]);
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
        addStudent={(e) => {
          addStudent(e);
          setShowForm(false);
        }}
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
              <th className="border px-4 py-2">Course</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s, index) => {
              const courseTitle =
                courses.find((c) => c.id === s.courseIds)?.title || "N/A";

              return (
                <tr key={s.id}>
                  <td className="border px-4 py-2">{s.id}</td>
                  <td className="border px-4 py-2">{s.name}</td>
                  <td className="border px-4 py-2">{s.roll}</td>
                  <td className="border px-4 py-2">
                    {s.courseIds
                      ?.map((id) => {
                        for (let i = 0; i < courses.length; i++) {
                          if (courses[i].id === id) {
                            return courses[i].title;
                          }
                        }
                        return "";
                      })
                      .join(", ")}
                  </td>

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
