import api from "./api";


/*
==================================================
GET ALL TEACHERS
==================================================
*/
export const getTeachers = (
  params = {}
) => {

  return api.get(
    "/teachers",
    {
      params,
    }
  );

};





/*
==================================================
GET TEACHER STATISTICS
==================================================
*/
export const getTeacherStats = () => {

  return api.get(
    "/teachers/stats"
  );

};







/*
==================================================
GET SINGLE TEACHER
==================================================
*/

// New standard name
export const getTeacher = (
  id
) => {

  return api.get(
    `/teachers/${id}`
  );

};


// Backward compatibility
export const getTeacherById = getTeacher;









/*
==================================================
CREATE TEACHER
==================================================
*/

export const createTeacher = async (
  formData
) => {


try{


const response = await api.post(

"/teachers",

formData,

{
headers:{
"Content-Type":
"multipart/form-data",
},
}

);


return response.data;


}

catch(error){


console.error(

"CREATE TEACHER SERVICE ERROR:",

error.response?.data || error

);


throw error;


}


};









/*
==================================================
UPDATE TEACHER
==================================================
*/

export const updateTeacher = async (

id,

formData

)=>{


try{


const response = await api.put(

`/teachers/${id}`,

formData,

{
headers:{
"Content-Type":
"multipart/form-data",
},
}

);


return response.data;


}

catch(error){


console.error(

"UPDATE TEACHER SERVICE ERROR:",

error.response?.data || error

);


throw error;


}


};









/*
==================================================
DELETE TEACHER
==================================================
*/

export const deleteTeacher = (
id
)=>{

return api.delete(
`/teachers/${id}`
);

};









/*
==================================================
SUSPEND TEACHER
==================================================
*/

export const suspendTeacher = (
id
)=>{

return api.patch(
`/teachers/${id}/suspend`
);

};









/*
==================================================
ACTIVATE TEACHER
==================================================
*/

export const activateTeacher = (
id
)=>{

return api.patch(
`/teachers/${id}/activate`
);

};









/*
==================================================
ASSIGN CLASSES
==================================================
*/

export const assignClasses = (

teacherId,

classes

)=>{


return api.patch(

`/teachers/${teacherId}/classes`,

{
classes
}

);


};









/*
==================================================
ASSIGN SUBJECTS
==================================================
*/

export const assignSubjects = (

teacherId,

subjects

)=>{


return api.patch(

`/teachers/${teacherId}/subjects`,

{
subjects
}

);


};









/*
==================================================
GET TEACHER SCHEDULE
==================================================
*/

export const getTeacherSchedule = (

teacherId

)=>{


return api.get(

`/teachers/${teacherId}/schedule`

);


};









/*
==================================================
ADD TEACHER SCHEDULE
==================================================
*/

export const addTeacherSchedule = (

teacherId,

data

)=>{


return api.post(

`/teachers/${teacherId}/schedule`,

data

);


};









/*
==================================================
REMOVE TEACHER SCHEDULE
==================================================
*/

export const removeTeacherSchedule = (

teacherId,

scheduleId

)=>{


return api.delete(

`/teachers/${teacherId}/schedule/${scheduleId}`

);


};









/*
==================================================
GET TEACHER ATTENDANCE
==================================================
*/

export const getTeacherAttendance = (

teacherId,

filter="month"

)=>{


return api.get(

`/teachers/${teacherId}/attendance`,

{
params:{
filter
}
}

);


};









/*
==================================================
GET TEACHER PERFORMANCE
==================================================
*/

export const getTeacherPerformance = (

teacherId

)=>{


return api.get(

`/teachers/${teacherId}/performance`

);


};









/*
==================================================
IMPORT TEACHERS
==================================================
*/

export const importTeachers = (

file

)=>{


const formData = new FormData();


formData.append(
"file",
file
);



return api.post(

"/teachers/import",

formData,

{
headers:{
"Content-Type":
"multipart/form-data",
}
}

);


};









/*
==================================================
EXPORT TEACHERS
==================================================
*/

export const exportTeachers = (

params={}

)=>{


return api.get(

"/teachers/export",

{
params,

responseType:"blob",

}

);


};