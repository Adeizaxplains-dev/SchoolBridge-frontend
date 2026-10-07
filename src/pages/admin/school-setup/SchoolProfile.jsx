// ============================================================
// src/pages/admin/school-setup/SchoolProfile.jsx
// SchoolBridge Enterprise School Profile Setup
// ============================================================

import {
  useEffect,
  useState,
} from "react";

import {
  Building2,
  Save,
  Loader2,
  Upload,
} from "lucide-react";


import {
  getSchoolProfile,
  updateSchoolProfile,
  uploadSchoolLogo,
} from "../../../services/schoolService";

import {
  useAuth
} from "../../../context/AuthContext";



export default function SchoolProfile({
   onSaved,
   onPrevious,
   isFirstStep
}){


const {
  updateSchool
} = useAuth();



const [loading,setLoading] =
useState(true);


const [saving,setSaving] =
useState(false);


const [uploadingLogo,setUploadingLogo] =
useState(false);


const [error,setError] =
useState("");

const [uploadProgress,setUploadProgress] =
useState(0);


const [success,setSuccess] =
useState("");



const [form,setForm] =
useState({

name:"",

email:"",

phone:"",

alternatePhone:"",

website:"",

address:"",

city:"",

state:"",

country:"Nigeria",

logo:"",

motto:"",

schoolType:"Secondary",

ownership:"Private",

establishedYear:"",

});





/*
====================================================
LOAD SCHOOL PROFILE
====================================================
*/


useEffect(()=>{

loadProfile();

},[]);



const loadProfile = async()=>{


try{


setLoading(true);


const response =
await getSchoolProfile();



const school =
response.school ||
response;



setForm({

name:
school.name || "",


email:
school.email || "",


phone:
school.phone || "",


alternatePhone:
school.alternatePhone || "",


website:
school.website || "",


address:
school.address || "",


city:
school.city || "",


state:
school.state || "",


country:
school.country || "Nigeria",


logo:
school.logo || "",


motto:
school.motto || "",


schoolType:
school.schoolType || "Secondary",


ownership:
school.ownership || "Private",


establishedYear:
school.establishedYear || "",


});


}
catch(error){


console.error(error);


setError(
"Unable to load school profile"
);


}
finally{


setLoading(false);


}


};





/*
====================================================
HANDLE INPUT
====================================================
*/


const handleChange=(e)=>{


const {
name,
value
}=e.target;


setForm(prev=>({

...prev,

[name]:value

}));


};







/*
====================================================
UPLOAD LOGO

Flow:

Select file
↓
Preview
↓
Cloudinary upload
↓
Save URL
↓
Update Auth Context

====================================================
*/


const handleLogoUpload = async(e)=>{


const file =
e.target.files[0];


if(!file)
return;


try{


setError("");

setSuccess("");

setUploadingLogo(true);

setUploadProgress(0);



const response =
await uploadSchoolLogo(

file,

(percent)=>{

setUploadProgress(percent);

}

);



const logoUrl =
response.school?.logo ||
response.logo;



if(logoUrl){


setForm(prev=>({

...prev,

logo:logoUrl

}));


updateSchool({

logo:logoUrl

});


setSuccess(
"School logo uploaded successfully"
);


}



}

catch(error){


console.error(error);


setError(
"Logo upload failed"
);


}

finally{


setUploadingLogo(false);


}



};









/*
====================================================
SAVE PROFILE
====================================================
*/


const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    setSaving(true);
    setError("");
    setSuccess("");

    const response = await updateSchoolProfile(form);

    const school =
      response?.school ??
      response;

    updateSchool(school);

    setSuccess(
      "School profile updated successfully."
    );

    /*
    ==========================================
    Refresh onboarding progress
    Wait for wizard to update currentStep
    ==========================================
    */

    if (onSaved) {
      await onSaved();
    }

  } catch (error) {

    console.error(error);

    setError(
      error?.response?.data?.message ||
      "Unable to update school profile"
    );

  } finally {

    setSaving(false);

  }

};







