import {
  Server,
  Database,
  ShieldCheck,
  HardDrive,
  Activity,
  Cloud,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const demoHealth = {
  api: {
    status: "Operational",
    uptime: "99.98%",
    color: "green",
  },
  database: {
    status: "Healthy",
    response: "24 ms",
    color: "green",
  },
  storage: {
    used: 72,
    total: "250 GB",
    color: "blue",
  },
  backup: {
    status: "Completed",
    last: "Today 02:30 AM",
    color: "green",
  },
  security: {
    status: "Protected",
    threats: 0,
    color: "green",
  },
  users: {
    active: 486,
    online: 112,
  },
};

export default function SystemHealth({
  health = demoHealth,
}) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

      {/* Header */}

      <div className="px-8 py-6 border-b bg-gradient-to-r from-slate-50 via-sky-50 to-indigo-50">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center">

            <Activity
              size={28}
              className="text-blue-600"
            />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              System Health
            </h2>

            <p className="text-slate-500 mt-1">
              Infrastructure, security and service monitoring.
            </p>

          </div>

        </div>

      </div>

      <div className="p-8">

        {/* Cards */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          <HealthCard
            title="API Status"
            value={health.api.status}
            subtitle={`Uptime ${health.api.uptime}`}
            icon={Server}
            color="green"
          />

          <HealthCard
            title="Database"
            value={health.database.status}
            subtitle={`Response ${health.database.response}`}
            icon={Database}
            color="green"
          />

          <HealthCard
            title="Security"
            value={health.security.status}
            subtitle={`${health.security.threats} Threats`}
            icon={ShieldCheck}
            color="green"
          />

          <HealthCard
            title="Cloud Backup"
            value={health.backup.status}
            subtitle={health.backup.last}
            icon={Cloud}
            color="green"
          />

          <div className="border border-slate-200 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h3 className="font-semibold text-slate-800">
                  Storage Usage
                </h3>

                <p className="text-sm text-slate-500">
                  {health.storage.total}
                </p>

              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">

                <HardDrive
                  className="text-blue-600"
                  size={24}
                />

              </div>

            </div>

            <div className="mb-3 flex justify-between">

              <span className="text-sm text-slate-500">
                Used
              </span>

              <span className="font-semibold">
                {health.storage.used}%
              </span>

            </div>

            <div className="h-4 rounded-full bg-slate-200 overflow-hidden">

              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                style={{
                  width: `${health.storage.used}%`,
                }}
              />

            </div>

          </div>

          <div className="border border-slate-200 rounded-2xl p-6">

            <h3 className="font-semibold text-slate-800 mb-6">
              Active Users
            </h3>

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm text-slate-500">
                  Logged In
                </p>

                <h2 className="text-3xl font-bold text-slate-800 mt-2">
                  {health.users.online}
                </h2>

              </div>

              <div className="text-right">

                <p className="text-sm text-slate-500">
                  Registered
                </p>

                <h2 className="text-3xl font-bold text-blue-600 mt-2">
                  {health.users.active}
                </h2>

              </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-emerald-600">

              <CheckCircle2 size={18} />

              <span className="text-sm font-medium">
                All services running normally
              </span>

            </div>

          </div>

        </div>

        {/* Overall Status */}

        <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-50 to-cyan-50 border border-emerald-200 p-6">

          <div className="flex items-center gap-4">

            <CheckCircle2
              size={36}
              className="text-emerald-600"
            />

            <div>

              <h3 className="font-bold text-lg text-slate-800">
                System Status: Healthy
              </h3>

              <p className="text-slate-600 mt-1">
                All SchoolBridge services are operating normally.
                No downtime or security incidents detected.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

/* ------------------------------------------------ */

function HealthCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) {
  const colors = {
    green:
      "bg-emerald-100 text-emerald-600",
    yellow:
      "bg-yellow-100 text-yellow-600",
    red:
      "bg-red-100 text-red-600",
  };

  return (
    <div className="border border-slate-200 rounded-2xl p-6">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-2xl font-bold mt-3 text-slate-800">
            {value}
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            {subtitle}
          </p>

        </div>

        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[color]}`}
        >
          <Icon size={28} />
        </div>

      </div>
    </div>
  );
}