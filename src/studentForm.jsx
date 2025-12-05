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
  let buttonText = "Add Student";
  if (isEditing === true) {
    buttonText = "Update Student";
  }

  return (
    <form
      onSubmit={addStudent}
      className="mb-6 p-4 border bg-gray-50 rounded-lg"
    >
      <h2 className="text-2xl mb-4">{buttonText}</h2>

      <div className={`flex flex-col gap-4 ${isModal ? "" : "md:flex-row"}`}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`border px-3 py-2 rounded ${isModal ? "w-full" : "w-full md:w-1/4"}`}
        />

        <input
          type="number"
          placeholder="Enter Roll No"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          className={`border px-3 py-2 rounded ${isModal ? "w-full" : "w-full md:w-1/4"}`}
        />

        <select
          multiple
          size={4}
          className={`border px-3 py-2 rounded ${isModal ? "w-full" : "w-full md:w-1/4"}`}
          value={courseIds}
          onChange={(e) => {
            const selected = [];
            for (let i = 0; i < e.target.options.length; i++) {
              if (e.target.options[i].selected)
                selected.push(e.target.options[i].value);
            }
            setCourseIds(selected);
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
