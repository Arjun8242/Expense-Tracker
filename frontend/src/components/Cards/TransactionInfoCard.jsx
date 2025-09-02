import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

const TransactionInfoCard = ({
  icon,
  title,
  date,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const getAmountStyles = () =>
    type === "income"
      ? "bg-gradient-to-r from-green-100 to-green-50 text-green-600"
      : "bg-gradient-to-r from-red-100 to-red-50 text-red-600";

  return (
    <div className="group relative flex items-center gap-4 mt-3 p-4 rounded-2xl shadow-sm bg-white hover:shadow-md transition-shadow border border-gray-100">
      {/* Icon Circle */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-700 bg-gray-50 rounded-full shadow-sm">
        {icon ? (
          <span>{icon}</span>
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-between">
        {/* Title + Date */}
        <div>
          <p className="text-sm font-semibold text-gray-800">{title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{date}</p>
        </div>

        {/* Amount + Actions */}
        <div className="flex items-center gap-3">
          {/* Delete button */}
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}

          {/* Amount */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg font-medium shadow-sm ${getAmountStyles()}`}
          >
            <span className="text-sm tracking-wide">
              {type === "income" ? "+" : "-"} ${amount}
            </span>
            {type === "income" ? (
              <LuTrendingUp size={16} />
            ) : (
              <LuTrendingDown size={16} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfoCard;
