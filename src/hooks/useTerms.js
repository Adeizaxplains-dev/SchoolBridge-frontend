import {
  useState,
  useEffect,
  useCallback,
} from "react";


import {
  getTerms,
  createTerm,
  updateTerm,
  deleteTerm,
} from "../services/termService";



/*
=====================================================
TERMS HOOK

Responsible for:

- Fetch terms
- Create term
- Update term
- Delete term

=====================================================
*/


export default function useTerms(){



const [terms,setTerms]=useState([]);


const [loading,setLoading]=useState(false);


const [saving,setSaving]=useState(false);


const [deleting,setDeleting]=useState(false);


const [error,setError]=useState("");





/*
=====================================================
FETCH TERMS
=====================================================
*/


const fetchTerms = useCallback(async()=>{


try{


setLoading(true);

setError("");



const response =
await getTerms();



const data =
response?.data || response;



setTerms(

data?.terms ||

data ||

[]

);



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to load terms"

);


}
finally{


setLoading(false);


}



},[]);







useEffect(()=>{


fetchTerms();


},[fetchTerms]);







/*
=====================================================
CREATE TERM
=====================================================
*/


const addTerm = async(data)=>{


try{


setSaving(true);


const response =
await createTerm(data);



await fetchTerms();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to create term"

);


throw err;


}
finally{


setSaving(false);


}



};







/*
=====================================================
UPDATE TERM
=====================================================
*/


const editTerm = async(
id,
data
)=>{


try{


setSaving(true);



const response =
await updateTerm(
id,
data
);



await fetchTerms();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to update term"

);


throw err;


}
finally{


setSaving(false);


}



};







/*
=====================================================
DELETE TERM
=====================================================
*/


const removeTerm = async(id)=>{


try{


setDeleting(true);



const response =
await deleteTerm(id);



await fetchTerms();



return response;



}
catch(err){


setError(

err?.response?.data?.message ||

"Unable to delete term"

);


throw err;


}
finally{


setDeleting(false);


}



};







const clearError=()=>{


setError("");

};







return {


terms,


loading,


saving,


deleting,


error,



fetchTerms,


addTerm,


editTerm,


removeTerm,


refresh:fetchTerms,


clearError,


};



}