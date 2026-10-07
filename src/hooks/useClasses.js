// ============================================================
// src/hooks/useClasses.js
// SchoolBridge Class Management Hook
// ============================================================


import {
  useState,
  useEffect,
  useCallback,
} from "react";


import {

  getClasses,

  getClass,

  createClass,

  updateClass,

  deleteClass,

} from "../services/classService";







/*
=====================================================
CLASS HOOK

Responsible for:

- Fetch classes
- Fetch single class
- Create class
- Update class
- Delete class

=====================================================
*/


export default function useClasses(){





const [classes,setClasses] = useState([]);



const [selectedClass,setSelectedClass] = useState(null);



const [loading,setLoading] = useState(false);



const [saving,setSaving] = useState(false);



const [deleting,setDeleting] = useState(false);



const [error,setError] = useState("");











/*
=====================================================
FETCH ALL CLASSES
=====================================================
*/


const fetchClasses = useCallback(
async(params={})=>{


try{


setLoading(true);

setError("");



const response =
await getClasses(params);



const data =
response?.data || response;



setClasses(

data?.classes ||

data ||

[]

);



return data;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to load classes."

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


fetchClasses();


},[
fetchClasses
]);









/*
=====================================================
FETCH SINGLE CLASS
=====================================================
*/


const fetchClass =
async(id)=>{


try{


setLoading(true);

setError("");



const response =
await getClass(id);



const data =
response?.data || response;



setSelectedClass(data);



return data;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to load class."

);



throw err;


}
finally{


setLoading(false);


}



};











/*
=====================================================
CREATE CLASS
=====================================================
*/


const addClass =
async(data)=>{


try{


setSaving(true);

setError("");



const response =
await createClass(data);



await fetchClasses();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to create class."

);



throw err;


}
finally{


setSaving(false);


}



};









/*
=====================================================
UPDATE CLASS
=====================================================
*/


const editClass =
async(
id,
data
)=>{


try{


setSaving(true);

setError("");



const response =
await updateClass(
id,
data
);



await fetchClasses();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to update class."

);



throw err;


}
finally{


setSaving(false);


}



};











/*
=====================================================
DELETE CLASS
=====================================================
*/


const removeClass =
async(id)=>{


try{


setDeleting(true);

setError("");



const response =
await deleteClass(id);



await fetchClasses();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to delete class."

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
RETURN
=====================================================
*/


return {


classes,


selectedClass,


loading,


saving,


deleting,


error,



fetchClasses,


fetchClass,


addClass,


editClass,


removeClass,



refresh:
fetchClasses,



clearError,


};


}