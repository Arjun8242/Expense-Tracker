import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  // Function to alternate shades of green
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#22c55e" : "#bbf7d0"; // Tailwind green-500 and green-200
  };

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-lg rounded-xl p-3 border border-gray-200">
          <p className="text-xs font-semibold text-green-600 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-900">
              ${payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mt-6">
      <h5 className="text-lg font-semibold text-gray-800 mb-4">
        Monthly Breakdown
      </h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#374151" }}
            stroke="none"
          />
          <YAxis tick={{ fontSize: 12, fill: "#374151" }} stroke="none" />

          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
