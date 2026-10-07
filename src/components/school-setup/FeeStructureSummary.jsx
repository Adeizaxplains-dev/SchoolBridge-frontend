import {
  Wallet,
  List,
  Layers3,
  Search,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

export default function FeeStructureSummary({

  totalStructures = 0,

  totalFeeItems = 0,

  totalValue = 0,

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

      {/* ==========================================
          TOTAL STRUCTURES
      ========================================== */}

      <SummaryCard

        title="Fee Structures"

        value={totalStructures}

        subtitle="Configured structures"

        icon={Layers3}

      />



      {/* ==========================================
          TOTAL FEE ITEMS
      ========================================== */}

      <SummaryCard

        title="Fee Items"

        value={totalFeeItems}

        subtitle="Charges configured"

        icon={List}

      />



      {/* ==========================================
          TOTAL VALUE
      ========================================== */}

      <SummaryCard

        title="Combined Value"

        value={`₦${Number(
          totalValue
        ).toLocaleString()}`}

        subtitle="Across all structures"

        icon={Wallet}

      />



      {/* ==========================================
          SEARCH RESULTS
      ========================================== */}

      <SummaryCard

        title="Showing"

        value={totalResults}

        subtitle="Matching results"

        icon={Search}

      />

    </div>

  );

}