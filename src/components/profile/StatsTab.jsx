import React from "react";
import { Link } from "react-router-dom";
import PerformanceCharts from "../PerformanceCharts";

export default function StatsTab({ stats }) {
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-200 shadow-lg p-4 sm:p-6 md:p-8">
      <PerformanceCharts stats={stats} />
      <div className="mt-8 flex justify-center">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
