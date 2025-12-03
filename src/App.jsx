import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import studentsData from "./students.json";
import StudentForm from "./studentForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  
  //initialized local storage, i.e it loads data from localStorage if available otherwise uses json
  let initialStudents;
  const storedStudents = localStorage.getItem("students");

  if (storedStudents) {
    //if stored array exists or is not null
    initialStudents = JSON.parse(storedStudents); //convert strign to java object using JSON.parse [bcs localStorage saves everything as strings]
  } else {
    // if null, then use studentsData which is imported from students.json file
    initialStudents = studentsData;
  }
  const [students, setStudents] = useState(initialStudents);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [course, setCourse] = useState("");






  //saves students data to locaStorage whenevr its updated
  useEffect(
    () => localStorage.setItem("students", JSON.stringify(students)),
    [students]
  );

  function addStudent(e) {
    e.preventDefault();

    let rollExists = false;

    for (let i = 0; i < students.length; i++) {
      if (students[i].roll === roll) {
        rollExists = true;
        break;
      }
    }

    if (rollExists) {
      toast.error("Roll number already exists!");
      return;
    }

    const newStudent = {
      id: `S00${students.length + 1}`,
      name,
      roll,
      course,
    };

    setStudents([...students, newStudent]);

    setName("");
    setRoll("");
    setCourse("");

    toast.success("Student added successfully!");
  }

  //------DELETE Student---------
  function deleteStudent(index) {
    const newStudents = students.slice();
    newStudents.splice(index, 1);
    setStudents(newStudents);

    setMessage("Student deleted!");
    setTimeout(() => setMessage(""), 2000);
  }

  return (
    <div className="p-8">
      <ToastContainer />

      <h1 className="text-4xl font-bold mb-6 text-center">Student Table</h1>

      <StudentForm
        name={name}
        roll={roll}
        course={course}
        setName={setName}
        setRoll={setRoll}
        setCourse={setCourse}
        addStudent={addStudent}
      />

      <table className="border border-gray-400 w-full shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-2 px-4 py-2">ID</th>
            <th className="border-2 px-4 py-2">Name</th>
            <th className="border-2 px-4 py-2">Roll Number</th>
            <th className="border-2 px-4 py-2">Course Name</th>
            <th className="border-2 px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.id}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.roll}</td>
              <td className="border px-4 py-2">{student.course}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => editStudent(index)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteStudent(index)}
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
  );
}

export default App;
