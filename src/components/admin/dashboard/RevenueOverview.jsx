import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Landmark,
  ArrowUpRight,
} from "lucide-react";

import RevenueLineChart from "../charts/RevenueLineChart";

/* ==========================================================
   FORMAT CURRENCY
========================================================== */

function formatCurrency(value = 0) {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return "₦0";
  }

  return `₦${amount.toLocaleString("en-NG")}`;
}

/* ==========================================================
   REVENUE OVERVIEW
========================================================== */

export default function RevenueOverview({
  financial = {},
}) {

  /* ======================================
      NORMALIZE API DATA
  ====================================== */

  const revenue =
    Number(
      financial.totalRevenue ??
      financial.revenue ??
      financial.amountReceived ??
      0
    );

  const outstandingFees =
    Number(
      financial.totalOutstanding ??
      financial.outstandingFees ??
      financial.outstanding ??
      0
    );

  const expectedRevenue =
    Number(
      financial.expectedRevenue ??
      (revenue + outstandingFees)
    );

  const collectionRate =
    expectedRevenue > 0
      ? Number(
          (
            (revenue / expectedRevenue) *
            100
          ).toFixed(1)
        )
      : 0;

  const monthlyRevenue =
    Array.isArray(financial.monthlyRevenue)
      ? financial.monthlyRevenue
      : [];

  /* ======================================
      UI
  ====================================== */

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

      {/* ======================================
          HEADER
      ====================================== */}

      <div
        className="
          relative
          overflow-hidden
          bg-gradient-to-r
          from-emerald-600
          via-green-600
          to-teal-600
          text-white
        "
      >

        <div
          className="
            absolute
            inset-0
            opacity-10
            bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]
          "
        />

        <div
          className="
            relative
            px-8
            py-8
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          "
        >

          <div className="flex items-center gap-5">

            <div
              className="
                w-20
                h-20
                rounded-3xl
                bg-white/15
                backdrop-blur-lg
                border
                border-white/20
                flex
                items-center
                justify-center
              "
            >

              <Wallet size={38} />

            </div>

            <div>

              <h2
                className="
                  text-3xl
                  font-bold
                "
              >
                Revenue Overview
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  leading-7
                  text-emerald-100
                "
              >
                Monitor revenue collection,
                outstanding fees,
                projected income and overall
                financial health of your school.
              </p>

            </div>

          </div>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-2xl
              bg-white
              text-emerald-700
              px-5
              py-3
              font-semibold
              hover:shadow-xl
              transition
            "
          >

            Financial Report

            <ArrowUpRight size={18} />

          </button>

        </div>

      </div>

      {/* ======================================
          CONTENT
      ====================================== */}

      <div
        className="
          p-8
          space-y-8
        "
      >

        {/* ======================================
            KPI CARDS
        ====================================== */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <RevenueCard
            title="Revenue Collected"
            value={formatCurrency(revenue)}
            subtitle="Fees successfully collected"
            icon={TrendingUp}
            color="emerald"
          />

          <RevenueCard
            title="Outstanding Fees"
            value={formatCurrency(outstandingFees)}
            subtitle="Pending student payments"
            icon={TrendingDown}
            color="red"
          />

          <RevenueCard
            title="Expected Revenue"
            value={formatCurrency(expectedRevenue)}
            subtitle="Target school income"
            icon={Landmark}
            color="blue"
          />

          <RevenueCard
            title="Collection Rate"
            value={`${collectionRate}%`}
            subtitle="Overall collection efficiency"
            icon={Wallet}
            color="emerald"
          />

        </div>

        {/* ======================================
            REVENUE TREND
            Part 2 starts here
        ====================================== */}

                <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            overflow-hidden
          "
        >

          {/* ======================================
              CHART HEADER
          ====================================== */}

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
              px-8
              py-6
              border-b
              border-slate-200
            "
          >

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                "
              >
                Revenue Trend
              </h3>

              <p
                className="
                  mt-2
                  text-slate-500
                  leading-7
                "
              >
                Monthly revenue performance across
                the academic session. This chart helps
                monitor collection growth, identify
                seasonal trends and forecast future
                income.
              </p>

            </div>

            <div
              className="
                grid
                grid-cols-2
                gap-4
                lg:w-auto
              "
            >

              <div
                className="
                  rounded-2xl
                  bg-emerald-50
                  border
                  border-emerald-100
                  px-5
                  py-4
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-emerald-600
                    font-semibold
                  "
                >
                  Total Revenue
                </p>

                <h4
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    text-slate-800
                  "
                >
                  {formatCurrency(revenue)}
                </h4>

              </div>

              <div
                className="
                  rounded-2xl
                  bg-blue-50
                  border
                  border-blue-100
                  px-5
                  py-4
                "
              >

                <p
                  className="
                    text-xs
                    uppercase
                    tracking-wide
                    text-blue-600
                    font-semibold
                  "
                >
                  Collection Rate
                </p>

                <h4
                  className="
                    mt-2
                    text-2xl
                    font-bold
                    text-slate-800
                  "
                >
                  {collectionRate}%
                </h4>

              </div>

            </div>

          </div>

          {/* ======================================
              LINE CHART
          ====================================== */}

          <div
            className="
              p-8
            "
          >

            {monthlyRevenue.length > 0 ? (

              <RevenueLineChart
                data={monthlyRevenue}
              />

            ) : (

              <div
                className="
                  h-80
                  rounded-3xl
                  border-2
                  border-dashed
                  border-slate-200
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                "
              >

                <Wallet
                  size={48}
                  className="text-slate-300"
                />

                <h4
                  className="
                    mt-5
                    text-xl
                    font-semibold
                    text-slate-700
                  "
                >
                  No Revenue Data
                </h4>

                <p
                  className="
                    mt-2
                    max-w-md
                    text-slate-500
                    leading-7
                  "
                >
                  Revenue analytics will appear here
                  once fee payments have been recorded
                  for this school.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* ======================================
            COLLECTION PROGRESS
            Part 3 starts here
        ====================================== */}
                {/* ======================================
            COLLECTION PROGRESS
        ====================================== */}

        <div
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-8
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            "
          >

            <div>

              <h3
                className="
                  text-2xl
                  font-bold
                  text-slate-800
                "
              >
                Fee Collection Progress
              </h3>

              <p
                className="
                  mt-2
                  text-slate-500
                  leading-7
                "
              >
                Monitor how much of the expected
                revenue has been collected across
                your school.
              </p>

            </div>

            <div className="text-right">

              <h2
                className="
                  text-5xl
                  font-black
                  text-emerald-600
                "
              >
                {collectionRate}%
              </h2>

              <p className="text-slate-500 mt-2">

                Collection Efficiency

              </p>

            </div>

          </div>

          <div
            className="
              mt-8
              h-5
              rounded-full
              bg-slate-100
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
                to-teal-500
                transition-all
                duration-1000
              "
              style={{
                width: `${collectionRate}%`,
              }}
            />

          </div>

          <div
            className="
              mt-8
              grid
              gap-6
              md:grid-cols-3
            "
          >

            <div>

              <p className="text-sm text-slate-500">
                Revenue Collected
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-emerald-600
                "
              >
                {formatCurrency(revenue)}
              </h3>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Outstanding Fees
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-red-600
                "
              >
                {formatCurrency(outstandingFees)}
              </h3>

            </div>

            <div>

              <p className="text-sm text-slate-500">
                Expected Revenue
              </p>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-bold
                  text-blue-600
                "
              >
                {formatCurrency(expectedRevenue)}
              </h3>

            </div>

          </div>

        </div>

        {/* ======================================
            FINANCIAL INSIGHTS
        ====================================== */}

        <div
          className="
            grid
            gap-6
            md:grid-cols-2
          "
        >

          <InsightCard
            icon={TrendingUp}
            title="Collection Efficiency"
            value={`${collectionRate}%`}
            description="Percentage of expected school income successfully collected."
            color="emerald"
          />

          <InsightCard
            icon={TrendingDown}
            title="Outstanding Balance"
            value={formatCurrency(outstandingFees)}
            description="Outstanding student fees requiring follow-up."
            color="red"
          />

          <InsightCard
            icon={Landmark}
            title="Projected Revenue"
            value={formatCurrency(expectedRevenue)}
            description="Estimated revenue after all pending payments are received."
            color="blue"
          />

          <InsightCard
            icon={Wallet}
            title="Financial Status"
            value={
              collectionRate >= 80
                ? "Healthy"
                : collectionRate >= 60
                ? "Moderate"
                : "Needs Attention"
            }
            description={
              collectionRate >= 80
                ? "Revenue collection is performing well."
                : collectionRate >= 60
                ? "Revenue collection should be monitored."
                : "Immediate follow-up on outstanding fees is recommended."
            }
            color={
              collectionRate >= 80
                ? "emerald"
                : collectionRate >= 60
                ? "blue"
                : "red"
            }
          />

        </div>

      </div>

    </section>

  );

}

