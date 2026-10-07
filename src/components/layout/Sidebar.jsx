// ============================================================
// SchoolBridge Enterprise Sidebar
// Updated for Enterprise Onboarding System
// ============================================================

import {
  NavLink,
} from "react-router-dom";

import {
  useMemo,
  useState,
  useEffect,
} from "react";


import {
  Menu,
  X,
  LogOut,
} from "lucide-react";


import {
  adminSidebar,
  teacherSidebar,
  parentSidebar,
} from "../../config/sidebarConfig";


import {
  useAuth,
} from "../../context/AuthContext";


import useOnboarding from "../../hooks/useOnboarding";



// ============================================================
// LINK STYLE
// ============================================================

const linkClass = ({isActive}) => `

flex items-center gap-3
rounded-lg px-4 py-3
transition-all

${
isActive
?
"bg-blue-600 text-white shadow"

:
"text-slate-300 hover:bg-slate-800 hover:text-white"

}

`;




// ============================================================
// COMPONENT
// ============================================================

export default function Sidebar(){


const {

user,

school,

logout,

} = useAuth();



const {

getStatus,

} = useOnboarding();



const [open,setOpen] =
useState(false);



const [onboarding,setOnboarding] =
useState(null);





// ============================================================
// LOAD ONBOARDING
// ============================================================

useEffect(()=>{


if(
user?.role !== "admin"
){

return;

}



let mounted = true;



const loadOnboarding = async()=>{


try{


const response =
await getStatus();



if(!mounted)
return;



const data =
  response?.onboarding ??
  response?.data?.onboarding ??
  response?.data?.data ??
  null;



setOnboarding(data);



}

catch(error){


console.error(
"Sidebar onboarding error:",
error.response?.data ||
error.message
);



if(mounted){

setOnboarding({

status:"not_started",

progress:0

});

}


}


};



loadOnboarding();



return()=>{

mounted=false;

};



},[
user?.role
]);







// ============================================================
// ROLE MENU
// ============================================================


const menu = useMemo(()=>{


switch(user?.role){


case "admin":

return adminSidebar;



case "teacher":

return teacherSidebar;



case "parent":

return parentSidebar;



default:

return [];

}


},[
user?.role
]);





// ============================================================
// SETUP STATUS
// ============================================================


const setupRequired =

user?.role === "admin"

&&

onboarding

&&

!onboarding.isCompleted

&&

onboarding.status !== "completed";





const progress =

onboarding?.progress ?? 0;







// ============================================================
// LOGOUT
// ============================================================

const handleLogout=()=>{

logout();

};







return (

<>



{/* MOBILE BUTTON */}

<button

onClick={()=>setOpen(true)}

className="
fixed
left-4
top-4
z-50
rounded-lg
bg-blue-600
p-2
text-white
lg:hidden
"

>

<Menu size={22}/>

</button>







{
open &&

<div

onClick={()=>setOpen(false)}

className="
fixed
inset-0
z-40
bg-black/50
lg:hidden
"

/>

}








<aside

className={`

fixed
left-0
top-0
z-50

flex
h-screen
w-72
flex-col

bg-slate-900
text-white

transition-transform
duration-300

lg:translate-x-0


${
open

?

"translate-x-0"

:

"-translate-x-full"

}

`}

>







{/* HEADER */}

<div

className="
flex
items-center
justify-between
border-b
border-slate-800
px-6
py-6
"

>


<div>


<h1 className="
text-2xl
font-bold
">

SchoolBridge

</h1>


<p className="
text-sm
text-slate-400
">

Smart School Management

</p>


</div>



<button

className="lg:hidden"

onClick={()=>setOpen(false)}

>

<X/>

</button>



</div>







{/* SCHOOL */}

<div

className="
border-b
border-slate-800
px-6
py-5
"

>

<p className="
text-xs
uppercase
text-slate-500
">

School

</p>


<h2 className="
mt-2
truncate
font-semibold
">

{
school?.name ||

"SchoolBridge"

}

</h2>


</div>









{/* SETUP */}

{

setupRequired &&

<div

className="
mx-4
mt-4
rounded-xl
border
border-yellow-500
bg-yellow-500/10
p-4
"

>


<p className="
font-semibold
text-yellow-300
">

Setup Required

</p>



<p className="
mt-1
text-sm
text-yellow-200
">

{progress}% completed

</p>



<NavLink

to="/admin/school-setup/onboard"

className="
mt-3
block
rounded-lg
bg-yellow-500
px-3
py-2
text-center
font-semibold
text-black
"

>

Continue Setup

</NavLink>


</div>


}









{/* MENU */}

<div

className="
flex-1
overflow-y-auto
px-5
py-5
"

>


{

menu.map(section=>(


<div

key={section.title}

className="
mb-8
"

>


<h3

className="
mb-3
text-xs
uppercase
tracking-widest
text-slate-500
"

>

{section.title}

</h3>



<div className="
space-y-1
">


{

section.items?.map(item=>{


const Icon =
item.icon;



return (

<NavLink

key={item.path}

to={item.path}

className={linkClass}

onClick={()=>setOpen(false)}

>


{
Icon &&
<Icon size={18}/>
}


<span>

{item.label}

</span>


</NavLink>

);


})


}



</div>


</div>


))


}


</div>









{/* FOOTER */}

<div

className="
border-t
border-slate-800
px-6
py-5
"

>


<p className="
text-xs
uppercase
text-slate-500
">

Logged In As

</p>



<h3 className="
capitalize
font-semibold
">

{
user?.role
}

</h3>



<p className="
truncate
text-sm
text-slate-400
">

{
user?.email
}

</p>




<button

onClick={handleLogout}

className="
mt-5
flex
w-full
items-center
justify-center
gap-2
rounded-lg
bg-red-600
px-4
py-3
font-semibold
text-white
"

>

<LogOut size={18}/>

Logout

</button>



</div>







</aside>



</>

);


}