if(loading){


return (

<div className="
flex
h-96
items-center
justify-center
">

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






return (

<div className="space-y-6">


{/* HEADER */}

<div className="
rounded-2xl
bg-white
p-6
shadow
dark:bg-gray-900
">


<div className="
flex
items-center
gap-3
">


<div className="
rounded-xl
bg-blue-100
p-3
">


<Building2
className="text-blue-600"
/>


</div>


<div>


<h1 className="
text-2xl
font-bold
dark:text-white
">

School Profile

</h1>


<p className="
text-gray-500
">

Manage school identity and branding

</p>


</div>


</div>


</div>





{error && (

<div className="
rounded-lg
bg-red-100
p-4
text-red-600
">

{error}

</div>

)}


{success && (

<div className="
rounded-lg
bg-green-100
p-4
text-green-700
">

{success}

</div>

)}







<form

onSubmit={handleSubmit}

className="
space-y-6
rounded-2xl
bg-white
p-6
shadow
dark:bg-gray-900
"

>




{/* LOGO */}

<div>


<label className="
mb-2
block
font-medium
">

School Logo

</label>



<div className="
flex
items-center
gap-5
">


{form.logo && (

<img

src={form.logo}

alt="School Logo"

className="
h-24
w-24
rounded-xl
object-cover
border
"

/>

)}



<label className="
flex
cursor-pointer
items-center
gap-2
rounded-lg
border
px-4
py-2
">


{
uploadingLogo

?

<Loader2
size={18}
className="animate-spin"
/>

:

<Upload
size={18}
/>

}


{
uploadingLogo
?
`Uploading ${uploadProgress}%`
:
"Upload Logo"
}



<input

type="file"

hidden

accept="image/*"

onChange={handleLogoUpload}

/>


</label>


</div>


</div>









<div className="
grid
gap-5
md:grid-cols-2
">


<Input

label="School Name"

name="name"

value={form.name}

onChange={handleChange}

/>



<Input

label="Email"

name="email"

value={form.email}

onChange={handleChange}

/>




<Input

label="Phone"

name="phone"

value={form.phone}

onChange={handleChange}

/>




<Input

label="Alternate Phone"

name="alternatePhone"

value={form.alternatePhone}

onChange={handleChange}

/>




<Input

label="Website"

name="website"

value={form.website}

onChange={handleChange}

/>




<Input

label="City"

name="city"

value={form.city}

onChange={handleChange}

/>




<Input

label="State"

name="state"

value={form.state}

onChange={handleChange}

/>




<Input

label="Established Year"

name="establishedYear"

value={form.establishedYear}

onChange={handleChange}

/>


</div>







<Input

label="Motto"

name="motto"

value={form.motto}

onChange={handleChange}

/>







<div>


<label className="
mb-2
block
">

Address

</label>


<textarea

name="address"

value={form.address}

onChange={handleChange}

rows="3"

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
grid
gap-5
md:grid-cols-2
">


<Select

label="School Type"

name="schoolType"

value={form.schoolType}

onChange={handleChange}

options={[
"Primary",
"Secondary",
"Primary & Secondary",
"College",
"University"
]}

/>



<Select

label="Ownership"

name="ownership"

value={form.ownership}

onChange={handleChange}

options={[
"Private",
"Public",
"Mission"
]}

/>



</div>









<div className="flex justify-between">


<button

type="button"

disabled={isFirstStep}

onClick={onPrevious}

className="
rounded-lg
border
px-5
py-3
"

>

Previous

</button>




<button

type="submit"

disabled={saving}

className="
rounded-lg
bg-blue-600
px-6
py-3
text-white
"

>

{

saving

?

"Saving..."

:

"Save & Continue"

}


</button>



</div>



{
uploadingLogo && (

<div className="mt-3 w-64">


<div className="h-2 rounded-full bg-gray-200">


<div

className="h-2 rounded-full bg-blue-600 transition-all"

style={{

width:`${uploadProgress}%`

}}

/>


</div>


<p className="mt-1 text-sm text-gray-500">

{uploadProgress}% uploaded

</p>


</div>

)
}


</form>


</div>


);


}







function Input({
label,
...props
}){


return (

<div>

<label className="
mb-2
block
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







function Select({
label,
options,
...props
}){


return (

<div>

<label className="
mb-2
block
text-sm
font-medium
">

{label}

</label>


<select

{...props}

className="
w-full
rounded-lg
border
p-3
dark:bg-gray-800
dark:text-white
"

>


{
options.map(option=>(

<option

key={option}

value={option}

>

{option}

</option>

))

}


</select>


</div>

);


}