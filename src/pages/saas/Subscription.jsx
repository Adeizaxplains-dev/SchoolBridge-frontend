export default function Subscription() {
  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Subscription Plan
      </h1>

      {/* Current Plan */}

      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Current Subscription
        </h2>

        <div className="grid grid-cols-4 gap-4">

          <div>
            <p className="text-gray-500">Plan</p>
            <h3 className="font-bold">Trial</h3>
          </div>

          <div>
            <p className="text-gray-500">Days Left</p>
            <h3 className="font-bold text-orange-600">
              11 Days
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Students</p>
            <h3 className="font-bold">
              37 / 50
            </h3>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <h3 className="font-bold text-green-600">
              Active
            </h3>
          </div>

        </div>
      </div>

    </div>
  );
}