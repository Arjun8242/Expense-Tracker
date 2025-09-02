import React, { useMemo } from "react";
import CustomLineChart from "../charts/CustomLineChart";
import { prepareExpenseBarChartData } from "../../utils/helper";

const Last30DaysExpenses = ({ data }) => {
  const chartData = useMemo(() => prepareExpenseBarChartData(data), [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800">
          Last 30 Days Expenses
        </h5>
      </div>

      <CustomLineChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
