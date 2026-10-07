import { useEffect, useState } from "react";
import axios from "axios";

import { API_BASE_URL } from "../../services/api";

const API = `${API_BASE_URL}/teacher`;

export default function TeacherResults(){

const [results,setResults]=useState([]);

const [loading,setLoading]=useState(true);

const token=localStorage.getItem("token");

const fetchResults=async()=>{

try{

const {data}=await axios.get(

`${API}/results`,

{

headers:{

Authorization:`Bearer ${token}`

}

}

);

setResults(data.data||[]);

}catch(error){

console.error(error);

}

setLoading(false);

};

useEffect(()=>{

fetchResults();

},[]);

return(

<div className="space-y-6">

<div>

<h1 className="text-3xl font-bold">

Results

</h1>

<p className="text-gray-500">

Manage and publish students results.

</p>

</div>

<div className="bg-white rounded-xl shadow">

<div className="p-5 border-b">

<h2 className="font-semibold">

Saved Results

</h2>

</div>

{loading? (

<div className="p-6">

Loading...

</div>

):(

<table className="w-full">

<thead className="bg-gray-50">

<tr>

<th className="p-4 text-left">

Student

</th>

<th className="p-4 text-left">

Class

</th>

<th className="p-4 text-left">

Average

</th>

<th className="p-4 text-left">

Status

</th>

</tr>

</thead>

<tbody>

{results.map((result)=>(

<tr
key={result._id}
className="border-t"
>

<td className="p-4">

{result.studentId?.name}

</td>

<td className="p-4">

{result.studentId?.class}

</td>

<td className="p-4">

{result.average || "--"}

</td>

<td className="p-4">

<span className={`px-3 py-1 rounded-full text-sm ${
result.published
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}`}>

{result.published
? "Published"
: "Draft"}

</span>

</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</div>

);

}