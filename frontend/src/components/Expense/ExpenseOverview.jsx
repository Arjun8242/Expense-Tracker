import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../charts/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";
import { motion } from "framer-motion";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);
  }, [transactions]);

  return (
    <motion.div
      className="card bg-gradient-to-br from-red-50 to-white shadow-lg p-6 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-xl font-semibold text-gray-800">Expense Overview</h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your expenses over time and analyze spending trends.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddExpense}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium shadow-md hover:bg-red-700 transition-all"
        >
          <LuPlus className="text-lg" />
          Add Expense
        </motion.button>
      </div>

      {/* Chart Section */}
      <div className="mt-8 p-4 bg-white rounded-xl shadow-inner border border-gray-100">
        {chartData?.length > 0 ? (
          <CustomBarChart data={chartData} />
        ) : (
          <p className="text-center text-gray-400 py-6">
            No expense data available yet.
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ExpenseOverview;
