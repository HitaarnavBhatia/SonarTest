import React from "react";

function StudentForm({
  name,
  roll,
  courseId,
  setName,
  setRoll,
  setCourseId,
  addStudent,
  isEditing,
  courses
}) {

  let buttonText = "Add Student";
  if (isEditing === true) {
    buttonText = "Update Student";
  }

  return (
    <form onSubmit={addStudent} className="mb-6 p-4 border bg-gray-50 rounded-lg">
      <h2 className="text-2xl mb-4">{buttonText}</h2>

      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
        />

        <input
          type="number"
          placeholder="Enter Roll No"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
        />

        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="border px-3 py-2 rounded w-1/4"
        >
          <option value="">Select Course</option>

          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}

export default StudentForm;
