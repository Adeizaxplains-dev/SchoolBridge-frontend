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
  Send,
  MessageSquare,
  User,
  Clock,
  AlertCircle,
} from "lucide-react";


import {
  getParentById,
} from "../../../services/parentService";


import {
  getMessages,
  sendMessage,
} from "../../../services/messageService";







export default function ParentMessages(){


  const {
    id
  } = useParams();



  const navigate =
    useNavigate();





  const [parent,setParent] =
    useState(null);



  const [messages,setMessages] =
    useState([]);



  const [message,setMessage] =
    useState("");



  const [loading,setLoading] =
    useState(true);



  const [sending,setSending] =
    useState(false);



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
        messageResponse
      ] = await Promise.all([


        getParentById(id),


        getMessages({
          parent:id
        })


      ]);




      setParent(

        parentResponse.data.parent ||

        parentResponse.data

      );



      setMessages(

        messageResponse.data.messages ||

        messageResponse.data ||

        []

      );



    }
    catch(err){


      setError(
        "Unable to load messages"
      );


    }
    finally{


      setLoading(false);


    }


  };









  const handleSend=async()=>{


    if(!message.trim())
      return;



    try{


      setSending(true);



      await sendMessage({

        parent:id,

        message

      });



      setMessage("");



      loadData();



    }
    catch(err){


      setError(
        "Unable to send message"
      );


    }
    finally{


      setSending(false);


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

        Loading messages...

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

          Parent Messages

        </h1>



        <p
        className="
        mt-2
        text-slate-500
        "
        >

          Communication with {parent?.name}

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









      {/* Conversation */}



      <div
      className="
      rounded-3xl
      border
      bg-white
      p-6
      "
      >



        <div
        className="
        space-y-5
        max-h-[500px]
        overflow-y-auto
        "
        >



        {
          messages.length === 0 ?


          (

            <div
            className="
            py-10
            text-center
            text-slate-500
            "
            >

              No messages yet

            </div>

          )


          :


          messages.map(item=>(


            <div

            key={item._id}

            className="
            rounded-2xl
            bg-slate-50
            p-5
            "

            >



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
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-blue-700
                "
                >

                  <User size={18}/>

                </div>



                <div>


                  <p
                  className="
                  font-semibold
                  "
                  >

                    {
                      item.senderName ||
                      "Admin"
                    }

                  </p>


                  <p
                  className="
                  flex
                  items-center
                  gap-1
                  text-xs
                  text-slate-500
                  "
                  >

                    <Clock size={13}/>

                    {
                      formatDate(
                        item.createdAt
                      )
                    }

                  </p>


                </div>


              </div>





              <p
              className="
              mt-4
              text-slate-700
              "
              >

                {item.message}

              </p>


            </div>


          ))

        }



        </div>







        {/* Composer */}



        <div
        className="
        mt-6
        flex
        gap-3
        "
        >



          <textarea


          value={message}


          onChange={(e)=>
            setMessage(
              e.target.value
            )
          }


          placeholder="
          Write message to parent...
          "


          rows="3"


          className="
          flex-1
          rounded-xl
          border
          p-4
          outline-none
          focus:border-blue-500
          "

          />





          <button

          onClick={handleSend}

          disabled={sending}

          className="
          flex
          items-center
          gap-2
          self-end
          rounded-xl
          bg-blue-600
          px-5
          py-3
          font-semibold
          text-white
          disabled:opacity-50
          "

          >

            <Send size={18}/>

            Send


          </button>



        </div>







      </div>







    </div>

  );

}








function formatDate(date){


if(!date)
return "-";


return new Date(date)
.toLocaleString();


}