/* ==========================================================
   REVENUE CARD
========================================================== */

function RevenueCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) {

  const colors = {
    emerald:
      "bg-emerald-100 text-emerald-600",

    red:
      "bg-red-100 text-red-600",

    blue:
      "bg-blue-100 text-blue-600",

    purple:
      "bg-purple-100 text-purple-600",

    amber:
      "bg-amber-100 text-amber-600",
  };

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
      "
    >

      <div className="flex justify-between items-start gap-4">

        <div className="flex-1 min-w-0">

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
              mt-4
              text-3xl
              font-bold
              text-slate-800
              break-words
            "
          >
            {value}
          </h3>

          <p
            className="
              mt-3
              text-sm
              text-slate-400
              leading-6
            "
          >
            {subtitle}
          </p>

        </div>

        <div
          className={`
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            flex-shrink-0
            ${colors[color] || colors.emerald}
          `}
        >

          <Icon size={30} />

        </div>

      </div>

    </div>

  );

}

/* ==========================================================
   INSIGHT CARD
========================================================== */

function InsightCard({
  icon: Icon,
  title,
  value,
  description,
  color,
}) {

  const colors = {

    emerald:
      "bg-emerald-100 text-emerald-600",

    red:
      "bg-red-100 text-red-600",

    blue:
      "bg-blue-100 text-blue-600",

    purple:
      "bg-purple-100 text-purple-600",

    amber:
      "bg-amber-100 text-amber-600",

  };

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        hover:shadow-xl
        transition-all
        duration-300
      "
    >

      <div className="flex items-start gap-5">

        <div
          className={`
            w-14
            h-14
            rounded-2xl
            flex
            items-center
            justify-center
            flex-shrink-0
            ${colors[color] || colors.emerald}
          `}
        >

          <Icon size={26} />

        </div>

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
              mt-2
              text-2xl
              font-bold
              text-slate-800
            "
          >
            {value}
          </h3>

          <p
            className="
              mt-3
              text-sm
              text-slate-500
              leading-6
            "
          >
            {description}
          </p>

        </div>

      </div>

    </div>

  );

}