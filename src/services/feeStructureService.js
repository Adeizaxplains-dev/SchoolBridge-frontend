// ============================================================
// src/services/feeStructureService.js
// SchoolBridge Fee Structure API Service
// ============================================================


import API from "./api";





/*
============================================================
GET ALL FEE STRUCTURES

GET /api/fee-structure

============================================================
*/

export const getFeeStructures = async (
  params = {}
)=>{


  const response =
    await API.get(
      "/fee-structures",
      {
        params
      }
    );


  return response.data;

};






/*
============================================================
GET SINGLE FEE STRUCTURE

GET /api/fee-structure/:id

============================================================
*/

export const getFeeStructure = async (
  id
)=>{


  const response =
    await API.get(
      `/fee-structures/${id}`
    );


  return response.data;

};






/*
============================================================
CREATE FEE STRUCTURE

POST /api/fee-structure

============================================================
*/

export const createFeeStructure = async (
  data
)=>{


  const response =
    await API.post(
      "/fee-structures",
      data
    );


  return response.data;

};






/*
============================================================
UPDATE FEE STRUCTURE

PUT /api/fee-structure/:id

============================================================
*/

export const updateFeeStructure = async (
  id,
  data
)=>{


  const response =
    await API.put(
      `/fee-structures/${id}`,
      data
    );


  return response.data;

};






/*
============================================================
DELETE FEE STRUCTURE

DELETE /api/fee-structure/:id

============================================================
*/

export const deleteFeeStructure = async (
  id
)=>{


  const response =
    await API.delete(
      `/fee-structures/${id}`
    );


  return response.data;

};






/*
============================================================
DEFAULT EXPORT

Useful for hooks importing the whole service.

============================================================
*/

export default {

  getFeeStructures,

  getFeeStructure,

  createFeeStructure,

  updateFeeStructure,

  deleteFeeStructure,

};