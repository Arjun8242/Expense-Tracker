import React from "react";
import CustomPieChart from "../charts/CustomPieChart.jsx";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];

  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Expenses", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div
      className="bg-white/70 backdrop-blur-md border border-gray-200/40 
                 shadow-md rounded-2xl p-6 transition-all duration-300 
                 hover:shadow-xl hover:scale-[1.01]"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent">
          Financial Overview
        </h5>
      </div>

      {/* Chart + Stats Layout */}
      <div className="flex items-center gap-6">
        {/* Pie Chart */}
        <div className="w-1/2">
          <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor
          />
        </div>

        {/* Stats Summary */}
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Total Balance</span>
            <span className="font-semibold text-gray-900">${totalBalance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Total Income</span>
            <span className="font-semibold text-green-600">+${totalIncome}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Total Expenses</span>
            <span className="font-semibold text-red-500">-${totalExpense}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinanceOverview;
