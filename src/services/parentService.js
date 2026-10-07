import api from "./api";



/**
 * Get all parents
 *
 * Supports:
 * search
 * status
 * class
 * pagination
 */
export const getParents = (params = {}) => {

  return api.get("/parents", {
    params,
  });

};





/**
 * Get single parent profile
 */
export const getParentById = (id) => {

  return api.get(
    `/parents/${id}`
  );

};







/**
 * Create parent account
 */
export const createParent = (data) => {

  return api.post(
    "/parents",
    data
  );

};








/**
 * Update parent
 */
export const updateParent = (
  id,
  data
) => {

  return api.put(
    `/parents/${id}`,
    data
  );

};








/**
 * Delete parent
 */
export const deleteParent = (
  id
) => {

  return api.delete(
    `/parents/${id}`
  );

};








/**
 * Suspend parent account
 */
export const suspendParent = (
  id
) => {

  return api.patch(
    `/parents/${id}/suspend`
  );

};








/**
 * Activate parent account
 */
export const activateParent = (
  id
) => {

  return api.patch(
    `/parents/${id}/activate`
  );

};









/**
 * Assign students to parent
 *
 * Example:
 *
 * {
 *   students:[
 *      studentId1,
 *      studentId2
 *   ]
 * }
 */
export const assignStudents = (
  parentId,
  students
) => {

  return api.patch(
    `/parents/${parentId}/students`,
    {
      students,
    }
  );

};








/**
 * Remove student from parent
 */
export const removeStudent = (
  parentId,
  studentId
) => {

  return api.delete(
    `/parents/${parentId}/students/${studentId}`
  );

};








/**
 * Get parent children
 */
export const getParentChildren = (
  parentId
) => {

  return api.get(
    `/parents/${parentId}/children`
  );

};








/**
 * Get children attendance
 */
export const getParentAttendance = (
  parentId,
  params = {}
) => {

  return api.get(
    `/parents/${parentId}/attendance`,
    {
      params,
    }
  );

};








/**
 * Get children results
 */
export const getParentResults = (
  parentId,
  params = {}
) => {

  return api.get(
    `/parents/${parentId}/results`,
    {
      params,
    }
  );

};








/**
 * Parent messages
 */
export const getParentMessages = (
  parentId
) => {

  return api.get(
    `/parents/${parentId}/messages`
  );

};








/**
 * Send message to parent
 */
export const sendParentMessage = (
  parentId,
  data
) => {

  return api.post(
    `/parents/${parentId}/messages`,
    data
  );

};








/**
 * Import parents
 */
export const importParents = (
  file
) => {


  const formData =
    new FormData();


  formData.append(
    "file",
    file
  );



  return api.post(
    "/parents/import",
    formData,
    {
      headers:{
        "Content-Type":
        "multipart/form-data",
      },
    }
  );


};








/**
 * Export parents
 */
export const exportParents = (
  params = {}
) => {


  return api.get(
    "/parents/export",
    {
      params,

      responseType:
      "blob",
    }
  );


};







/**
 * Parent statistics
 *
 * Later replace frontend calculations
 */
export const getParentStats = () => {

  return api.get(
    "/parents/stats"
  );

};