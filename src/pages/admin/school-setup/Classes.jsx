// src/pages/admin/school-setup/Classes.jsx


import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";


import {
  GraduationCap,
  Plus,
  RefreshCcw,
  Edit,
  Trash2,
  X,
} from "lucide-react";


import SetupSkeleton from "../../../components/school-setup/SetupSkeleton";


import SetupEmptyState from "../../../components/school-setup/SetupEmptyState";
import useSchoolSetup from "../../../hooks/useSchoolSetup";
import SummaryCard from "../../../components/school-setup/SummaryCard";







export default function Classes(){



/*
=====================================================
HOOKS
=====================================================
*/


const {

 loading,

 saving,

 deleting,

 error,


 getClasses,

 createClass,

 updateClass,

 deleteClass,



} = useSchoolSetup();









/*
=====================================================
STATE
=====================================================
*/


const [

classes,

setClasses

]=useState([]);








const [

selectedClass,

setSelectedClass

]=useState(null);




const [

showModal,

setShowModal

]=useState(false);




const [

validationErrors,

setValidationErrors

]=useState({});






const initialForm={


name:"",

level:"",

description:"",


};






const [

formData,

setFormData

]=useState(initialForm);









/*
=====================================================
LOAD CLASSES
=====================================================
*/


const loadClasses =
useCallback(

async()=>{


try{


const data =
await getClasses();



setClasses(

Array.isArray(data)

?

data

:

data?.classes || []

);



}

catch(err){


console.error(
"Load classes error:",
err
);


}



},

[
getClasses
]

);









/*
=====================================================
INITIAL LOAD
=====================================================
*/


useEffect(()=>{


loadClasses();



},[
loadClasses
]);









/*
=====================================================
HELPERS
=====================================================
*/


const totalClasses =
classes.length;















/*
=====================================================
FORM CHANGE
=====================================================
*/


const handleChange = (
event
)=>{


const {

name,

value

}=event.target;



setFormData(

previous=>({

...previous,

[name]:value


})

);



};









/*
=====================================================
OPEN CREATE
=====================================================
*/


const openCreate = ()=>{


setSelectedClass(null);



setFormData(initialForm);



setValidationErrors({});



setShowModal(true);



};









/*
=====================================================
OPEN EDIT
=====================================================
*/


const openEdit = (
item
)=>{


setSelectedClass(item);



setFormData({

name:
item.name || "",


level:
item.level || "",


description:
item.description || "",


});



setValidationErrors({});



setShowModal(true);



};

/*
=====================================================
DELETE CLASS
=====================================================
*/


const handleDelete = async(id)=>{


const confirmed =
window.confirm(
"Delete this class?"
);



if(!confirmed)
return;




try{


await deleteClass(id);



await loadClasses();



}

catch(err){


console.error(
"Delete class error:",
err
);


}



};









/*
=====================================================
VALIDATION
=====================================================
*/

const validateForm = () => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Class name is required.";
  }

  setValidationErrors(errors);

  return Object.keys(errors).length === 0;
};


/*
=====================================================
SAVE CLASS
=====================================================
*/

const handleSave = async () => {
  if (!validateForm()) return;

  try {
    if (selectedClass) {
      await updateClass(selectedClass._id, formData);
    } else {
      await createClass(formData);
    }

    setShowModal(false);
    setSelectedClass(null);
    setFormData(initialForm);
    await loadClasses();
  } catch (err) {
    console.error("Save class error:", err);
  }
};


/*
=====================================================
LOADING STATE
=====================================================
*/


if(loading){

return (

<SetupSkeleton />

);

}







/*
=====================================================
ERROR STATE
=====================================================
*/


if(error && classes.length === 0){

return (

<SetupEmptyState


title="Unable to load classes"


description={error}


actionLabel="Retry"


onAction={loadClasses}


icon={GraduationCap}


/>

);

}









