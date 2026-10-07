// ============================================================
// src/services/schoolService.js
// SchoolBridge Enterprise School API Service
// ============================================================


import api from "./api";





/*
==============================================================
GET SCHOOL PROFILE

Backend:
GET /api/schools

Used by:

- School Profile
- Dashboard
- Sidebar
- Topbar
- Setup

==============================================================
*/


export const getSchoolProfile = async()=>{


    const response = await api.get(
        "/schools"
    );


    return response.data;


};









/*
==============================================================
UPDATE SCHOOL PROFILE


Backend:

PUT /api/schools


Updates:

- name
- email
- phone
- address
- logo
- motto
- school type
- ownership
- settings


==============================================================
*/


export const updateSchoolProfile = async(
    payload
)=>{


    const response = await api.put(

        "/schools",

        payload

    );


    return response.data;


};









/*
==============================================================
UPLOAD SCHOOL LOGO


Backend:

POST /api/schools/logo


Middleware:

upload.single("logo")


Cloudinary Upload


Payload:

multipart/form-data

Field:
logo


Returns:

{
 success:true,
 logo:"cloudinary_url"
}


==============================================================
*/


export const uploadSchoolLogo = async(
 file,
 onProgress
)=>{


const formData =
new FormData();


formData.append(
 "logo",
 file
);



const response =
await api.post(

"/schools/logo",

formData,

{

headers:{
"Content-Type":
"multipart/form-data"
},

onUploadProgress:(event)=>{


if(onProgress){

const percent =
Math.round(
(event.loaded * 100) /
event.total
);


onProgress(percent);

}


}

}

);


return response.data;


};








/*
==============================================================
GET SCHOOL STATISTICS


Backend:

GET /api/schools/stats


Used by:

Dashboard

==============================================================
*/


export const getSchoolStats = async()=>{


    const response =
    await api.get(

        "/schools/stats"

    );


    return response.data;


};









/*
==============================================================
DEFAULT EXPORT

==============================================================
*/


export default {


    getSchoolProfile,


    updateSchoolProfile,


    uploadSchoolLogo,


    getSchoolStats


};