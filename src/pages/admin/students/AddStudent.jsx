import {
  useState,
  useRef,
  useEffect,
} from "react";

import {
  useNavigate,
} from "react-router-dom";


import {
  ArrowLeft,
  GraduationCap,
  AlertCircle,
  CheckCircle,
} from "lucide-react";



import StudentPersonalForm
from "../../../components/students/forms/StudentPersonalForm";


import StudentContactForm
from "../../../components/students/forms/StudentContactForm";


import StudentAcademicForm
from "../../../components/students/forms/StudentAcademicForm";


import StudentParentForm
from "../../../components/students/forms/StudentParentForm";


import StudentMedicalForm
from "../../../components/students/forms/StudentMedicalForm";


import StudentDocumentForm
from "../../../components/students/forms/StudentDocumentForm";


import StudentFormActions
from "../../../components/students/forms/StudentFormActions";



import {
  createStudent,
} from "../../../services/studentService";






export default function AddStudent(){



const navigate = useNavigate();





const initialForm = {


/* Personal */

firstName:"",
middleName:"",
lastName:"",
gender:"",
dateOfBirth:"",
nationality:"",
stateOfOrigin:"",
religion:"",
bloodGroup:"",
genotype:"",
passport:null,



/* Contact */

email:"",
phone:"",
alternatePhone:"",
address:"",
city:"",
state:"",
country:"",
postalCode:"",
landmark:"",


/* Academic */

admissionNumber:"",
admissionDate:"",
sessionId:"",
classId:"",
sectionId:"",
houseId:"",
status:"Active",



/* Parent */

parentId:"",



/* Medical */

allergies:"",
medicalConditions:"",
medications:"",
specialNeeds:"",
hospital:"",
doctor:"",
emergencyMedicalContact:"",
healthInsurance:"",
medicalNotes:"",



/* Documents */

birthCertificate:null,
previousResult:null,
transferLetter:null,
medicalReport:null,
immunizationCard:null,
parentIdDocument:null,
otherDocument:null,


};






const [form,setForm]=useState(
 initialForm
);



const [loading,setLoading]=useState(false);


const [error,setError]=useState("");

const [success,setSuccess]=useState("");



const snapshot =
useRef(
 JSON.stringify(initialForm)
);



const [dirty,setDirty]=useState(false);







useEffect(()=>{


setDirty(

 JSON.stringify(form)
 !==
 snapshot.current

);


},[form]);









function updateField(
name,
value
){

setForm(previous=>({

...previous,

[name]:value

}));

}









async function handleSubmit(){



try{


setLoading(true);

setError("");



await createStudent(
form
);



setSuccess(
"Student created successfully"
);



snapshot.current =
JSON.stringify(form);



setDirty(false);



setTimeout(()=>{


navigate(
"/admin/students"
);


},1500);



}

catch(error){


setError(

error?.response?.data?.message
||
"Unable to create student"

);


}

finally{


setLoading(false);


}


}









function resetForm(){


setForm(
initialForm
);


}









function saveDraft(){


localStorage.setItem(

"studentDraft",

JSON.stringify(form)

);


setSuccess(
"Draft saved successfully"
);


}









function saveAndAdd(){


handleSubmit();


setForm(
initialForm
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




{/* Header */}


<div>


<button

onClick={()=>navigate(-1)}

className="
mb-5
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





<div
className="
flex
items-center
gap-4
"
>


<div
className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-blue-600
text-white
"
>

<GraduationCap size={30}/>

</div>




<div>

<h1
className="
text-3xl
font-bold
text-slate-900
"
>

Add Student

</h1>


<p
className="
mt-1
text-slate-500
"
>

Create a complete student admission record.

</p>


</div>


</div>


</div>









{/* Alerts */}


{
error &&

<div
className="
flex
items-center
gap-3
rounded-xl
border
border-red-200
bg-red-50
p-4
text-red-700
"
>

<AlertCircle size={20}/>

{error}

</div>

}





{
success &&

<div
className="
flex
items-center
gap-3
rounded-xl
border
border-green-200
bg-green-50
p-4
text-green-700
"
>

<CheckCircle size={20}/>

{success}

</div>

}









<form

onSubmit={(e)=>{

e.preventDefault();

handleSubmit();

}}

className="
space-y-8
"

>




<StudentPersonalForm

form={form}

updateField={updateField}

loading={loading}

genders={[
"Male",
"Female"
]}

bloodGroups={[
"A+",
"A-",
"B+",
"B-",
"AB+",
"AB-",
"O+",
"O-"
]}

genotypes={[
"AA",
"AS",
"SS"
]}

/>







<StudentContactForm

form={form}

updateField={updateField}

loading={loading}

/>







<StudentAcademicForm

form={form}

updateField={updateField}

loading={loading}

classes={[]}

sections={[]}

sessions={[]}

houses={[]}

statuses={[
"Active",
"Inactive"
]}

/>








<StudentParentForm

form={form}

updateField={updateField}

loading={loading}

parents={[]}

/>








<StudentMedicalForm

form={form}

updateField={updateField}

loading={loading}

bloodGroups={[
"A+",
"A-",
"B+",
"B-",
"AB+",
"AB-",
"O+",
"O-"
]}

genotypes={[
"AA",
"AS",
"SS"
]}

/>








<StudentDocumentForm

form={form}

updateField={updateField}

loading={loading}

/>









<StudentFormActions

mode="create"

loading={loading}

dirty={dirty}

onSubmit={handleSubmit}

onSaveDraft={saveDraft}

onSaveAndAdd={saveAndAdd}

onReset={resetForm}

onCancel={()=>navigate(-1)}

/>





</form>





</div>


);


}