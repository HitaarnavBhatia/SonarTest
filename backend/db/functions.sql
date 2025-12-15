-- Add student with courses
CREATE OR REPLACE FUNCTION add_student_with_courses(
  studentName VARCHAR,
  studentRoll INTEGER,
  courseList INTEGER[]
)
RETURNS VOID AS $$
DECLARE newId INTEGER;
BEGIN
  INSERT INTO students(name, roll)
  VALUES (studentName, studentRoll)
  RETURNING id INTO newId;

  INSERT INTO student_courses(student_id, course_id)
  SELECT newId, UNNEST(courseList);
END;
$$ LANGUAGE plpgsql;

-- Update student
CREATE OR REPLACE FUNCTION update_student(
  sId INTEGER,
  studentName VARCHAR,
  studentRoll INTEGER,
  courseList INTEGER[]
)
RETURNS VOID AS $$
BEGIN
  UPDATE students
  SET name = studentName,
      roll = studentRoll,
      updated_at = NOW()
  WHERE id = sId;

  DELETE FROM student_courses WHERE student_id = sId;

  INSERT INTO student_courses(student_id, course_id)
  SELECT sId, UNNEST(courseList);
END;
$$ LANGUAGE plpgsql;

--delete student
CREATE OR REPLACE FUNCTION delete_student(sId INT)
RETURNS VOID AS $$
BEGIN
  UPDATE students SET is_active = FALSE WHERE id = sId;
END;
$$ LANGUAGE plpgsql;

-- delete course
CREATE OR REPLACE FUNCTION delete_course(cId INT)
RETURNS VOID AS $$
BEGIN
  UPDATE courses SET is_active = FALSE WHERE id = cId;
END;
$$ LANGUAGE plpgsql;
