import {
  useEffect,
  useState,
} from "react";


import {
  useNavigate,
  useParams,
} from "react-router-dom";


import {
  ArrowLeft,
  CreditCard,
  Wallet,
  CheckCircle,
  Clock,
  AlertCircle,
  Receipt,
} from "lucide-react";


import {
  getParentById,
} from "../../../services/parentService";


import {
  getParentPayments,
} from "../../../services/paymentService";







export default function ParentPayments(){


  const {
    id
  } = useParams();



  const navigate =
    useNavigate();





  const [parent,setParent] =
    useState(null);



  const [payments,setPayments] =
    useState([]);



  const [summary,setSummary] =
    useState({});



  const [loading,setLoading] =
    useState(true);



  const [error,setError] =
    useState("");









  useEffect(()=>{


    loadData();


  },[id]);









  const loadData=async()=>{


    try{


      setLoading(true);



      const [
        parentResponse,
        paymentResponse
      ] = await Promise.all([


        getParentById(id),


        getParentPayments(id)


      ]);





      setParent(

        parentResponse.data.parent ||

        parentResponse.data

      );





      const paymentData =

        paymentResponse.data;





      setPayments(

        paymentData.payments ||

        paymentData ||

        []

      );





      setSummary(

        paymentData.summary ||

        {}

      );



    }
    catch(err){


      setError(
        "Unable to load payment records"
      );


    }
    finally{


      setLoading(false);


    }


  };









  if(loading){


    return (

      <div
      className="
      rounded-3xl
      bg-white
      p-10
      text-center
      text-slate-500
      "
      >

        Loading payments...

      </div>

    );

  }









  return (

    <div
    className="
    space-y-8
    "
    >





      <button

      onClick={()=>navigate(-1)}

      className="
      flex
      items-center
      gap-2
      text-slate-600
      "

      >

        <ArrowLeft size={18}/>

        Back

      </button>









      <div>


        <h1
        className="
        text-3xl
        font-bold
        text-slate-900
        "
        >

          Payment Records

        </h1>



        <p
        className="
        mt-2
        text-slate-500
        "
        >

          Fee and transaction history for {parent?.name}

        </p>


      </div>









      {
        error && (

          <div
          className="
          flex
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

        )
      }









      {/* Summary Cards */}



      <div
      className="
      grid
      gap-6
      md:grid-cols-3
      "
      >



        <SummaryCard

        icon={Wallet}

        title="Total Paid"

        value={
          formatMoney(
            summary.totalPaid
          )
        }

        />





        <SummaryCard

        icon={Clock}

        title="Outstanding"

        value={
          formatMoney(
            summary.outstanding
          )
        }

        />





        <SummaryCard

        icon={CreditCard}

        title="Transactions"

        value={
          summary.totalTransactions || 0
        }

        />




      </div>









      {/* Transactions */}



      <div
      className="
      overflow-hidden
      rounded-3xl
      border
      bg-white
      "
      >



        <table
        className="
        w-full
        "
        >


          <thead
          className="
          bg-slate-50
          "
          >

            <tr>


              <th className="p-4 text-left">
                Reference
              </th>


              <th className="p-4 text-left">
                Amount
              </th>


              <th className="p-4 text-left">
                Status
              </th>


              <th className="p-4 text-left">
                Date
              </th>



              <th className="p-4 text-left">
                Receipt
              </th>


            </tr>


          </thead>







          <tbody
          className="
          divide-y
          "
          >


          {
            payments.map(payment=>(


              <tr

              key={
                payment._id
              }

              >


                <td className="p-4">

                  {
                    payment.reference ||
                    "-"
                  }

                </td>




                <td className="p-4 font-semibold">

                  {
                    formatMoney(
                      payment.amount
                    )
                  }

                </td>




                <td className="p-4">


                  <PaymentStatus

                  status={
                    payment.status
                  }

                  />


                </td>




                <td className="p-4 text-slate-500">

                  {
                    formatDate(
                      payment.createdAt
                    )
                  }

                </td>




                <td className="p-4">


                  <button

                  className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-slate-100
                  px-3
                  py-2
                  text-sm
                  font-semibold
                  "

                  >

                    <Receipt size={16}/>

                    View

                  </button>


                </td>



              </tr>


            ))
          }


          </tbody>



        </table>



      </div>







    </div>

  );

}









function SummaryCard({

icon:Icon,

title,

value,

}){


return (

<div
className="
rounded-3xl
border
bg-white
p-6
shadow-sm
"
>

<div
className="
flex
items-center
gap-3
"
>

<Icon
className="text-blue-600"
/>


<h3
className="
font-semibold
"
>

{title}

</h3>


</div>



<p
className="
mt-4
text-3xl
font-bold
"
>

{value}

</p>


</div>

);

}









function PaymentStatus({

status

}){


const paid =
status==="Paid";



return (

<span
className={`

inline-flex

items-center

gap-2

rounded-full

px-3

py-1

text-sm

font-semibold


${
paid

?

"bg-emerald-100 text-emerald-700"

:

"bg-orange-100 text-orange-700"

}

`}
>


{
paid

?

<CheckCircle size={15}/>

:

<Clock size={15}/>

}



{
status || "Pending"
}


</span>

);

}









function formatMoney(value){


if(!value)
return "₦0";


return `₦${Number(value).toLocaleString()}`;

}









function formatDate(date){


if(!date)
return "-";


return new Date(date)
.toLocaleDateString();


}