return (

<div className="space-y-8">






{/* =================================================
HEADER
================================================= */}



<div

className="
flex

flex-col

gap-4

rounded-2xl

bg-white

p-6

shadow-sm


dark:bg-gray-900


md:flex-row

md:items-center

md:justify-between
"

>



<div>


<div

className="
flex

items-center

gap-3
"

>


<div

className="
flex

h-12

w-12

items-center

justify-center

rounded-xl

bg-primary/10

text-primary
"

>


<GraduationCap

className="h-6 w-6"

/>


</div>






<div>


<h1

className="
text-2xl

font-semibold

text-gray-900


dark:text-white
"

>

Classes

</h1>






<p

className="
mt-1

text-sm

text-gray-500


dark:text-gray-400
"

>

Manage school classes used by
students, teachers and results.

</p>



</div>




</div>


</div>









<button

onClick={openCreate}

className="
inline-flex

items-center

justify-center

gap-2

rounded-lg

bg-primary

px-5

py-3

text-sm

font-medium

text-white

hover:opacity-90
"

>


<Plus

className="h-4 w-4"

/>


Add Class


</button>




</div>









{/* =================================================
SUMMARY CARDS
================================================= */}



<div

className="
grid

gap-6


sm:grid-cols-2


xl:grid-cols-3
"

>



<SummaryCard


title="Total Classes"


value={totalClasses}


/>







<SummaryCard

            title="Class Arms"

            value="Next Step"

          />







<SummaryCard


title="Master Data"


value="Classes"


/>





</div>









{/* =================================================
CLASSES TABLE
================================================= */}



<section

className="
overflow-hidden

rounded-2xl

bg-white

shadow-sm


dark:bg-gray-900
"

>



<div

className="
flex

items-center

justify-between

border-b

px-6

py-5


dark:border-gray-800
"

>


<h2

className="
font-semibold

text-gray-900


dark:text-white
"

>

Classes List

</h2>








<button

onClick={()=>{

loadClasses();


}}

className="
flex

items-center

gap-2

text-sm

text-gray-500

hover:text-primary
"

>


<RefreshCcw

className="h-4 w-4"

/>


Refresh


</button>



</div>









{

classes.length===0 ? (



<div className="p-6">


<SetupEmptyState


title="No classes created"


description="
Create classes before adding
students and assigning teachers.
"


actionLabel="Create Class"


onAction={openCreate}


icon={GraduationCap}


/>



</div>



)

:

(



<div

className="
overflow-x-auto
"

>



<table

className="
w-full

text-left
"

>



<thead

className="
border-b

bg-gray-50


dark:border-gray-800


dark:bg-gray-800/50
"

>


<tr>


<th className="px-6 py-4 text-sm">

Class Name

</th>



<th className="px-6 py-4 text-sm">

Level

</th>



<th className="px-6 py-4 text-sm">

Arm

</th>



<th className="px-6 py-4 text-sm">

Description

</th>



<th className="px-6 py-4 text-sm">

Actions

</th>



</tr>



</thead>









<tbody>


{

classes.map(

(item)=>(



<tr

key={item._id}

className="
border-b

last:border-0


dark:border-gray-800
"

>





<td

className="
px-6

py-4

font-medium

text-gray-900


dark:text-white
"

>


{item.name}


</td>







<td className="px-6 py-4 text-sm">


{

item.level || "-"

}


</td>







<td className="px-6 py-4 text-sm">


{

item.arm?.name ||

"-"

}


</td>







<td className="px-6 py-4 text-sm">


{

item.description ||

"-"

}


</td>








<td className="px-6 py-4">


<div

className="
flex

gap-3
"

>



<button

onClick={()=>openEdit(item)}

className="
text-primary
"

>


<Edit

className="h-4 w-4"

/>


</button>







<button

disabled={deleting}

onClick={()=>handleDelete(item._id)}

className="
text-red-500

disabled:opacity-50
"

>


<Trash2

className="h-4 w-4"

/>


</button>




</div>


</td>







</tr>


)


)

}



</tbody>



</table>



</div>



)



}





</section>

      {/* =================================================
          CREATE / EDIT CLASS MODAL
      ================================================= */}

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowModal(false);
              setSelectedClass(null);
            }
          }}
        >
          <div
            className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="class-modal-title"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="class-modal-title"
                  className="text-lg font-semibold text-gray-900 dark:text-white"
                >
                  {selectedClass ? "Edit Class" : "Create Class"}
                </h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {selectedClass
                    ? "Update the class details below."
                    : "Add a class to your school setup."}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  setSelectedClass(null);
                }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                handleSave();
              }}
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="class-name"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Class Name
                </label>
                <input
                  id="class-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. JSS 1"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-primary dark:bg-gray-800 dark:text-white ${
                    validationErrors.name
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                  autoFocus
                />
                {validationErrors.name && (
                  <p className="mt-1 text-xs text-red-500">
                    {validationErrors.name}
                  </p>
                )}
              </div>

              <div>
                  <label
                    htmlFor="class-level"
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Level
                  </label>
                  <input
                    id="class-level"
                    name="level"
                    type="number"
                    min="1"
                    value={formData.level}
                    onChange={handleChange}
                    placeholder="e.g. 1"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />
              </div>

              <div>
                <label
                  htmlFor="class-description"
                  className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Description
                </label>
                <textarea
                  id="class-description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Optional class description"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-primary dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedClass(null);
                  }}
                  className="rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? selectedClass
                      ? "Saving..."
                      : "Creating..."
                    : selectedClass
                      ? "Save Changes"
                      : "Create Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>


  );}