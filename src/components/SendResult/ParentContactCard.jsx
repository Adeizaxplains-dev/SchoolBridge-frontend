export default function ParentContactCard({
  phone,
  email,
  onPhoneChange,
  onEmailChange,
}) {
  return (
    <div className="bg-gray-50 rounded-xl p-5 border">

      <h2 className="font-bold mb-4">
        Parent Contact
      </h2>

      <div className="space-y-4">

        <div>

          <label className="block mb-1 font-medium">
            WhatsApp Number
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e)=>
              onPhoneChange(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

        <div>

          <label className="block mb-1 font-medium">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            onChange={(e)=>
              onEmailChange(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />

        </div>

      </div>

    </div>
  );
}