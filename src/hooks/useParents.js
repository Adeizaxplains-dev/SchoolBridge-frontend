import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  getParents,
  deleteParent,
  suspendParent,
  activateParent,
} from "../services/parentService";





export default function useParents(
  initialFilters = {}
) {



  const [parents,setParents] =
    useState([]);




  const [loading,setLoading] =
    useState(false);



  const [actionLoading,setActionLoading] =
    useState(null);




  const [error,setError] =
    useState("");





  const [filters,setFilters] =
    useState({

      search:"",

      status:"",

      className:"",

      page:1,

      limit:10,


      ...initialFilters,

    });






  const [pagination,setPagination] =
    useState({

      page:1,

      limit:10,

      total:0,

      pages:1,

    });









/*
=====================================================
FETCH PARENTS
=====================================================
*/


const fetchParents =
useCallback(

async()=>{


try{


setLoading(true);

setError("");



const response =
await getParents(filters);




/*
 Normalize API response

 Supports:

 {
   data:{
     parents:[]
   }
 }

 OR

 {
   parents:[]
 }

*/


const data =
response.data || response;




setParents(

data.parents || []

);




setPagination(

data.pagination || {

page:1,

limit:10,

total:0,

pages:1

}

);



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to load parents"

);


}
finally{


setLoading(false);


}


},

[filters]

);










useEffect(()=>{


fetchParents();


},[fetchParents]);









/*
=====================================================
FILTERS
=====================================================
*/


const updateFilters =
(changes)=>{


setFilters(previous=>({


...previous,


...changes,


// reset pagination

page:1


}));


};










/*
=====================================================
PAGINATION
=====================================================
*/


const changePage =
(page)=>{


setFilters(previous=>({


...previous,


page


}));


};









/*
=====================================================
DELETE PARENT
=====================================================
*/


const removeParent =
async(id)=>{


try{


setActionLoading(id);



await deleteParent(id);



await fetchParents();



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to delete parent"

);


}
finally{


setActionLoading(null);


}


};









/*
=====================================================
SUSPEND PARENT
=====================================================
*/


const suspend =
async(id)=>{


try{


setActionLoading(id);



await suspendParent(id);



await fetchParents();



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to suspend parent"

);


}
finally{


setActionLoading(null);


}


};









/*
=====================================================
ACTIVATE PARENT
=====================================================
*/


const activate =
async(id)=>{


try{


setActionLoading(id);



await activateParent(id);



await fetchParents();



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to activate parent"

);


}
finally{


setActionLoading(null);


}


};









/*
=====================================================
REFRESH
=====================================================
*/


const refresh =
async()=>{


await fetchParents();


};









return {


/*
 DATA
*/

parents,

pagination,



/*
 STATES
*/

loading,

actionLoading,

error,



/*
 FILTERS
*/

filters,



/*
 ACTIONS
*/

updateFilters,

changePage,

refresh,


removeParent,

suspend,

activate,


};


}