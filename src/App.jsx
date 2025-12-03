import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import studentsData from "./students.json"

function App() {

    //initialized local storage, i.e it loads data from localStorage if available otherwise uses json
    let initialStudents;
    const storedStudents = localStorage.getItem("students");

    if(storedStudents) {                                //if stored array exists or is not null
        initialStudents = JSON.parse(storedStudents);    //convert strign to java object using JSON.parse [bcs localStorage saves everything as strings]
    } else {                                            // if null, then use studentsData which is imported from students.json file
        initialStudents = studentsData;
    }

    const [students, setStudents] = useState(initialStudents);

    const [name, setName] = useState("");
    const [roll, setRoll] = useState("");
    const [course, setCourse] = useState("");

    //saves students data to locaStorage whenevr its updated
    useEffect(() => (
        localStorage.setItem("students", JSON.stringify(students))
      ), [students]);

      function addStudent(e) {
        e.preventDefault();
      
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
      }
  
    function deleteStudent(index) {
      const newStudents = students.slice();  
      newStudents.splice(index, 1);          
      setStudents(newStudents);              
  }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">
                Student Table
            </h1>

        <form onSubmit= {addStudent} className="mb-6 p-4 border border-grey-300 rounded-lg bg-grey-50">
            
            <h2 className="text-2xl font-semibold mb-4">Add new students</h2>

        <div className="flex gap-4">
          <input  onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter Name"
            value={name}
            className="border px-3 py-2 rounded w-1/4"
          />

          <input className="border px-3 py-2 rounded w-1/4" type="number" placeholder="Enter Roll No"
            value={roll}
            onChange={(e) => setRoll(e.target.value)}
          />

          <input className="border px-3 py-2 rounded w-1/4" type="text" placeholder="Enter Course" 
            value={course}
            onChange={(e) => setCourse(e.target.value)}
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Student
          </button>
        </div>           
        </form>
            <table className="border border-gray-400 w-full shadow-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border-2 border-gray-400 px-4 py-2">ID</th>
                        <th className="border-2 border-gray-400 px-4 py-2">Name</th>
                        <th className="border-2 border-gray-400 px-4 py-2">Roll Number</th>
                        <th className="border-2 border-gray-400 px-4 py-2">Course Name</th>
                        <th className="border-2 border-gray-400 px-4 py-2">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {students.map((student, index) => (
                        <tr key={student.id} className="bg-gray">
                            <td className="border-2 border-gray-400 px-4 py-2">{student.id}</td>
                            <td className="border-2 border-gray-400 px-4 py-2">{student.name}</td>
                            <td className="border-2 border-gray-400 px-4 py-2">{student.roll}</td>
                            <td className="border-2 border-gray-400 px-4 py-2">{student.course}</td>
                            <td className="border-2 border-gray-400 px-4 py-2 space-x-2">
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
