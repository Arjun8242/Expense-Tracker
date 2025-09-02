import React from "react";
import { LuArrowRight } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";
import moment from "moment";

const RecentIncome = ({ transactions, onSeeMore }) => {
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="card rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h5 className="text-xl font-semibold">Recent Income</h5>
        <button
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Body */}
      <div className="mt-4 space-y-3">
        {hasTransactions ? (
          transactions.slice(0, 5).map((item, idx) => (
            <div
              key={item._id}
              className={`${
                idx !== transactions.slice(0, 5).length - 1
                  ? "border-b border-gray-100 pb-3"
                  : ""
              }`}
            >
              <TransactionInfoCard
                title={item.source}
                icon={item.icon}
                date={moment(item.date).format("Do MMM YYYY")}
                amount={item.amount}
                type="income"
                hideDeleteBtn
              />
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-6">
            No income transactions yet
          </p>
        )}
      </div>
    </div>
  );
};

export default RecentIncome;
