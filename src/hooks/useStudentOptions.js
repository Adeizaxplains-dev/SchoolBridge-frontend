import {
  useState,
  useEffect,
  useCallback,
} from "react";



/*
  Replace these later with services:

  classService.getClasses()

  sectionService.getSections()

  sessionService.getSessions()

  parentService.getParents()

*/





export default function useStudentOptions() {



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




  const [loading,setLoading] =
    useState(false);



  const [error,setError] =
    useState("");









  /*
  -----------------------------------
  Load all options
  -----------------------------------
  */


  const loadOptions =
    useCallback(
      async()=>{


        try{


          setLoading(true);

          setError("");



          /*
          Temporary data.

          Replace with API calls.
          */



          setClasses([

            {
              id:"nursery-1",
              name:"Nursery 1"
            },


            {
              id:"primary-1",
              name:"Primary 1"
            },


            {
              id:"jss-1",
              name:"JSS 1"
            },


          ]);





          setSessions([

            {
              id:"2026-2027",
              name:"2026/2027"
            },


            {
              id:"2025-2026",
              name:"2025/2026"
            },

          ]);





          setHouses([

            {
              id:"red",
              name:"Red House"
            },


            {
              id:"blue",
              name:"Blue House"
            },


          ]);





          setParents([

            {
              _id:"1",
              fullName:
              "Ahmed Ibrahim",

              phone:
              "08000000000",

              email:
              "ahmed@email.com",

              children:[]

            },


          ]);




        }

        catch(error){


          setError(

            error.message
            ||
            "Unable to load student options"

          );


        }

        finally{


          setLoading(false);


        }



      },
      []

    );









  /*
  -----------------------------------
  Load sections by class
  -----------------------------------
  */



  const loadSections =
    useCallback(
      async(classId)=>{


        if(!classId){


          setSections([]);


          return;


        }




        try{


          setLoading(true);




          /*
          API example:

          GET /classes/:id/sections

          */



          const data = [


            {
              id:"a",
              name:"Arm A",
              classId
            },


            {
              id:"b",
              name:"Arm B",
              classId
            },


          ];



          setSections(data);



        }

        catch(error){


          setError(

            error.message

          );


        }

        finally{


          setLoading(false);


        }



      },
      []

    );









  /*
  -----------------------------------
  Search parents
  -----------------------------------
  */


  const searchParents =
    useCallback(
      async(query)=>{


        if(!query){


          return parents;


        }




        const filtered =

          parents.filter(

            parent=>

            parent.fullName
            .toLowerCase()
            .includes(
              query.toLowerCase()
            )


          );



        return filtered;


      },
      [parents]

    );









  /*
  -----------------------------------
  Initial loading
  -----------------------------------
  */


  useEffect(()=>{


    loadOptions();


  },[loadOptions]);










  return {


    classes,


    sections,


    sessions,


    houses,


    parents,



    loading,


    error,



    loadOptions,


    loadSections,


    searchParents,


  };


}