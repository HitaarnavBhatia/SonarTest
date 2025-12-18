import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { FaUserGraduate } from "react-icons/fa";

import StudentsPage from "./StudentPage";
import CoursesPage from "./CoursePage";
import HomePage from "./HomePage";

function App() {
  return (
    <BrowserRouter>
      {/* NAVBAR */}
      <nav className="
        sticky top-0 z-50
        px-8 py-4
        bg-gray-100/60 backdrop-blur-md
        shadow-md border-b border-gray-300
      ">
        <div className="flex items-center justify-between max-w-7xl mx-auto">

          {/* LEFT  */}
          <div className="text-xl font-bold text-blue-600">
            StudentManager
          </div>

          {/* CENTER  */}
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

          {/* RIGHT */}
          <div className="cursor-pointer">
            <div className="
              w-10 h-10
              flex items-center justify-center
              rounded-full
              bg-blue-600 text-white
              hover:bg-blue-700 transition
            ">
              <FaUserGraduate size={18} />
            </div>
          </div>

        </div>
      </nav>

     <div className="min-h-screen bg-gray-100 pt-8">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* CARD */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/student" element={<StudentsPage />} />
              <Route path="/course" element={<CoursesPage />} />
            </Routes>
          </div>

        </div>
      </div>
    </BrowserRouter>
  );
}


export default App;
