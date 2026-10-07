import {
  FileEdit,
  CheckCircle2,
  Rocket,
  Send,
  Clock3,
  History,
} from "lucide-react";

export default function ResultHistoryCard({
  result = {},
}) {
  const history = [
    result?.createdAt && {
      label: "Draft Created",
      date: result.createdAt,
      icon: FileEdit,
      color: "text-gray-500",
    },

    (result?.approved ||
      result?.status === "approved" ||
      result?.status === "published" ||
      result?.status === "sent") && {
      label: "Approved",
      date: result.approvedAt,
      icon: CheckCircle2,
      color: "text-blue-600",
    },

    (result?.status === "published" ||
      result?.status === "sent") && {
      label: "Published",
      date: result.publishedAt,
      icon: Rocket,
      color: "text-green-600",
    },

    result?.sentAt && {
      label: "Sent to Parent",
      date: result.sentAt,
      icon: Send,
      color: "text-purple-600",
    },
  ].filter(Boolean);

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100">

      <div className="border-b px-6 py-4 flex items-center gap-2">

        <History size={20} className="text-blue-600" />

        <h2 className="font-bold text-lg">
          Result History
        </h2>

      </div>

      <div className="p-6">

        {history.length === 0 ? (

          <div className="text-center py-10 text-gray-500">

            <History
              size={40}
              className="mx-auto mb-3 text-gray-300"
            />

            <p>No history available.</p>

          </div>

        ) : (

          history.map((item, index) => {

            const Icon = item.icon;

            return (

              <div
                key={index}
                className="flex gap-4 mb-6 last:mb-0"
              >

                <div className="flex flex-col items-center">

                  <div
                    className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${item.color}`}
                  >

                    <Icon size={18} />

                  </div>

                  {index !== history.length - 1 && (

                    <div className="w-px flex-1 min-h-10 bg-gray-200" />

                  )}

                </div>

                <div className="flex-1">

                  <div className="font-semibold text-gray-800">

                    {item.label}

                  </div>

                  <div className="text-gray-500 text-sm mt-1 flex items-center gap-2">

                    <Clock3 size={14} />

                    {item.date
                      ? new Date(item.date).toLocaleString()
                      : "Pending"}

                  </div>

                </div>

              </div>

            );
          })

        )}

      </div>

    </div>
  );
}