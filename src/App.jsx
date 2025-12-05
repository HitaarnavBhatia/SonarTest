import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import StudentsPage from "./StudentPage";
import CoursesPage from "./CoursePage";

function App() {
  return (
    <BrowserRouter>
      <nav className="p-4 flex flex-col md:flex-row gap-4 md:gap-6 bg-gray-200">
        <Link to="/student">Students</Link>
        <Link to="/course">Courses</Link>
      </nav>

      <Routes>
        <Route path="/student" element={<StudentsPage />} />
        <Route path="/course" element={<CoursesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
