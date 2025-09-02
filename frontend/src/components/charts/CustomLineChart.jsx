import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomLineChart = ({ data }) => {
  if (!data || data.length === 0) return null;

  // Sort by date just to be safe
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Determine trend for line color
  const last = sortedData[sortedData.length - 1]?.amount || 0;
  const secondLast = sortedData[sortedData.length - 2]?.amount || 0;
  const lineColor = last > secondLast ? "#ef4444" : "#16a34a"; // red if increasing, green if decreasing

  const gradientId = `gradient-${lineColor.replace("#","")}`;

  return (
    <div className="bg-white rounded-2xl shadow-md p-4">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={sortedData}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={lineColor} stopOpacity={0.4} />
              <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#374151" }} axisLine={false} />
          <YAxis tick={{ fontSize: 12, fill: "#374151" }} axisLine={false} />
          <Tooltip />

          <Area
            type="monotone"
            dataKey="amount"
            stroke={lineColor}
            fill={`url(#${gradientId})`}
            strokeWidth={3}
            dot={{ r: 3, fill: lineColor }}
            activeDot={{ r: 5, fill: lineColor }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};


export default CustomLineChart;
