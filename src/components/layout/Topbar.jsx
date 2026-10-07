// ============================================================
// SchoolBridge Enterprise Topbar
// ============================================================

import {
  FaBell,
  FaSearch,
} from "react-icons/fa";

import {
  useAuth,
} from "../../context/AuthContext";

import {
  useEffect,
  useState,
} from "react";

import {
  getSchoolProfile,
} from "../../services/schoolService";





export default function Topbar(){


const {
  user,
  school,
  updateSchool,
}=useAuth();



const [schoolData,setSchoolData]=
useState(school || null);




/*
==================================================
LOAD LATEST SCHOOL DATA

Keeps logo/name updated after onboarding
==================================================
*/


useEffect(()=>{


const loadSchool = async()=>{


try{


const response =
await getSchoolProfile();



const data =
response?.school ||
response?.data ||
response;



setSchoolData(data);



if(updateSchool){

updateSchool(data);

}



}
catch(error){


console.error(
"TOPBAR SCHOOL LOAD ERROR:",
error
);


}


};



loadSchool();


},[]);








/*
==================================================
USER INITIAL
==================================================
*/


const userInitial =

user?.name

?

user.name
.charAt(0)
.toUpperCase()

:

"A";







return (

<header

className="
h-16
bg-white
border-b
px-6
flex
items-center
justify-between
dark:bg-gray-900
dark:border-gray-800
"

>





{/* ============================
SEARCH
============================ */}


<div

className="
relative
w-96
"

>


<FaSearch

className="
absolute
left-3
top-3
text-gray-400
"

/>


<input

type="text"

placeholder="
Search students, fees, parents...
"

className="
w-full
rounded-lg
border
py-2
pl-10
pr-4
outline-none
focus:ring-2
focus:ring-blue-500
dark:bg-gray-800
dark:text-white
"

/>


</div>









{/* ============================
RIGHT SECTION
============================ */}


<div

className="
flex
items-center
gap-5
"

>




{/* NOTIFICATION */}


<button

className="
relative
text-gray-600
dark:text-gray-300
"

>


<FaBell size={20}/>



<span

className="
absolute
-negative
top-[-8px]
right-[-8px]
rounded-full
bg-red-500
px-1.5
text-xs
text-white
"

>

5

</span>


</button>









{/* SCHOOL + USER */}


<div

className="
flex
items-center
gap-3
"

>





{/* PROFILE IMAGE */}


{

schoolData?.logo

?


<img

src={schoolData.logo}

alt="School Logo"

className="
h-10
w-10
rounded-full
object-cover
border
"

/>


:

<div

className="
flex
h-10
w-10
items-center
justify-center
rounded-full
bg-blue-600
font-bold
text-white
"

>

{userInitial}

</div>


}









<div>


<p

className="
font-semibold
text-gray-800
dark:text-white
"

>

{

user?.name ||

"Administrator"

}

</p>





<p

className="
text-xs
text-gray-500
dark:text-gray-400
"

>

{

user?.role

?

user.role.charAt(0).toUpperCase()
+
user.role.slice(1)

:

"Admin"

}


{


schoolData?.name &&

<>

{" • "}

{schoolData.name}

</>


}

</p>


</div>






</div>





</div>





</header>

);


}