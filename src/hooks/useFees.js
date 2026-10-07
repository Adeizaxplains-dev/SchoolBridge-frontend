import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  getFeeStructures,
  createFeeStructure,
  updateFeeStructure,
  deleteFeeStructure,
} from "../services/feeStructureService";





export default function useFees(
  initialFilters = {}
){



/*
=====================================================
STATE
=====================================================
*/


const [

feeStructures,

setFeeStructures

]=useState([]);




const [

loading,

setLoading

]=useState(false);




const [

saving,

setSaving

]=useState(false);




const [

deleting,

setDeleting

]=useState(false);




const [

error,

setError

]=useState("");





const [

filters,

setFilters

]=useState({

search:"",

className:"",

term:"",

session:"",

page:1,

limit:10,


...initialFilters


});






const [

pagination,

setPagination

]=useState({

page:1,

limit:10,

total:0,

pages:1,

});









/*
=====================================================
LOAD FEE STRUCTURES
=====================================================
*/


const fetchFees = useCallback(

async()=>{


try{


setLoading(true);

setError("");



const response =

await getFeeStructures(filters);



const result =

response?.data ?? response;



setFeeStructures(


result?.feeStructures ||

result?.fees ||

Array.isArray(result)

?

result

:

[]


);




setPagination(

result?.pagination ||

{}

);



}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to load fee structures"

);



}

finally{


setLoading(false);


}


},

[filters]

);









useEffect(()=>{


fetchFees();


},[fetchFees]);











/*
=====================================================
CREATE FEE
=====================================================
*/


const createFee = async(data)=>{


try{


setSaving(true);

setError("");



const response =

await createFeeStructure(data);



await fetchFees();



return response;



}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to create fee structure"

);



throw err;


}

finally{


setSaving(false);


}


};









/*
=====================================================
UPDATE FEE
=====================================================
*/


const updateFee = async(

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



await fetchFees();



return response;



}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to update fee structure"

);



throw err;


}

finally{


setSaving(false);


}


};









/*
=====================================================
DELETE FEE
=====================================================
*/


const removeFee = async(id)=>{


try{


setDeleting(true);

setError("");



const response =

await deleteFeeStructure(id);



await fetchFees();



return response;



}

catch(err){


setError(

err?.response?.data?.message ||

"Unable to delete fee structure"

);



throw err;


}

finally{


setDeleting(false);


}


};











/*
=====================================================
FILTERS
=====================================================
*/


const updateFilters = (

changes

)=>{


setFilters(previous=>({


...previous,


...changes,


page:1,


}));


};











/*
=====================================================
REFRESH
=====================================================
*/


const refresh = ()=>{


return fetchFees();


};











return {



/*
DATA
*/


feeStructures,


pagination,





/*
STATES
*/


loading,

saving,

deleting,

error,





/*
FILTERS
*/


filters,

setFilters,

updateFilters,





/*
ACTIONS
*/


fetchFees,

refresh,


createFee,

updateFee,

removeFee,



};

}