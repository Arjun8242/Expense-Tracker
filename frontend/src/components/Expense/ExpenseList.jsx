import React from "react";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";
import { LuDownload } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Expenses
        </h5>

        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-sm font-medium 
                     bg-gradient-to-r from-red-500 to-rose-600 text-white 
                     hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={onDownload}
        >
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      {/* List */}
      {transactions?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatePresence>
            {transactions.map((expense) => (
              <motion.div
                key={expense._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
              >
                <TransactionInfoCard
                  title={expense.source}
                  icon={expense.icon}
                  date={moment(expense.date).format("Do MMM YYYY")}
                  amount={expense.amount}
                  type="expense"
                  onDelete={() => onDelete(expense._id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-400">
          <LuDownload className="text-4xl mb-2 opacity-40" />
          <p className="text-sm">No expense records found.</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
