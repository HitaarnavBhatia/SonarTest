import React from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import StudentsPage from "./StudentPage";
import CoursesPage from "./CoursePage";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 bg-gray-100/60 backdrop-blur-md shadow-md border-b border-gray-300 flex justify-center rounded-4xl">
        <div className="flex gap-8 text-lg font-medium">
          <NavLink to="/student"
            className={({ isActive }) => `px-4 py-2 rounded-lg transition ${isActive
              ? "bg-blue-600 text-white shadow"
              : "text-gray-700 hover:bg-gray-200"}`
            }
          >
            Students
          </NavLink>
          <NavLink to="/course"
            className={({ isActive }) => `px-4 py-2 rounded-lg transition ${isActive
              ? "bg-blue-600 text-white shadow"
              : "text-gray-700 hover:bg-gray-200"}`
            }
          >
            Courses
          </NavLink>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Navigate to="/student" />} />
        <Route path="/student" element={<StudentsPage />} />
        <Route path="/course" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
