import { 
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";


import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  UserPen
} from "lucide-react";


// SERVICES
import {
  getStudent,
  updateStudent
} from "../../../services/studentService";


// STUDENT COMPONENTS

import StudentPersonalForm from "../../../components/students/forms/StudentPersonalForm";
import StudentContactForm from "../../../components/students/forms/StudentContactForm";
import StudentAcademicForm from "../../../components/students/forms/StudentAcademicForm";
import StudentParentForm from "../../../components/students/forms/StudentParentForm";
import StudentMedicalForm from "../../../components/students/forms/StudentMedicalForm";
import StudentDocumentForm from "../../../components/students/forms/StudentDocumentForm";
import StudentFormActions from "../../../components/students/forms/StudentFormActions";





const initialForm = {


/* PERSONAL */

passport:null,

firstName:"",
middleName:"",
lastName:"",

gender:"",
dateOfBirth:"",

placeOfBirth:"",
nationality:"",
stateOfOrigin:"",
localGovernment:"",

religion:"",
motherTongue:"",
primaryLanguage:"",

bloodGroup:"",
genotype:"",




/* CONTACT */

email:"",
phone:"",
alternatePhone:"",

address:"",
city:"",
state:"",
country:"",
postalCode:"",
landmark:"",




/* ACADEMIC */

admissionNumber:"",
admissionDate:"",

classId:"",
sectionId:"",
sessionId:"",
houseId:"",

status:"Active",




/* PARENT */

parentId:"",




/* MEDICAL */

allergies:"",
medicalConditions:"",
medications:"",

specialNeeds:"",

hospital:"",
doctor:"",

emergencyMedicalContact:"",

healthInsurance:"",

medicalNotes:"",




/* DOCUMENTS */

birthCertificate:null,
previousResult:null,
transferLetter:null,
medicalReport:null,
immunizationCard:null,
parentIdentityDocument:null,
otherDocument:null


};






