import {
  CheckCircle2,
  Clock3,
  FileText,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function ResultTimeline({ result }) {
  const steps = [
    {
      title: "Result Created",
      date: result?.createdAt,
      completed: true,
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Approved",
      date: result?.approvedAt,
      completed:
        result?.status === "approved" ||
        result?.status === "published" ||
        result?.approved === true,
      icon: ShieldCheck,
      color: "bg-green-500",
    },
    {
      title: "Published",
      date: result?.publishedAt,
      completed:
        result?.status === "published",
      icon: CheckCircle2,
      color: "bg-purple-500",
    },
    {
      title: "Sent To Parent",
      date: result?.sentAt,
      completed:
        result?.sent === true,
      icon: Send,
      color: "bg-emerald-500",
    },
  ];

  const formatDate = (date) => {
    if (!date) return "Pending";

    return new Date(date).toLocaleString(
      "en-NG",
      {
        dateStyle: "medium",
        timeStyle: "short",
      }
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border">

      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Result Timeline
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Complete lifecycle of this result.
        </p>
      </div>

      <div className="p-6">

        <div className="space-y-6">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="flex gap-4"
              >

                {/* Timeline */}

                <div className="flex flex-col items-center">

                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-white ${
                      step.completed
                        ? step.color
                        : "bg-gray-300"
                    }`}
                  >
                    <Icon size={20} />
                  </div>

                  {index <
                    steps.length - 1 && (
                    <div
                      className={`w-1 flex-1 mt-2 rounded ${
                        step.completed
                          ? "bg-green-300"
                          : "bg-gray-200"
                      }`}
                    />
                  )}

                </div>

                {/* Content */}

                <div className="flex-1 pb-6">

                  <div className="flex justify-between items-center">

                    <h3 className="font-semibold text-gray-900">
                      {step.title}
                    </h3>

                    {step.completed ? (
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        Completed
                      </span>
                    ) : (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center gap-1">
                        <Clock3 size={12} />
                        Pending
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    {formatDate(step.date)}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}