import {
  Wallet,
  TrendingUp,
  TrendingDown,
  CreditCard,
} from "lucide-react";

import RevenueLineChart from "../charts/RevenueLineChart";

/* =====================================================
   FORMAT CURRENCY
===================================================== */

function formatCurrency(value = 0) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "₦0";
  }

  return `₦${amount.toLocaleString()}`;
}

/* =====================================================
   FINANCIAL OVERVIEW
===================================================== */

export default function FinancialOverview({
  financial = {},
}) {

  /* ==========================================
      NORMALIZE DATA
  ========================================== */

  const totalRevenue = Number(
    financial.totalRevenue ??
    financial.revenue ??
    0
  );

  const outstandingFees = Number(
    financial.outstandingFees ??
    financial.totalOutstanding ??
    0
  );

  const expectedRevenue = Number(
    financial.expectedRevenue ??
    (totalRevenue + outstandingFees)
  );

  const collectionRate =
    expectedRevenue > 0
      ? (
          (totalRevenue /
            expectedRevenue) *
          100
        )
      : 0;

  const monthlyRevenue =
    financial.monthlyRevenue ??
    [];

  return (

    <section
      className="
        bg-white
        rounded-3xl
        border
        border-slate-200
        shadow-sm
        overflow-hidden
      "
    >

      {/* =====================================
          HEADER
      ===================================== */}

      <div
        className="
          px-8
          py-6
          border-b
          bg-gradient-to-r
          from-emerald-50
          to-cyan-50
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-6
          "
        >

          <div>

            <h2
              className="
                text-2xl
                font-bold
                text-slate-800
              "
            >
              Financial Overview
            </h2>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Monitor revenue, fee collection,
              and financial performance.
            </p>

          </div>

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-emerald-600
              text-white
              flex
              items-center
              justify-center
            "
          >

            <Wallet size={30} />

          </div>

        </div>

      </div>

      {/* =====================================
          CONTENT
      ===================================== */}

      <div
        className="
          p-8
          space-y-8
        "
      >

        {/* =====================================
            KPI CARDS
        ===================================== */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatCard
            title="Revenue"
            value={formatCurrency(totalRevenue)}
            subtitle="Amount collected"
            icon={Wallet}
            color="emerald"
          />

          <StatCard
            title="Outstanding"
            value={formatCurrency(outstandingFees)}
            subtitle="Pending fees"
            icon={TrendingDown}
            color="red"
          />

          <StatCard
            title="Expected"
            value={formatCurrency(expectedRevenue)}
            subtitle="Projected income"
            icon={CreditCard}
            color="blue"
          />

          <StatCard
            title="Collection"
            value={`${collectionRate.toFixed(1)}%`}
            subtitle="Fee collection rate"
            icon={TrendingUp}
            color="purple"
          />

        </div>

        {/* =====================================
            REVENUE TREND
        ===================================== */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            overflow-hidden
          "
        >

          <div
            className="
              px-6
              py-5
              border-b
              border-slate-200
            "
          >

            <h3
              className="
                text-xl
                font-bold
                text-slate-800
              "
            >
              Revenue Trend
            </h3>

            <p
              className="
                mt-1
                text-slate-500
              "
            >
              Monthly revenue performance
            </p>

          </div>

          <div className="p-6">

            <RevenueLineChart
              data={monthlyRevenue}
            />

          </div>

        </div>

        {/* =====================================
            COLLECTION PROGRESS
        ===================================== */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
          "
        >

          <div
            className="
              flex
              items-center
              justify-between
              mb-4
            "
          >

            <h3
              className="
                text-lg
                font-semibold
                text-slate-800
              "
            >
              Fee Collection Progress
            </h3>

            <span
              className="
                text-xl
                font-bold
                text-emerald-600
              "
            >
              {collectionRate.toFixed(1)}%
            </span>

          </div>

          <div
            className="
              w-full
              h-4
              bg-slate-100
              rounded-full
              overflow-hidden
            "
          >

            <div
              className="
                h-full
                rounded-full
                bg-gradient-to-r
                from-emerald-500
                via-green-500
                to-cyan-500
                transition-all
                duration-700
              "
              style={{
                width: `${collectionRate}%`,
              }}
            />

          </div>

          <div
            className="
              mt-6
              grid
              grid-cols-3
              gap-4
            "
          >

            <div>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Collected
              </p>

              <h4
                className="
                  mt-1
                  font-bold
                  text-emerald-600
                "
              >
                {formatCurrency(totalRevenue)}
              </h4>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Outstanding
              </p>

              <h4
                className="
                  mt-1
                  font-bold
                  text-red-600
                "
              >
                {formatCurrency(outstandingFees)}
              </h4>

            </div>

            <div>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Expected
              </p>

              <h4
                className="
                  mt-1
                  font-bold
                  text-blue-600
                "
              >
                {formatCurrency(expectedRevenue)}
              </h4>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "emerald",
}) {
  const colors = {
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200",
    },
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-200",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      border: "border-purple-200",
    },
  };

  const theme = colors[color] || colors.emerald;

  return (
    <div
      className={`
        rounded-2xl
        border
        ${theme.border}
        bg-white
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      `}
    >
      <div className="flex items-start justify-between">

        <div className="flex-1">

          <p
            className="
              text-sm
              font-medium
              text-slate-500
            "
          >
            {title}
          </p>

          <h3
            className="
              mt-3
              text-2xl
              font-bold
              text-slate-900
              break-words
            "
          >
            {value}
          </h3>

          {subtitle && (
            <p
              className="
                mt-2
                text-sm
                text-slate-400
              "
            >
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            ${theme.bg}
            ${theme.text}
            flex
            items-center
            justify-center
            shrink-0
          `}
        >
          <Icon size={26} />
        </div>

      </div>
    </div>
  );
}