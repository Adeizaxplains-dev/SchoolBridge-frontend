import API from "./api";

/*
=====================================
GET ALL STUDENTS
=====================================
*/
export const getStudents = async (params = {}) => {
  const response = await API.get("/students", {
    params,
  });

  return response.data;
};

/*
=====================================
GET RECENT STUDENTS
=====================================
*/
export const getRecentStudents = async (limit = 8) => {
  const response = await API.get("/students/recent", {
    params: {
      limit,
    },
  });

  return response.data;
};

/*
=====================================
GET SINGLE STUDENT
=====================================
*/
export const getStudent = async (id) => {
  const response = await API.get(`/students/${id}`);

  return response.data;
};

/*
=====================================
CREATE STUDENT
=====================================
*/
export const createStudent = async (data) => {
  const response = await API.post(
    "/students",
    data
  );

  return response.data;
};

/*
=====================================
UPDATE STUDENT
=====================================
*/
export const updateStudent = async (
  id,
  data
) => {
  const response = await API.put(
    `/students/${id}`,
    data
  );

  return response.data;
};

/*
=====================================
DELETE STUDENT
=====================================
*/
export const deleteStudent = async (id) => {
  const response = await API.delete(
    `/students/${id}`
  );

  return response.data;
};

/*
=====================================
STUDENT STATISTICS
=====================================
*/
export const getStudentStats = async () => {
  const response = await API.get(
    "/students/stats"
  );

  return response.data;
};

/*
=====================================
DEFAULT EXPORT
=====================================
*/
export default {
  getStudents,
  getRecentStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats,
};