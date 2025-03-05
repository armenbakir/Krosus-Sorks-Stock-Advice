import { useState } from "react";

type ReportProps = {
  tickers: string[];
  setTickers: (tickers: string[]) => void;
};

export default function ReportGenerator({ tickers, setTickers }: ReportProps) {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);

  const generateReport = async () => {
    if (tickers.length === 0) return;
    setLoading(true);
    setReport(null);
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tickers }),
      });
      const data = await response.json();
      setReport(data.report);
    } catch (error) {
      console.error("Error fetching report:", error);
      setReport("Error generating report.");
    } finally {
      setLoading(false);
    }
  };

  const resetData = () => {
    setTickers([]);
    setReport(null);
  };

  return (
    <div>
      <button
        onClick={generateReport}
        disabled={tickers.length === 0 || loading}
        className={`generate-button ${tickers.length > 0 ? "active" : ""}`}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
      {report && <p className="report-section">{report}</p>}
      <button onClick={resetData} className="reset-button">
        Reset Data
      </button>
    </div>
  );
}
