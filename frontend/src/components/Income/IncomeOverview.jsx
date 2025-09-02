import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";
import { motion } from "framer-motion";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <motion.div
      className="card bg-gradient-to-br from-green-50 to-white shadow-lg p-6 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold text-gray-800">Income Overview</h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your earnings over time and analyze income trends.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddIncome}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white text-sm font-medium shadow-md hover:bg-green-700 transition-all"
        >
          <LuPlus className="text-lg" />
          Add Income
        </motion.button>
      </div>

      {/* Chart Section */}
      <div className="mt-8 p-4 bg-white rounded-xl shadow-inner border border-gray-100">
        {chartData?.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <p className="text-center text-gray-400 py-6">
            No income data available yet.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default IncomeOverview;
