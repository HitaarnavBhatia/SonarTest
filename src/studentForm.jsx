import React from "react";

function StudentForm({
  name,
  roll,
  courseIds,
  setName,
  setRoll,
  setCourseIds,
  addStudent,
  isEditing,
  courses,
  isModal
}) {
  const buttonText = isEditing ? "Update Student" : "Add Student";

  return (
    <form onSubmit={addStudent} className="mb-6 p-4 border bg-gray-50 rounded-lg">
      <h2 className="text-2xl mb-4">{buttonText}</h2>

      <div className={`flex flex-col gap-4 ${isModal ? "" : "md:flex-row"}`}>
        
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border px-3 py-2 rounded ${isModal ? "w-full" : "w-full md:w-1/4"}`}
          required
        />

        <input
          type="number"
          placeholder="Enter Roll No"
          value={roll}
          onChange={(e) => setRoll(Number(e.target.value))}
          className={`border px-3 py-2 rounded ${isModal ? "w-full" : "w-full md:w-1/4"}`}
          required
        />

        <select
          multiple
          size={4}
          className={`border px-3 py-2 rounded ${isModal ? "w-full" : "w-full md:w-1/4"}`}
          value={courseIds}
          onChange={(e) => {
            const selectedValues = Array.from(e.target.options)
              .filter((opt) => opt.selected)
              .map((opt) => Number(opt.value));
            setCourseIds(selectedValues);
          }}
        >
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
