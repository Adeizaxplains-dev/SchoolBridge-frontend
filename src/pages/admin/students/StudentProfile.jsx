import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";


import {
  ArrowLeft,
  Edit,
  Loader2,
  AlertCircle,
} from "lucide-react";



import StudentProfileHeader
from "../../../components/students/profile/StudentProfileHeader";


import StudentInfoCard
from "../../../components/students/profile/StudentInfoCard";


import StudentAcademicCard
from "../../../components/students/profile/StudentAcademicCard";


import StudentParentCard
from "../../../components/students/profile/StudentParentCard";


import StudentMedicalCard
from "../../../components/students/profile/StudentMedicalCard";


import StudentDocumentsCard
from "../../../components/students/profile/StudentDocumentsCard";






export default function StudentProfile(){



const {
 id
}=useParams();



const navigate =
useNavigate();




const [
 student,
 setStudent
]=useState(null);



const [
 loading,
 setLoading
]=useState(true);



const [
 error,
 setError
]=useState("");








useEffect(()=>{


loadStudent();


},[id]);









async function loadStudent(){


try{


setLoading(true);



/*
Replace later:

GET /students/:id

*/


const response = {


id,


firstName:
"Ahmed",


middleName:
"Ibrahim",


lastName:
"Yusuf",


passport:null,


gender:
"Male",


dateOfBirth:
"2012-05-12",


nationality:
"Nigerian",


stateOfOrigin:
"Lagos",


religion:
"Islam",



phone:
"08000000000",


email:
"student@email.com",


address:
"Lagos Nigeria",




admissionNumber:
"STU-001",


className:
"JSS 1",


section:
"A",


session:
"2026/2027",


status:
"Active",





parent:{


name:
"Mr Ibrahim Yusuf",

phone:
"08011111111",

email:
"parent@email.com"


},





medical:{


bloodGroup:
"O+",


genotype:
"AA",

allergies:
"None",

notes:
""

},





documents:[

{

name:
"Birth Certificate",

url:"#"

},

{

name:
"Passport",

url:"#"

}

]


};



setStudent(response);



}

catch(err){


setError(
"Unable to load student profile"
);


}

finally{


setLoading(false);


}


}









if(loading){


return (

<div
className="
flex
h-96
items-center
justify-center
"
>

<Loader2
className="
animate-spin
text-blue-600
"
size={40}
/>

</div>

);


}









if(error){


return (

<div
className="
rounded-2xl
border
border-red-200
bg-red-50
p-6
text-red-700
flex
items-center
gap-3
"
>

<AlertCircle size={22}/>

{error}

</div>

);


}








return (

<div
className="
mx-auto
max-w-7xl
space-y-8
"
>





{/* Top Navigation */}


<div
className="
flex
items-center
justify-between
"
>


<button

onClick={()=>navigate(-1)}

className="
inline-flex
items-center
gap-2
rounded-xl
border
border-slate-200
bg-white
px-4
py-2
text-sm
font-medium
hover:bg-slate-50
"

>

<ArrowLeft size={18}/>

Back

</button>





<button

onClick={()=>


navigate(
`/admin/students/${id}/edit`
)

}

className="
inline-flex
items-center
gap-2
rounded-xl
bg-blue-600
px-5
py-3
text-sm
font-semibold
text-white
hover:bg-blue-700
"

>

<Edit size={18}/>

Edit Student

</button>



</div>










{/* Profile Header */}


<StudentProfileHeader

student={student}

/>









<div
className="
grid
gap-8
xl:grid-cols-3
"
>




{/* Left */}


<div
className="
space-y-8
xl:col-span-2
"
>


<StudentInfoCard

student={student}

/>




<StudentAcademicCard

student={student}

/>




<StudentDocumentsCard

student={student}

/>



</div>








{/* Right */}


<div
className="
space-y-8
"
>



<StudentParentCard

student={student}

/>




<StudentMedicalCard

student={student}

/>



</div>




</div>





</div>

);


}