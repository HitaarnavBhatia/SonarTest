import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import StudentsPage from "./StudentPage";
import CoursesPage from "./CoursePage";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="p-4 bg-gray-100/60 backdrop-blur-md shadow-md border-b border-gray-300 flex justify-center">
        <div className="flex gap-8 text-lg font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/student"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Students
          </NavLink>

          <NavLink
            to="/course"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            Courses
          </NavLink>
        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/student" element={<StudentsPage />} />
        <Route path="/course" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
