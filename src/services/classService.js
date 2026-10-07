// ============================================================
// src/services/classService.js
// SchoolBridge Class Service
// ============================================================


import api from "./api";




/*
==============================================================
GET CLASSES
==============================================================
*/


export const getClasses = (params={}) =>

api
.get("/school-setup/classes",{
  params,
})
.then(
 response=>response.data
);






/*
==============================================================
GET SINGLE CLASS
==============================================================
*/


export const getClass=(id)=>

api
.get(`/school-setup/classes/${id}`)
.then(
response=>response.data
);






/*
==============================================================
CREATE CLASS
==============================================================
*/


export const createClass=(data)=>

api
.post("/school-setup/classes",data)
.then(
response=>response.data
);







/*
==============================================================
UPDATE CLASS
==============================================================
*/


export const updateClass=(
id,
data
)=>

api
.put(
 `/school-setup/classes/${id}`,
 data
)
.then(
response=>response.data
);







/*
==============================================================
DELETE CLASS
==============================================================
*/


export const deleteClass=(id)=>

api
.delete(`/school-setup/classes/${id}`)
.then(
response=>response.data
);







export default {


getClasses,

getClass,

createClass,

updateClass,

deleteClass,


};