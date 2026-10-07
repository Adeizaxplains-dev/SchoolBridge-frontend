export default function Settings() {
  return (
    <div>
      <div className="space-y-6">

        {/* Page Header */}

        <div>
          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-gray-500 mt-1">
            Manage your school account and system preferences
          </p>
        </div>

        {/* School Information */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            School Information
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-2 font-medium">
                School Name
              </label>

              <input
                type="text"
                placeholder="SchoolBridge Academy"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                School Email
              </label>

              <input
                type="email"
                placeholder="admin@school.com"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Phone Number
              </label>

              <input
                type="text"
                placeholder="08012345678"
                className="w-full border rounded-lg p-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                School Address
              </label>

              <input
                type="text"
                placeholder="School Address"
                className="w-full border rounded-lg p-3"
              />
            </div>

          </div>

        </div>

        {/* Notification Settings */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Notifications
          </h2>

          <div className="space-y-4">

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              Email Notifications
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked />
              WhatsApp Notifications
            </label>

            <label className="flex items-center gap-3">
              <input type="checkbox" />
              SMS Notifications
            </label>

          </div>

        </div>

        {/* Security */}

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Security
          </h2>

          <div className="space-y-4">

            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-lg p-3"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border rounded-lg p-3"
            />

          </div>

        </div>

        {/* Save Button */}

        <div>

          <button
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
              font-medium
            "
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}