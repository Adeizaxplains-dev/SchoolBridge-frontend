import {
  User,
  Phone,
  GraduationCap,
  IdCard,
  ShieldCheck,
  Calendar,
  Home,
  Users,
  Mail,
} from "lucide-react";

export default function StudentProfileCard({ student = {} }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-8 py-8">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_45%)]" />

        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">

          {/* Passport */}

          <div className="relative flex-shrink-0">

            {student.passport ? (
              <img
                src={student.passport}
                alt={student.name}
                className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center border-4 border-white shadow-xl">
                <User size={52} className="text-white" />
              </div>
            )}

            <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-lg">
              <ShieldCheck size={18} className="text-white" />
            </div>

          </div>

          {/* Main Info */}

          <div className="flex-1 text-white">

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

              <div>

                <h1 className="text-3xl font-bold">
                  {student.name || "Unknown Student"}
                </h1>

                <p className="mt-2 text-blue-100">
                  Student Academic Profile
                </p>

              </div>

              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur">
                <ShieldCheck size={16} />
                Active Student
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Content */}

      <div className="p-8">

        {/* Quick Stats */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            icon={<IdCard size={20} />}
            title="Admission Number"
            value={student.admissionNumber || "-"}
            color="text-blue-600"
          />

          <StatCard
            icon={<GraduationCap size={20} />}
            title="Class"
            value={student.class || "-"}
            color="text-indigo-600"
          />

          <StatCard
            icon={<Phone size={20} />}
            title="Parent Phone"
            value={student.parentPhone || "-"}
            color="text-emerald-600"
          />

          <StatCard
            icon={<Calendar size={20} />}
            title="Academic Session"
            value={student.session || "-"}
            color="text-purple-600"
          />

        </div>

        {/* Details */}

        <div className="mt-8 grid gap-6 lg:grid-cols-2">

          <Section title="Student Information">

            <InfoRow
              icon={<User size={16} />}
              label="Full Name"
              value={student.name}
            />

            <InfoRow
              icon={<IdCard size={16} />}
              label="Admission No"
              value={student.admissionNumber}
            />

            <InfoRow
              icon={<GraduationCap size={16} />}
              label="Current Class"
              value={student.class}
            />

            <InfoRow
              icon={<Calendar size={16} />}
              label="Date of Birth"
              value={student.dateOfBirth}
            />

          </Section>

          <Section title="Parent / Guardian">

            <InfoRow
              icon={<Users size={16} />}
              label="Parent Name"
              value={student.parentName}
            />

            <InfoRow
              icon={<Phone size={16} />}
              label="Phone"
              value={student.parentPhone}
            />

            <InfoRow
              icon={<Mail size={16} />}
              label="Email"
              value={student.parentEmail}
            />

            <InfoRow
              icon={<Home size={16} />}
              label="Address"
              value={student.address}
            />

          </Section>

        </div>

      </div>

    </div>
  );
}

/* ---------- Components ---------- */

function StatCard({ icon, title, value, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:shadow-md">

      <div className={`mb-3 inline-flex rounded-xl bg-white p-3 ${color}`}>
        {icon}
      </div>

      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-bold text-slate-900 break-words">
        {value || "-"}
      </h3>

    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <h2 className="mb-5 text-lg font-bold text-slate-900">
        {title}
      </h2>

      <div className="space-y-4">
        {children}
      </div>

    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 border-b border-slate-100 pb-3 last:border-none last:pb-0">

      <div className="mt-1 text-slate-400">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-xs uppercase tracking-wide text-slate-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-slate-900 break-words">
          {value || "-"}
        </p>

      </div>

    </div>
  );
}