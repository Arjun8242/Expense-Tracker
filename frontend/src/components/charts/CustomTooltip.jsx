import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-xl px-3 py-2 border border-gray-200">
        {/* Title */}
        <p className="text-xs font-semibold text-green-700 mb-1">
          {payload[0].name}
        </p>

        {/* Amount */}
        <p className="text-sm text-gray-700">
          Amount:{" "}
          <span className="text-sm font-semibold text-gray-900">
            ${payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
