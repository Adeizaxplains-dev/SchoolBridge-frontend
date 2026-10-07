// =====================================================
// src/services/gradingSystemService.js
// SchoolBridge Grading System API Service
// =====================================================


import API from "./api";





/*
=====================================================
GET ALL GRADING SYSTEMS

GET /grading-system

=====================================================
*/

export const getGradingSystems = async (
  params = {}
) => {

  const response =
    await API.get(
      "/grading-systems",
      {
        params,
      }
    );


  return response.data;

};









/*
=====================================================
GET SINGLE GRADING SYSTEM

GET /grading-system/:id

=====================================================
*/

export const getGradingSystem = async (
  id
) => {


  const response =
    await API.get(
      `/grading-systems/${id}`
    );


  return response.data;

};









/*
=====================================================
CREATE GRADING SYSTEM

POST /grading-system

=====================================================
*/

export const createGradingSystem = async (
  data
) => {


  const response =
    await API.post(
      "/grading-systems",
      data
    );


  return response.data;

};









/*
=====================================================
UPDATE GRADING SYSTEM

PUT /grading-system/:id

=====================================================
*/

export const updateGradingSystem = async (
  id,
  data
) => {


  const response =
    await API.put(
      `/grading-systems/${id}`,
      data
    );


  return response.data;

};









/*
=====================================================
DELETE GRADING SYSTEM

DELETE /grading-system/:id

=====================================================
*/

export const deleteGradingSystem = async (
  id
) => {


  const response =
    await API.delete(
      `/grading-systems/${id}`
    );


  return response.data;

};









/*
=====================================================
SET ACTIVE GRADING SYSTEM

PATCH /grading-system/:id/current

=====================================================

Used when a school has multiple grading
templates but one active system.

=====================================================
*/

export const setCurrentGradingSystem = async (
  id
) => {


  const response =
    await API.patch(
      `/grading-systems/${id}/current`
    );


  return response.data;

};









/*
=====================================================
EXPORT DEFAULT

Optional convenience import.

=====================================================
*/

export default {

  getGradingSystems,

  getGradingSystem,

  createGradingSystem,

  updateGradingSystem,

  deleteGradingSystem,

  setCurrentGradingSystem,

};