// ============================================================
// src/hooks/useSubjects.js
// SchoolBridge Subject Management Hook
// ============================================================


import {
  useState,
  useEffect,
  useCallback,
} from "react";


import {

  getSubjects,

  getSubject,

  createSubject,

  updateSubject,

  deleteSubject,

} from "../services/subjectService";









/*
=====================================================
SUBJECT HOOK

Responsible for:

- Fetch subjects
- Fetch single subject
- Create subject
- Update subject
- Delete subject

=====================================================
*/


export default function useSubjects(){





const [subjects,setSubjects] = useState([]);



const [selectedSubject,setSelectedSubject] = useState(null);



const [loading,setLoading] = useState(false);



const [saving,setSaving] = useState(false);



const [deleting,setDeleting] = useState(false);



const [error,setError] = useState("");









/*
=====================================================
FETCH ALL SUBJECTS
=====================================================
*/


const fetchSubjects =
useCallback(
async(params={})=>{


try{


setLoading(true);

setError("");



const response =
await getSubjects(params);



const data =
response?.data || response;



setSubjects(

data?.subjects ||

data ||

[]

);



return data;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to load subjects."

);



throw err;


}
finally{


setLoading(false);


}



},
[]
);









useEffect(()=>{


fetchSubjects();


},[
fetchSubjects
]);









/*
=====================================================
FETCH SINGLE SUBJECT
=====================================================
*/


const fetchSubject =
async(id)=>{


try{


setLoading(true);

setError("");



const response =
await getSubject(id);



const data =
response?.data || response;



setSelectedSubject(data);



return data;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to load subject."

);



throw err;


}
finally{


setLoading(false);


}



};









/*
=====================================================
CREATE SUBJECT
=====================================================
*/


const addSubject =
async(data)=>{


try{


setSaving(true);

setError("");



const response =
await createSubject(data);



await fetchSubjects();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to create subject."

);



throw err;


}
finally{


setSaving(false);


}



};









/*
=====================================================
UPDATE SUBJECT
=====================================================
*/


const editSubject =
async(
id,
data
)=>{


try{


setSaving(true);

setError("");



const response =
await updateSubject(
id,
data
);



await fetchSubjects();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to update subject."

);



throw err;


}
finally{


setSaving(false);


}



};









/*
=====================================================
DELETE SUBJECT
=====================================================
*/


const removeSubject =
async(id)=>{


try{


setDeleting(true);

setError("");



const response =
await deleteSubject(id);



await fetchSubjects();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to delete subject."

);



throw err;


}
finally{


setDeleting(false);


}



};









/*
=====================================================
CLEAR ERROR
=====================================================
*/


const clearError = ()=>{


setError("");

};









/*
=====================================================
RETURN API
=====================================================
*/


return {


subjects,


selectedSubject,


loading,


saving,


deleting,


error,



fetchSubjects,


fetchSubject,


addSubject,


editSubject,


removeSubject,



refresh:
fetchSubjects,



clearError,


};


}