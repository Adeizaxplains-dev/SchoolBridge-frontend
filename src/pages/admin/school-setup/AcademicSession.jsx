// ============================================================
// src/pages/admin/school-setup/AcademicSession.jsx
// SchoolBridge Enterprise Academic Session Setup
// ============================================================

import {
    useState,
} from "react";


import {
    CalendarDays,
    Save,
    Loader2,
    CheckCircle,
} from "lucide-react";


import {
    saveAcademicSession,
} from "../../../services/onboardingService";





export default function AcademicSession({
    onSaved
}) {



const [loading,setLoading] =
useState(false);


const [error,setError] =
useState("");


const [success,setSuccess] =
useState("");



const [form,setForm] = useState({

name:"",

code:"",

startDate:"",

endDate:"",

description:"",

isCurrent:true,

});








// ============================================================
// HANDLE INPUT
// ============================================================

const handleChange=(e)=>{


const {
name,
value,
type,
checked
}=e.target;



setForm(prev=>({

...prev,


[name]:

type==="checkbox"

?

checked

:

value


}));


};










// ============================================================
// SAVE
// ============================================================

const handleSubmit = async(e)=>{


e.preventDefault();



try{


setLoading(true);

setError("");

setSuccess("");




await saveAcademicSession(form);




setSuccess(
"Academic session saved successfully"
);



// Tell onboarding wizard
// update progress

if (onSaved) {
    await onSaved();


}




}

catch(err){


console.error(
"Academic Session Error:",
err
);



setError(

err?.response?.data?.message ||

"Unable to save academic session"

);


}


finally{


setLoading(false);


}


};









return (


<div className="space-y-6">







{/* HEADER */}

<div className="
rounded-2xl
bg-white
p-6
shadow-sm
">


<div className="
flex
items-center
gap-4
">


<div className="
rounded-xl
bg-blue-100
p-3
">


<CalendarDays

className="text-blue-600"

size={30}

/>


</div>




<div>


<h1 className="
text-2xl
font-bold
text-slate-900
">

Academic Session

</h1>


<p className="
text-slate-500
">

Create your school's academic year

</p>


</div>



</div>


</div>









{
error &&

<div className="
rounded-xl
bg-red-100
p-4
text-red-700
">

{error}

</div>

}






{
success &&

<div className="
flex
items-center
gap-2
rounded-xl
bg-green-100
p-4
text-green-700
">


<CheckCircle size={20}/>


{success}


</div>

}









<form

onSubmit={handleSubmit}

className="
rounded-2xl
bg-white
p-6
shadow-sm
space-y-6
"

>








<div className="
grid
gap-5
md:grid-cols-2
">





<Input

label="Session Name"

name="name"

placeholder="2026/2027 Academic Session"

value={form.name}

onChange={handleChange}

required

/>







<Input

label="Session Code"

name="code"

placeholder="2026-27"

value={form.code}

onChange={handleChange}

/>







<Input

label="Start Date"

name="startDate"

type="date"

value={form.startDate}

onChange={handleChange}

required

/>







<Input

label="End Date"

name="endDate"

type="date"

value={form.endDate}

onChange={handleChange}

required

/>






</div>









<div>


<label className="
block
mb-2
font-medium
">

Description

</label>



<textarea


name="description"


rows="4"


value={form.description}


onChange={handleChange}


placeholder="Optional description"


className="
w-full
rounded-lg
border
p-3
dark:bg-gray-800
dark:text-white
"

/>



</div>









<div className="
flex
items-center
gap-3
">


<input


type="checkbox"


name="isCurrent"


checked={form.isCurrent}


onChange={handleChange}


className="
h-5
w-5
"

/>



<label className="
font-medium
">

Set as current academic session

</label>



</div>









<button


disabled={loading}


className="
flex
items-center
gap-2
rounded-xl
bg-blue-600
px-6
py-3
font-semibold
text-white
hover:bg-blue-700
disabled:opacity-50
"

>



{

loading

?


<>

<Loader2

size={18}

className="animate-spin"

/>

Saving...

</>



:


<>

<Save size={18}/>

Save Session

</>


}



</button>








</form>








</div>


);


}









// ============================================================
// REUSABLE INPUT
// ============================================================

function Input({

label,

...props

}){


return (

<div>


<label className="
block
mb-2
text-sm
font-medium
">

{label}

</label>



<input

{...props}

className="
w-full
rounded-lg
border
p-3
dark:bg-gray-800
dark:text-white
"

/>



</div>

);


}