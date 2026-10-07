import API from "./api";

/*
==============================
LOGIN
==============================
*/
export const login = async (credentials) => {
  const { data } = await API.post("/auth/login", credentials);

  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("school", JSON.stringify(data.school));
  }

  return data;
};

/*
==============================
LOGOUT
==============================
*/
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("school");
};

/*
==============================
PROFILE
==============================
*/
export const getProfile = async () => {
  const { data } = await API.get("/auth/profile");
  return data;
};

/*
==============================
CURRENT USER
==============================
*/
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

/*
==============================
CURRENT SCHOOL
==============================
*/
export const getCurrentSchool = () => {
  const school = localStorage.getItem("school");
  return school ? JSON.parse(school) : null;
};

/*
==============================
TOKEN
==============================
*/
export const getToken = () => {
  return localStorage.getItem("token");
};

/*
==============================
IS AUTHENTICATED
==============================
*/
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

/*
==============================
ROLE HELPERS
==============================
*/
export const isAdmin = () =>
  getCurrentUser()?.role === "admin";

export const isTeacher = () =>
  getCurrentUser()?.role === "teacher";

export const isParent = () =>
  getCurrentUser()?.role === "parent";