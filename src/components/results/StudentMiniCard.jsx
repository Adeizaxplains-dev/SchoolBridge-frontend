import {
  User,
  Phone,
  IdCard,
} from "lucide-react";

export default function StudentMiniCard({
  student,
}) {
  return (
    <div className="flex items-center gap-4 min-w-[320px]">

      {/* Passport */}

      <div className="flex-shrink-0">

        {student?.passport ? (
          <img
            src={student.passport}
            alt={student.name}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200"
          />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">

            <User
              className="text-white"
              size={24}
            />

          </div>
        )}

      </div>

      {/* Student Info */}

      <div className="flex-1 min-w-0">

        <h3 className="font-semibold text-slate-900 text-base truncate">

          {student?.name}

        </h3>

        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">

          <IdCard size={14} />

          <span className="truncate">
            {student?.admissionNumber}
          </span>

        </div>

        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">

          <Phone size={14} />

          <span className="truncate">
            {student?.parentPhone}
          </span>

        </div>

      </div>

    </div>
  );
}