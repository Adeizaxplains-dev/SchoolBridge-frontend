import {
  useEffect,
  useState,
  useCallback,
} from "react";


import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentStats,
} from "../services/studentService";





export default function useStudents(
  initialFilters = {}
) {




const [students,setStudents] =
useState([]);




const [stats,setStats] =
useState(null);




const [loading,setLoading] =
useState(false);



const [actionLoading,setActionLoading] =
useState(null);




const [error,setError] =
useState("");






const [filters,setFilters] =
useState({

search:"",

className:"",

feeStatus:"",

gender:"",

page:1,

limit:10,


...initialFilters

});







const [pagination,setPagination] =
useState({

page:1,

limit:10,

total:0,

pages:1

});









/*
=====================================================
FETCH STUDENTS
=====================================================
*/


const fetchStudents =
useCallback(

async()=>{


try{


setLoading(true);

setError("");



const response =
await getStudents(filters);




const data =
response.data || response;




setStudents(

data.students ||

data ||

[]

);




setPagination(

data.pagination ||

{}

);



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to load students"

);



setStudents([]);


}
finally{


setLoading(false);


}



},

[filters]

);









/*
=====================================================
FETCH STATS
=====================================================
*/


const fetchStats =
useCallback(

async()=>{


try{


const response =
await getStudentStats();



const data =
response.data || response;



setStats(data);



}
catch(err){


console.error(
"Student stats error:",
err
);



setStats(null);


}


},

[]

);









/*
=====================================================
CREATE STUDENT
=====================================================
*/


const addStudent =
async(data)=>{


try{


setActionLoading("create");

setError("");



await createStudent(data);



await fetchStudents();

await fetchStats();



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to create student"

);


throw err;


}
finally{


setActionLoading(null);


}


};









/*
=====================================================
UPDATE STUDENT
=====================================================
*/


const editStudent =
async(
id,
data
)=>{


try{


setActionLoading(id);

setError("");



await updateStudent(
id,
data
);



await fetchStudents();

await fetchStats();



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to update student"

);


throw err;


}
finally{


setActionLoading(null);


}


};









/*
=====================================================
DELETE STUDENT
=====================================================
*/


const removeStudent =
async(id)=>{


try{


setActionLoading(id);

setError("");



await deleteStudent(id);



await fetchStudents();

await fetchStats();



}
catch(err){


setError(

err.response?.data?.message ||

"Unable to delete student"

);



throw err;


}
finally{


setActionLoading(null);


}


};









/*
=====================================================
FILTER UPDATE
=====================================================
*/


const updateFilters =
(changes)=>{


setFilters(previous=>({

...previous,

...changes,

page:1

}));


};









/*
=====================================================
PAGE CHANGE
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
REFRESH
=====================================================
*/


const refresh =
async()=>{


await fetchStudents();

await fetchStats();


};









useEffect(()=>{


fetchStudents();

fetchStats();


},[
fetchStudents,
fetchStats
]);









return {


/*
 DATA
*/

students,

stats,

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


fetchStudents,

fetchStats,


addStudent,

editStudent,

removeStudent,


};


}