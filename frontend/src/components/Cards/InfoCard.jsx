import React from "react";

const InfoCard = ({ icon, label, value, color }) => {
  return (
    <div
      className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 
                 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-in-out"
    >
      {/* Icon container with gradient */}
      <div
        className={`w-16 h-16 flex items-center justify-center text-2xl text-white 
                    rounded-2xl shadow-md ${color}`}
      >
        {icon}
      </div>

      {/* Text Section */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500 tracking-wide">
          {label}
        </span>
        <span className="text-2xl font-semibold text-gray-900">
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
