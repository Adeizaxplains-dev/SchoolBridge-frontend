// ============================================================
// src/services/termService.js
// SchoolBridge Term Service
// ============================================================


import api from "./api";



/*
==============================================================
GET ALL TERMS
==============================================================
*/


export const getTerms = (params = {}) =>

  api
    .get("/school-setup/terms", {
      params,
    })
    .then(
      response => response.data
    );





/*
==============================================================
GET SINGLE TERM
==============================================================
*/


export const getTerm = (id) =>

  api
    .get(`/school-setup/terms/${id}`)
    .then(
      response => response.data
    );






/*
==============================================================
CREATE TERM
==============================================================
*/


export const createTerm = (data) =>

  api
    .post("/school-setup/terms", data)
    .then(
      response => response.data
    );







/*
==============================================================
UPDATE TERM
==============================================================
*/


export const updateTerm = (
  id,
  data
)=>

  api
    .put(
      `/school-setup/terms/${id}`,
      data
    )
    .then(
      response => response.data
    );






/*
==============================================================
DELETE TERM
==============================================================
*/


export const deleteTerm = (id)=>

  api
    .delete(`/school-setup/terms/${id}`)
    .then(
      response => response.data
    );




export default {

  getTerms,

  getTerm,

  createTerm,

  updateTerm,

  deleteTerm,

};