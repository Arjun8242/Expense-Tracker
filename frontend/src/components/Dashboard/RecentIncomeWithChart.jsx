import React, { useMemo } from "react";
import CustomPieChart from "../charts/CustomPieChart";

const COLORS = ["#00C853", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const chartData = useMemo(
    () =>
      data?.map((item) => ({
        name: item?.source,
        amount: item?.amount,
      })) || [],
    [data]
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          Last 60 Days Income
        </h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
