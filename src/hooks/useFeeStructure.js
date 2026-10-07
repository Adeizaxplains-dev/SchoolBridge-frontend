// ============================================================
// src/hooks/useFeeStructures.js
// SchoolBridge Fee Structure Management Hook
// ============================================================


import {
  useState,
  useEffect,
  useCallback,
} from "react";


import {

  getFeeStructures,

  getFeeStructure,

  createFeeStructure,

  updateFeeStructure,

  deleteFeeStructure,

} from "../services/feeStructureService";









/*
=====================================================
FEE STRUCTURE HOOK

Responsible for:

- Fetch fee structures
- Fetch single fee structure
- Create fee structure
- Update fee structure
- Delete fee structure

=====================================================
*/


export default function useFeeStructures(){





const [feeStructures,setFeeStructures] = useState([]);



const [selectedFeeStructure,setSelectedFeeStructure] =
useState(null);



const [loading,setLoading] = useState(false);



const [saving,setSaving] = useState(false);



const [deleting,setDeleting] = useState(false);



const [error,setError] = useState("");









/*
=====================================================
FETCH ALL FEE STRUCTURES
=====================================================
*/


const fetchFeeStructures =
useCallback(
async(params={})=>{


try{


setLoading(true);

setError("");



const response =
await getFeeStructures(params);



const data =
response?.data || response;



setFeeStructures(

data?.feeStructures ||

data ||

[]

);



return data;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to load fee structures."

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


fetchFeeStructures();


},[
fetchFeeStructures
]);









/*
=====================================================
FETCH SINGLE FEE STRUCTURE
=====================================================
*/


const fetchFeeStructure =
async(id)=>{


try{


setLoading(true);

setError("");



const response =
await getFeeStructure(id);



const data =
response?.data || response;



setSelectedFeeStructure(data);



return data;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to load fee structure."

);



throw err;


}
finally{


setLoading(false);


}



};









/*
=====================================================
CREATE FEE STRUCTURE
=====================================================
*/


const addFeeStructure =
async(data)=>{


try{


setSaving(true);

setError("");



const response =
await createFeeStructure(data);



await fetchFeeStructures();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to create fee structure."

);



throw err;


}
finally{


setSaving(false);


}



};









/*
=====================================================
UPDATE FEE STRUCTURE
=====================================================
*/


const editFeeStructure =
async(
id,
data
)=>{


try{


setSaving(true);

setError("");



const response =
await updateFeeStructure(
id,
data
);



await fetchFeeStructures();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to update fee structure."

);



throw err;


}
finally{


setSaving(false);


}



};









/*
=====================================================
DELETE FEE STRUCTURE
=====================================================
*/


const removeFeeStructure =
async(id)=>{


try{


setDeleting(true);

setError("");



const response =
await deleteFeeStructure(id);



await fetchFeeStructures();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to delete fee structure."

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


feeStructures,


selectedFeeStructure,


loading,


saving,


deleting,


error,



fetchFeeStructures,


fetchFeeStructure,


addFeeStructure,


editFeeStructure,


removeFeeStructure,



refresh:
fetchFeeStructures,



clearError,


};


}