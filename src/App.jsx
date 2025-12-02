import React from "react";
import "./index.css";
import "./App.css";

function App() {
    const students = [
        { id: "S001", name: "Alice", roll: "101", course: "Bachelors of engineerign" },
        { id: "S002", name: "Bob", roll: "102", course: "Bachelors of Management" },
        { id: "S003", name: "Charlie", roll: "103", course: "Bachelors of business administration" },
        { id: "S004", name: "David", roll: "104", course: "Masters in data science" },
    ];

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
                    {students.map((student) => (
                        <tr key={student.id} className="even:bg-gray-50">
                            <td className="border-2 border-gray-400 px-4 py-2">{student.id}</td>
                            <td className="border-2 border-gray-400 px-4 py-2">{student.name}</td>
                            <td className="border-2 border-gray-400 px-4 py-2">{student.roll}</td>
                            <td className="border-2 border-gray-400 px-4 py-2">{student.course}</td>
                            <td className="border-2 border-gray-400 px-4 py-2 space-x-2">
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
                                    Edit
                                </button>
                                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
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