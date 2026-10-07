// ============================================================
// frontend/src/services/schoolSetupService.js
// School setup API layer (sessions, terms, classes, arms,
// subjects, departments, houses, school profile, overview).
//
// Every LIST function resolves to an object keyed by the plural
// name the pages read, e.g. getClasses() -> { classes: [...] }.
// Single-item / create / update functions resolve to
//   { success, message, data, <singular>: item }.
// ============================================================

import API from "./api";

const asArray = (payload, key) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.[key])) return payload[key];
  if (Array.isArray(payload?.data?.[key])) return payload.data[key];
  return [];
};

const asItem = (payload, key) =>
  payload?.[key] ?? payload?.data?.[key] ?? payload?.data ?? payload ?? null;

const entity = (basePath, plural, singular) => ({
  list: async (params = {}) => {
    const { data } = await API.get(basePath, { params });
    const items = asArray(data, plural);
    return { ...data, [plural]: items, count: items.length };
  },
  get: async (id) => {
    const { data } = await API.get(`${basePath}/${id}`);
    const item = asItem(data, singular);
    return { ...data, data: item, [singular]: item };
  },
  create: async (payload) => {
    const { data } = await API.post(basePath, payload);
    const item = asItem(data, singular);
    return { ...data, data: item, [singular]: item };
  },
  update: async (id, payload) => {
    const { data } = await API.put(`${basePath}/${id}`, payload);
    const item = asItem(data, singular);
    return { ...data, data: item, [singular]: item };
  },
  remove: async (id) => {
    const { data } = await API.delete(`${basePath}/${id}`);
    return data;
  },
});

const sessions = entity("/school-setup/academic-sessions", "academicSessions", "academicSession");
const terms = entity("/school-setup/terms", "terms", "term");
const classes = entity("/school-setup/classes", "classes", "class");
const arms = entity("/school-setup/arms", "arms", "arm");
const subjects = entity("/school-setup/subjects", "subjects", "subject");
const departments = entity("/school-setup/departments", "departments", "department");
const houses = entity("/school-setup/houses", "houses", "house");

// ---------------- academic sessions ----------------
export const getAcademicSessions = sessions.list;
export const getAcademicSession = sessions.get;
export const createAcademicSession = sessions.create;
export const updateAcademicSession = sessions.update;
export const deleteAcademicSession = sessions.remove;
export const getCurrentAcademicSession = async () => {
  const { data } = await API.get("/school-setup/academic-sessions/current");
  return data;
};

// ---------------- terms ----------------
export const getTerms = terms.list;
export const getTerm = terms.get;
export const createTerm = terms.create;
export const updateTerm = terms.update;
export const deleteTerm = terms.remove;
export const setCurrentTerm = async (id) => {
  const { data } = await API.post(`/school-setup/terms/${id}/current`);
  return data;
};
export const setupTerms = async (payload) => {
  const { data } = await API.post("/school-setup/terms/setup", payload);
  return data;
};

// ---------------- classes / arms / subjects / departments / houses ----------------
export const getClasses = classes.list;
export const getClass = classes.get;
export const createClass = classes.create;
export const updateClass = classes.update;
export const deleteClass = classes.remove;

export const getArms = arms.list;
export const getArm = arms.get;
export const createArm = arms.create;
export const updateArm = arms.update;
export const deleteArm = arms.remove;

export const getSubjects = subjects.list;
export const getSubject = subjects.get;
export const createSubject = subjects.create;
export const updateSubject = subjects.update;
export const deleteSubject = subjects.remove;

export const getDepartments = departments.list;
export const getDepartment = departments.get;
export const createDepartment = departments.create;
export const updateDepartment = departments.update;
export const deleteDepartment = departments.remove;

export const getHouses = houses.list;
export const getHouse = houses.get;
export const createHouse = houses.create;
export const updateHouse = houses.update;
export const deleteHouse = houses.remove;

// ---------------- school profile ----------------
export const getSchoolProfile = async () => {
  const { data } = await API.get("/schools");
  const school = data?.school ?? data?.data ?? data;
  return { ...data, school };
};

export const updateSchoolProfile = async (payload) => {
  const { data } = await API.post("/onboarding/school-profile", payload);
  return data; // { success, school, onboarding }
};

// ---------------- overview (setup progress screen) ----------------
export const getSchoolSetupOverview = async () => {
  const { data } = await API.get("/onboarding/summary");
  return data.overview ?? data;
};
