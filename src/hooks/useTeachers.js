import {
  useCallback,
  useEffect,
  useState,
} from "react";


import {
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  suspendTeacher,
  activateTeacher,
} from "../services/teacherService";



export default function useTeachers(
 initialFilters={}
){


const [teachers,setTeachers]
=
useState([]);



const [loading,setLoading]
=
useState(false);



const [actionLoading,setActionLoading]
=
useState(null);



const [error,setError]
=
useState("");



const [filters,setFilters]
=
useState({

search:"",
status:"",
department:"",
page:1,
limit:10,

...initialFilters

});



const [pagination,setPagination]
=
useState({

page:1,
limit:10,
total:0,
pages:1

});






const fetchTeachers =
useCallback(
async()=>{


try{


setLoading(true);

setError("");



const response =
await getTeachers(filters);



const data =
response.data || response;



setTeachers(
data.teachers || []
);



setPagination(
data.pagination || {}
);



}
catch(err){


setError(
err.response?.data?.message ||
"Failed to load teachers"
);


}
finally{


setLoading(false);


}


},
[filters]
);







useEffect(()=>{


fetchTeachers();


},[
fetchTeachers
]);








const updateFilters=(changes)=>{


setFilters(prev=>({

...prev,

...changes,

page:1

}));

};








const changePage=(page)=>{


setFilters(prev=>({

...prev,

page

}));

};









const removeTeacher =
async(id)=>{


try{


setActionLoading(id);


await deleteTeacher(id);


await fetchTeachers();


}
catch(err){


setError(
err.response?.data?.message ||
"Unable to delete teacher"
);


}
finally{


setActionLoading(null);


}


};








const suspend =
async(id)=>{


try{


setActionLoading(id);


await suspendTeacher(id);


await fetchTeachers();


}
finally{


setActionLoading(null);


}


};








const activate =
async(id)=>{


try{


setActionLoading(id);


await activateTeacher(id);


await fetchTeachers();


}
finally{


setActionLoading(null);


}


};









const refresh =
async()=>{

await fetchTeachers();

};






return {


teachers,

pagination,


loading,

actionLoading,

error,


filters,


updateFilters,

changePage,


refresh,


removeTeacher,

suspend,

activate,


};

}