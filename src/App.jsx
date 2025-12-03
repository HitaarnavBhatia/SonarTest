import React, { useState } from "react";
import "./index.css";
import "./App.css";
import studentsData from "./students.json"

function App() {
    const [students, setStudents] = useState(studentsData);

    function addStudent() {
        const newStudent = {
            id: `S00${students.length + 1}`,
            name: "New Student",
            roll: `${100 + students.length + 1}`,
            course: "Course Name",
        };
        setStudents([...students, newStudent]);
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
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
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
            
            <button
                onClick={addStudent}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
                Create/Add Student
            </button>
        </div>
    );
}

export default App;
