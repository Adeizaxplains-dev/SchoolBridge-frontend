// ============================================================
// src/services/subjectService.js
// SchoolBridge Subject Service
// ============================================================


import api from "./api";





/*
==============================================================
GET SUBJECTS
==============================================================
*/


export const getSubjects=(params={})=>

api
.get("/school-setup/subjects",{
params,
})
.then(
response=>response.data
);






/*
==============================================================
GET SINGLE SUBJECT
==============================================================
*/


export const getSubject=(id)=>

api
.get(`/school-setup/subjects/${id}`)
.then(
response=>response.data
);







/*
==============================================================
CREATE SUBJECT
==============================================================
*/


export const createSubject=(data)=>

api
.post(
"/school-setup/subjects",
data
)
.then(
response=>response.data
);







/*
==============================================================
UPDATE SUBJECT
==============================================================
*/


export const updateSubject=(
id,
data
)=>

api
.put(
 `/school-setup/subjects/${id}`,
 data
)
.then(
response=>response.data
);








/*
==============================================================
DELETE SUBJECT
==============================================================
*/


export const deleteSubject=(id)=>

api
.delete(
 `/school-setup/subjects/${id}`
)
.then(
response=>response.data
);







export default {


getSubjects,

getSubject,

createSubject,

updateSubject,

deleteSubject,


};