export default function EditStudent(){



const navigate = useNavigate();


const { id } = useParams();





// STATES

const [loading,setLoading] = useState(true);

const [saving,setSaving] = useState(false);


const [error,setError] = useState("");

const [successMessage,setSuccessMessage] =
useState("");



const [student,setStudent] =
useState(null);



const [form,setForm] =
useState(initialForm);



const [errors,setErrors] =
useState({});



const [dirty,setDirty] =
useState(false);




const snapshot =
useRef("");






// LOOKUPS

const [classes,setClasses] =
useState([]);

const [sections,setSections] =
useState([]);

const [sessions,setSessions] =
useState([]);

const [houses,setHouses] =
useState([]);

const [parents,setParents] =
useState([]);



const [selectedParent,setSelectedParent] =
useState(null);







const lookups = useMemo(()=>({


genders:[

{
 value:"Male",
 label:"Male"
},

{
 value:"Female",
 label:"Female"
}

],



bloodGroups:[

"A+",
"A-",
"B+",
"B-",
"AB+",
"AB-",
"O+",
"O-"

],



genotypes:[

"AA",
"AS",
"AC",
"SS",
"SC"

],



statuses:[

{
 value:"Active",
 label:"Active"
},


{
 value:"Inactive",
 label:"Inactive"
},


{
 value:"Suspended",
 label:"Suspended"
}


],



countries:[],

states:[],

religions:[],

languages:[]



}),[]);








// LOAD STUDENT


useEffect(()=>{

loadStudent();

},[id]);






async function loadStudent(){


try{


setLoading(true);

setError("");



const response =
await getStudent(id);



const data =
response.data || response;



setStudent(data);



const updatedForm = {

...initialForm,

...data

};



setForm(updatedForm);



snapshot.current =
JSON.stringify(updatedForm);




/*
Temporary empty lookup data.
Later connect:
classService
parentService
sessionService
*/

setClasses([]);

setSections([]);

setSessions([]);

setHouses([]);

setParents([]);



}
catch(err){


console.error(err);


setError(

err.response?.data?.message ||

err.message ||

"Unable to load student"

);


}
finally{


setLoading(false);


}



}







// UPDATE FORM FIELD


function updateField(field,value){


setDirty(true);



setForm(prev=>({

...prev,

[field]:value

}));



if(errors[field]){


setErrors(prev=>({

...prev,

[field]:""

}));


}



}

// ============================================================
// PARENT HANDLING
// ============================================================


useEffect(()=>{


if(!form.parentId){

setSelectedParent(null);

return;

}


const parent = parents.find(
(item)=>item._id === form.parentId
);


setSelectedParent(parent || null);



},[
form.parentId,
parents
]);






function handleParentSearch(keyword){


console.log(
"Searching parent:",
keyword
);


// Later:
// parentService.search(keyword)



}






function handleCreateParent(){


navigate("/parents/add");


}






function clearParent(){


updateField(
"parentId",
""
);


}








// ============================================================
// VALIDATION
// ============================================================


function validateForm(){


const validationErrors = {};



if(!form.firstName?.trim()){


validationErrors.firstName =
"First name is required";


}



if(!form.lastName?.trim()){


validationErrors.lastName =
"Last name is required";


}



if(!form.gender){


validationErrors.gender =
"Gender is required";


}



if(!form.dateOfBirth){


validationErrors.dateOfBirth =
"Date of birth is required";


}



if(!form.admissionNumber?.trim()){


validationErrors.admissionNumber =
"Admission number is required";


}



if(!form.classId){


validationErrors.classId =
"Class is required";


}



if(!form.sessionId){


validationErrors.sessionId =
"Session is required";


}



if(!form.status){


validationErrors.status =
"Status is required";


}




setErrors(validationErrors);



return Object.keys(validationErrors).length === 0;



}








// ============================================================
// SAVE STUDENT
// ============================================================


async function handleSubmit(){


if(!validateForm()) return;



try{


setSaving(true);

setError("");



await updateStudent(
id,
form
);




snapshot.current =
JSON.stringify(form);



setDirty(false);



setSuccessMessage(
"Student updated successfully"
);



setTimeout(()=>{


setSuccessMessage("");

},4000);




}
catch(err){


console.error(err);



setError(

err.response?.data?.message ||

err.message ||

"Unable to update student"

);



}
finally{


setSaving(false);


}


}









// ============================================================
// SAVE DRAFT
// ============================================================


async function handleSaveDraft(){


try{


setSaving(true);



await updateStudent(

id,

{

...form,

draft:true

}

);



setSuccessMessage(
"Draft saved successfully"
);



}
catch(err){


console.error(err);



setError(
"Unable to save draft"
);


}
finally{


setSaving(false);


}



}










// ============================================================
// SAVE AND ADD NEW
// ============================================================


async function handleSaveAndAdd(){


if(!validateForm()) return;



try{


setSaving(true);



await updateStudent(
id,
form
);



navigate(
"/students/add"
);



}
catch(err){


console.error(err);


setError(
"Unable to save student"
);



}
finally{


setSaving(false);


}


}










// ============================================================
// RESET FORM
// ============================================================


function handleReset(){


if(!student) return;



const restored = {


...initialForm,

...student


};



setForm(restored);


setErrors({});


setDirty(false);



}









// ============================================================
// LOADING SCREEN
// ============================================================


if(loading){


return (

<div className="
flex 
min-h-[70vh]
items-center
justify-center
">


<div className="text-center">


<Loader2

size={42}

className="
mx-auto
animate-spin
text-blue-600
"

/>



<p className="
mt-4
text-slate-500
">

Loading student...

</p>



</div>


</div>

);


}









// ============================================================
// ERROR SCREEN
// ============================================================


if(error && !student){


return (

<div className="
rounded-3xl
border
border-red-200
bg-red-50
p-8
">


<div className="
flex
items-center
gap-3
">


<AlertCircle

className="text-red-600"

/>



<div>


<h2 className="
font-semibold
text-red-700
">

Unable to load student

</h2>



<p className="
text-red-600
">

{error}

</p>



</div>



</div>


</div>

);


}









// ============================================================
// PAGE UI
// ============================================================


return (

<div className="
space-y-8
">



{/* HEADER */}


<div className="
flex
items-center
justify-between
">



<div className="
flex
items-center
gap-4
">



<button

onClick={()=>navigate("/students")}

className="
rounded-xl
border
border-slate-300
p-3
hover:bg-slate-50
"

>


<ArrowLeft size={20}/>


</button>





<div className="
flex
h-14
w-14
items-center
justify-center
rounded-2xl
bg-blue-600
text-white
">


<UserPen size={28}/>


</div>





<div>


<h1 className="
text-3xl
font-bold
text-slate-900
">

Edit Student

</h1>



<p className="
text-slate-500
">

Update student profile and academic information.

</p>



</div>



</div>



</div>










{/* SUCCESS */}


{successMessage && (

<div className="
rounded-2xl
border
border-emerald-200
bg-emerald-50
p-4
">


<p className="
font-medium
text-emerald-700
">

{successMessage}

</p>


</div>


)}








{/* ERROR */}


{error && (

<div className="
rounded-2xl
border
border-red-200
bg-red-50
p-4
">


<p className="
font-medium
text-red-700
">

{error}

</p>


</div>


)}










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

errors={errors}

loading={saving}

genders={lookups.genders}

bloodGroups={lookups.bloodGroups}

genotypes={lookups.genotypes}

countries={lookups.countries}

states={lookups.states}

religions={lookups.religions}

languages={lookups.languages}

/>







<StudentContactForm

form={form}

updateField={updateField}

errors={errors}

loading={saving}

countries={lookups.countries}

states={lookups.states}

/>








<StudentAcademicForm

form={form}

updateField={updateField}

errors={errors}

loading={saving}

classes={classes}

sections={sections}

sessions={sessions}

houses={houses}

statuses={lookups.statuses}

/>








<StudentParentForm

form={form}

updateField={updateField}

errors={errors}

loading={saving}

parents={parents}

selectedParent={selectedParent}

onSearch={handleParentSearch}

onCreateParent={handleCreateParent}

onClearParent={clearParent}

/>








<StudentMedicalForm

form={form}

updateField={updateField}

errors={errors}

loading={saving}

bloodGroups={lookups.bloodGroups}

genotypes={lookups.genotypes}

/>








<StudentDocumentForm

form={form}

updateField={updateField}

loading={saving}

/>








<StudentFormActions

loading={saving}

dirty={dirty}

onSubmit={handleSubmit}

onSaveDraft={handleSaveDraft}

onSaveAndAdd={handleSaveAndAdd}

onReset={handleReset}

onCancel={()=>navigate("/students")}

/>







</form>



</div>

);


}