import {
  useCallback,
} from "react";





export default function useStudentValidation(){





  const validateRequired = (
    value
  ) => {


    return (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    );


  };









  const validateFile = (
    file
  )=>{


    if(!file)
      return null;



    const allowedTypes = [


      "image/jpeg",

      "image/png",

      "application/pdf",


    ];



    const maxSize =
      5 * 1024 * 1024;



    if(
      !allowedTypes.includes(
        file.type
      )
    ){

      return "Only PDF, JPG or PNG files are allowed.";

    }





    if(
      file.size > maxSize
    ){

      return "File size must not exceed 5MB.";

    }



    return null;


  };









  const validateEmail = (
    email
  )=>{


    if(!email)
      return true;



    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(email);



  };









  const validatePhone = (
    phone
  )=>{


    if(!phone)
      return true;



    return /^[0-9+\-\s]{10,15}$/
      .test(phone);


  };









  const validate = useCallback(
    
    (form)=>{


      const errors = {};





      /*
      -------------------------
      PERSONAL
      -------------------------
      */



      if(
        !validateRequired(
          form.firstName
        )
      ){

        errors.firstName =
        "First name is required";

      }



      if(
        !validateRequired(
          form.lastName
        )
      ){

        errors.lastName =
        "Last name is required";

      }




      if(
        !validateRequired(
          form.gender
        )
      ){

        errors.gender =
        "Gender is required";

      }




      if(
        !validateRequired(
          form.dateOfBirth
        )
      ){

        errors.dateOfBirth =
        "Date of birth is required";

      }







      if(
        form.passport
      ){

        const error =
          validateFile(
            form.passport
          );


        if(error)
          errors.passport = error;


      }









      /*
      -------------------------
      CONTACT
      -------------------------
      */



      if(
        form.email &&
        !validateEmail(
          form.email
        )
      ){

        errors.email =
        "Invalid email address";

      }






      if(
        form.phone &&
        !validatePhone(
          form.phone
        )
      ){

        errors.phone =
        "Invalid phone number";

      }









      /*
      -------------------------
      ACADEMIC
      -------------------------
      */



      if(
        !validateRequired(
          form.admissionNumber
        )
      ){

        errors.admissionNumber =
        "Admission number is required";

      }





      if(
        !validateRequired(
          form.classId
        )
      ){

        errors.classId =
        "Class selection is required";

      }





      if(
        !validateRequired(
          form.sessionId
        )
      ){

        errors.sessionId =
        "Academic session is required";

      }









      /*
      -------------------------
      PARENT
      -------------------------
      */



      if(
        !validateRequired(
          form.parentId
        )
      ){

        errors.parentId =
        "Parent/Guardian is required";

      }









      /*
      -------------------------
      MEDICAL
      -------------------------
      */



      if(
        form.bloodGroup &&
        !validateRequired(
          form.bloodGroup
        )
      ){

        errors.bloodGroup =
        "Blood group required";

      }









      /*
      -------------------------
      DOCUMENTS
      -------------------------
      */



      const requiredDocuments = [


        {
          key:
          "birthCertificate",

          label:
          "Birth certificate"

        },


        {
          key:
          "passport",

          label:
          "Passport photograph"

        },


      ];






      requiredDocuments.forEach(
        document=>{


          if(
            !form[document.key]
          ){

            errors[document.key] =
            `${document.label} is required`;

          }


        }

      );









      Object.keys(form)
      .filter(
        key=>

        key.includes(
          "Document"
        )

      )
      .forEach(
        key=>{


          if(form[key]){


            const error =
              validateFile(
                form[key]
              );



            if(error)
              errors[key]=error;


          }


        }

      );










      return errors;


    },

    []

  );









  const isValid =
    (errors)=>{


      return (
        Object.keys(errors)
        .length === 0
      );


    };









  return {


    validate,


    isValid,


    validateFile,


  };


}