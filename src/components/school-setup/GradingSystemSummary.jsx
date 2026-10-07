import {
  Award,
  Layers,
  Target,
  Search,
} from "lucide-react";


import SummaryCard from "./SummaryCard";



export default function GradingSystemSummary({

  totalSystems = 0,

  totalGrades = 0,

  averagePassMark = 0,

  totalResults = 0,

}) {


  return (

    <div
      className="
      grid
      gap-5

      sm:grid-cols-2

      xl:grid-cols-4
      "
    >


      {/* =====================================
          TOTAL SYSTEMS
      ===================================== */}


      <SummaryCard

        title="Grading Systems"

        value={totalSystems}

        subtitle="Configured systems"

        icon={Award}

      />





      {/* =====================================
          TOTAL GRADES
      ===================================== */}


      <SummaryCard

        title="Grade Rules"

        value={totalGrades}

        subtitle="Score ranges configured"

        icon={Layers}

      />






      {/* =====================================
          PASS MARK
      ===================================== */}


      <SummaryCard

        title="Average Pass Mark"

        value={`${averagePassMark}%`}

        subtitle="Across grading systems"

        icon={Target}

      />







      {/* =====================================
          SEARCH RESULTS
      ===================================== */}


      <SummaryCard

        title="Showing"

        value={totalResults}

        subtitle="Matching systems"

        icon={Search}

      />



    </div>

  );

}