import React from "react";

function CourseForm({
  title,
  duration,
  description,
  setTitle,
  setDuration,
  setDescription,
  addCourse,
  isEditing
}) {
  
    let buttonText = "Add Course";
    if (isEditing === true) {
      buttonText = "Update Course";
    }


  return (
    <form
      onSubmit={addCourse}
      className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {isEditing ? "Update Course" : "Add New Course"}
      </h2>

      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        />

        <input
          type="text"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        />

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

export default CourseForm;