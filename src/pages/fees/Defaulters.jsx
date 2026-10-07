import { useEffect, useState } from "react";
import { getDefaulters } from "../../services/feeService";
import Button from "../../components/ui/Button";

export default function Defaulters() {
const [defaulters, setDefaulters] =
useState([]);

const [loading, setLoading] =
useState(true);

useEffect(() => {
loadDefaulters();
}, []);

const loadDefaulters = async () => {
try {
const res =
await getDefaulters();

  setDefaulters(
    res.data || []
  );
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}

};

const sendReminder = (
student
) => {
const phone =
student.phone?.replace(
/^0/,
"234"
);


const message =
  `Dear Parent, ${student.name} has an outstanding school fee balance. Kindly make payment as soon as possible. Thank you.`;

const whatsappUrl =
  `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

window.open(
  whatsappUrl,
  "_blank"
);

};

return ( <div> <h1 className="mb-6 text-2xl font-bold">
Defaulters </h1>

  <div className="bg-white rounded-xl shadow p-4">
    {loading ? (
      <p>
        Loading
        defaulters...
      </p>
    ) : (
      <table className="w-full">
        <thead>
          <tr className="text-left bg-gray-100">
            <th className="p-3">
              Student
            </th>

            <th className="p-3">
              Class
            </th>

            <th className="p-3">
              Balance
            </th>

            <th className="p-3">
              Parent Phone
            </th>

            <th className="p-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {defaulters.map(
            (fee) => (
              <tr
                key={fee._id}
                className="border-t"
              >
                <td className="p-3">
                  {
                    fee
                      .studentId
                      ?.name
                  }
                </td>

                <td className="p-3">
                  {
                    fee
                      .studentId
                      ?.class
                  }
                </td>

                <td className="p-3 text-red-600 font-semibold">
                  ₦
                  {fee.balance?.toLocaleString()}
                </td>

                <td className="p-3">
                  {
                    fee
                      .studentId
                      ?.phone
                  }
                </td>

                <td className="p-3">
                  <Button
                    size="sm"
                    onClick={() =>
                      sendReminder(
                        fee.studentId
                      )
                    }
                  >
                    WhatsApp Reminder
                  </Button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    )}
  </div>
</div>

);
}
