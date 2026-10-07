// src/components/ui/FormInput.jsx

export default function FormInput({

  label,

  name,

  type="text",

  value,

  onChange,

  placeholder="",

  error,

}) {


return (

<div className="space-y-2">


<label

htmlFor={name}

className="
block
text-sm
font-medium
text-gray-700
dark:text-gray-300
"

>

{label}

</label>



<input

id={name}

name={name}

type={type}

value={value}

onChange={onChange}

placeholder={placeholder}

className="
w-full
rounded-lg
border
border-gray-300

px-4
py-3

text-sm

outline-none

focus:border-primary

focus:ring-2
focus:ring-primary/20

dark:bg-gray-800
dark:border-gray-700
dark:text-white
"

/>



{

error && (

<p

className="
text-sm
text-red-500
"

>

{error}

</p>

)

}



</div>

);


}