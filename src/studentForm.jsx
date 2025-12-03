import React from "react";

function StudentForm({ name, roll, course, setName, setRoll, setCourse, addStudent }) {
  return (
    <form onSubmit={addStudent} className="mb-6 p-4 border border-grey-300 rounded-lg bg-grey-50">
      <h2 className="text-2xl font-semibold mb-4">Add new students</h2>

      <div className="flex gap-4">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Name"
          value={name}
          className="border px-3 py-2 rounded w-1/4"
        />

        <input
          className="border px-3 py-2 rounded w-1/4"
          type="number"
          placeholder="Enter Roll No"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />

        <input
          className="border px-3 py-2 rounded w-1/4"
          type="text"
          placeholder="Enter Course"
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
  );
}

export default StudentForm;
