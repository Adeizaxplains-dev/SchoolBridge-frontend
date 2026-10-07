import { useState } from "react";
import API from "../../services/api";
import DeliveryOption from "./DeliveryOption";
import ParentContactCard from "./ParentContactCard";

import { assetUrl } from "../../services/api";

export default function SendResultModal({
  open,
  onClose,
  result,
}) {
  const [delivery, setDelivery] =
    useState({
      whatsapp: true,
      email: false,
      preview: false,
      download: false,
    });

  const [phone, setPhone] =
    useState(result?.parentPhone || "");

const [loading,setLoading]=useState(false);

  const [email, setEmail] =
    useState(result?.parentEmail || "");


  const sendResult = async () => {

  try{

  setLoading(true);

  /////////////////////////////////////////////////
  // Preview
  /////////////////////////////////////////////////

  if(delivery.preview){

  const res=await API.get(
  `/results/pdf/${result._id}`
  );

  window.open(
  assetUrl(res.data.pdfUrl),
  "_blank"
  );

  }

  /////////////////////////////////////////////////
  // Download
  /////////////////////////////////////////////////

  if(delivery.download){

  const res=await API.get(
  `/results/pdf/${result._id}`
  );

  const link=document.createElement("a");

  link.href=
  assetUrl(res.data.pdfUrl);

  link.download="Result.pdf";

  link.click();

  }

  /////////////////////////////////////////////////
  // WhatsApp + Email
  /////////////////////////////////////////////////

  if(
  delivery.whatsapp ||
  delivery.email
  ){

  const res=await API.post(

  `/results/send/${result._id}`,

  {

  phone,

  email,

  whatsapp:
  delivery.whatsapp,

  emailDelivery:
  delivery.email

  }

  );

  alert(res.data.message);

  }

  onClose();

  }
  catch(err){

  console.log(err);

  alert(

  err.response?.data?.message ||

  "Sending failed"

  );

  }
  finally{

  setLoading(false);

  }

  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-4xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-2xl font-bold">
            Send Student Result
          </h1>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <DeliveryOption
            icon="📱"
            title="WhatsApp"
            description="Send result to parent's WhatsApp"
            selected={delivery.whatsapp}
            onClick={() =>
              setDelivery({
                ...delivery,
                whatsapp:
                  !delivery.whatsapp,
              })
            }
          />

          <DeliveryOption
            icon="📧"
            title="Email"
            description="Send PDF via email"
            selected={delivery.email}
            onClick={() =>
              setDelivery({
                ...delivery,
                email:
                  !delivery.email,
              })
            }
          />

          <DeliveryOption
            icon="👁"
            title="Preview"
            description="Open report before sending"
            selected={delivery.preview}
            onClick={() =>
              setDelivery({
                ...delivery,
                preview:
                  !delivery.preview,
              })
            }
          />

          <DeliveryOption
            icon="📄"
            title="Download"
            description="Download report card PDF"
            selected={delivery.download}
            onClick={() =>
              setDelivery({
                ...delivery,
                download:
                  !delivery.download,
              })
            }
          />

        </div>

        <div className="mt-8">

          <ParentContactCard
            phone={phone}
            email={email}
            onPhoneChange={setPhone}
            onEmailChange={setEmail}
          />

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-5 py-3 rounded-lg border"
          >
            Cancel
          </button>

          <button

onClick={sendResult}

disabled={loading}

className="bg-blue-600 text-white px-6 py-3 rounded-lg"

>

{

loading

?

"Sending..."

:

"Send Result"

}

</button>

        </div>

      </div>

    </div>
  );
}
