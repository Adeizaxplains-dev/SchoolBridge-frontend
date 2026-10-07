import {
  useState,
  useRef,
  useEffect,
} from "react";



const INITIAL_FORM = {


  // Personal

  firstName: "",
  middleName: "",
  lastName: "",

  gender: "",

  dateOfBirth: "",

  nationality: "",

  stateOfOrigin: "",

  religion: "",

  bloodGroup: "",

  genotype: "",

  passport: null,




  // Contact

  email: "",

  phone: "",

  alternatePhone: "",

  address: "",

  city: "",

  state: "",

  country: "",

  postalCode: "",

  landmark: "",





  // Academic

  admissionNumber: "",

  admissionDate: "",

  sessionId: "",

  classId: "",

  sectionId: "",

  houseId: "",

  status: "Active",





  // Parent

  parentId: "",





  // Medical

  allergies: "",

  medicalConditions: "",

  medications: "",

  specialNeeds: "",

  hospital: "",

  doctor: "",

  emergencyMedicalContact: "",

  healthInsurance: "",

  medicalNotes: "",





  // Documents

  birthCertificate: null,

  previousResult: null,

  transferLetter: null,

  medicalReport: null,

  immunizationCard: null,

  parentIdDocument: null,

  otherDocument: null,


};








export default function useStudentForm(
  initialData = null
) {


  const [form,setForm] = useState(

    initialData
    ||
    INITIAL_FORM

  );



  const snapshot =
    useRef(
      JSON.stringify(
        initialData
        ||
        INITIAL_FORM
      )
    );



  const [dirty,setDirty] =
    useState(false);





  const [loading,setLoading] =
    useState(false);








  /*
  -----------------------------------
  Detect changes
  -----------------------------------
  */


  useEffect(()=>{


    const current =
      JSON.stringify(form);



    setDirty(

      current !== snapshot.current

    );



  },[form]);









  /*
  -----------------------------------
  Update single field
  -----------------------------------
  */


  function updateField(
    name,
    value
  ){


    setForm(previous=>({

      ...previous,

      [name]:value

    }));


  }









  /*
  -----------------------------------
  Update multiple fields
  -----------------------------------
  */


  function updateFields(
    values
  ){


    setForm(previous=>({

      ...previous,

      ...values

    }));


  }









  /*
  -----------------------------------
  Reset
  -----------------------------------
  */


  function reset(){


    setForm(

      initialData
      ||
      INITIAL_FORM

    );


    snapshot.current =
      JSON.stringify(

        initialData
        ||
        INITIAL_FORM

      );


    setDirty(false);


  }









  /*
  -----------------------------------
  Load student for edit
  -----------------------------------
  */


  function loadStudent(
    student
  ){


    setForm({

      ...INITIAL_FORM,

      ...student

    });



    snapshot.current =
      JSON.stringify(student);



    setDirty(false);


  }









  /*
  -----------------------------------
  Draft
  -----------------------------------
  */


  function saveDraft(){


    localStorage.setItem(

      "studentDraft",

      JSON.stringify(form)

    );


  }







  function loadDraft(){


    const draft =
      localStorage.getItem(
        "studentDraft"
      );



    if(!draft)
      return;



    const data =
      JSON.parse(draft);



    setForm(data);


  }









  /*
  -----------------------------------
  Convert files + data
  for API upload
  -----------------------------------
  */


  function toFormData(){


    const data =
      new FormData();



    Object.entries(form)
    .forEach(
      ([key,value])=>{


        if(value !== null &&
           value !== undefined
        ){

          data.append(
            key,
            value
          );

        }


      }
    );



    return data;


  }








  return {


    form,


    setForm,


    updateField,


    updateFields,


    reset,


    loadStudent,


    saveDraft,


    loadDraft,


    toFormData,


    dirty,


    loading,


    setLoading,


  };


}






export {
  INITIAL_FORM,
};