// ============================================================
// src/hooks/useGradingSystems.js
// SchoolBridge Grading System Hook
// ============================================================


import {
  useState,
  useEffect,
  useCallback,
} from "react";


import {
  getGradingSystems,
  createGradingSystem,
  updateGradingSystem,
  deleteGradingSystem,
  setCurrentGradingSystem,
} from "../services/gradingSystemService";





export default function useGradingSystems(){


const [
  gradingSystems,
  setGradingSystems
] = useState([]);




const [
  loading,
  setLoading
] = useState(false);




const [
  saving,
  setSaving
] = useState(false);




const [
  deleting,
  setDeleting
] = useState(false);




const [
  error,
  setError
] = useState("");








/*
=====================================================
FETCH
=====================================================
*/


const fetchGradingSystems = useCallback(

async(params={})=>{


try{


setLoading(true);

setError("");



const response =
await getGradingSystems(params);



const data =
response?.data ?? response;



setGradingSystems(

data?.gradingSystems ||

Array.isArray(data)

? data

: []

);



}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to load grading systems"

);


}

finally{


setLoading(false);


}


},

[]


);










useEffect(()=>{


fetchGradingSystems();


},[
fetchGradingSystems
]);










/*
=====================================================
CREATE
=====================================================
*/


const addGradingSystem =
async(data)=>{


try{


setSaving(true);

setError("");



const response =
await createGradingSystem(data);



await fetchGradingSystems();



return response;


}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to create grading system"

);



throw err;


}

finally{


setSaving(false);


}


};









/*
=====================================================
UPDATE
=====================================================
*/


const editGradingSystem =
async(
id,
data
)=>{


try{


setSaving(true);

setError("");



const response =
await updateGradingSystem(
id,
data
);



await fetchGradingSystems();



return response;


}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to update grading system"

);



throw err;


}

finally{


setSaving(false);


}


};









/*
=====================================================
DELETE
=====================================================
*/


const removeGradingSystem =
async(id)=>{


try{


setDeleting(true);

setError("");



const response =
await deleteGradingSystem(id);



await fetchGradingSystems();



return response;


}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to delete grading system"

);



throw err;


}

finally{


setDeleting(false);


}


};









/*
=====================================================
SET CURRENT
=====================================================
*/


const activateGradingSystem =
async(id)=>{


try{


setSaving(true);

setError("");



const response =
await setCurrentGradingSystem(id);



await fetchGradingSystems();



return response;


}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to activate grading system"

);



throw err;


}

finally{


setSaving(false);


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









return {


gradingSystems,


loading,


saving,


deleting,


error,



fetchGradingSystems,


addGradingSystem,


editGradingSystem,


removeGradingSystem,


activateGradingSystem,


refresh:
fetchGradingSystems,


clearError,


};


}