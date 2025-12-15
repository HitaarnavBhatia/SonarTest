CREATE INDEX idx_students_active ON students(is_active);
CREATE INDEX idx_courses_active ON courses(is_active);
CREATE INDEX idx_student_courses_student ON student_courses(student_id);
CREATE INDEX idx_student_courses_course ON student_courses(course_id);
