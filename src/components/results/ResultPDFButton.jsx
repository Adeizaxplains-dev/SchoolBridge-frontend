import { useState } from "react";
import API from "../../services/api";

import { assetUrl } from "../../services/api";

export default function ResultPDFButton({ resultId }) {
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/results/pdf/${resultId}`
      );

      console.log(
        "PDF RESPONSE:",
        res.data
      );

      if (!res.data.success) {
        alert("PDF generation failed");
        return;
      }

      const pdfUrl = assetUrl(res.data.pdfUrl);

      console.log("OPENING:", pdfUrl);

     window.location.href = pdfUrl;
    } catch (error) {
      console.error(
        "PDF Error:",
        error
      );

      alert(
        "Failed to generate PDF"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={generatePDF}
      disabled={loading}
      className="
        bg-red-600
        hover:bg-red-700
        text-white
        px-4
        py-2
        rounded-lg
        disabled:opacity-50
      "
    >
      {loading
        ? "Generating..."
        : "Generate PDF"}
    </button>
  );
}