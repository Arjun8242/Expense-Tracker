import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomLegend from "./CustomLegend";
import CustomTooltip from "./CustomTooltip";

const CustomPieChart = ({ data, label, totalAmount, showTextAnchor, colors }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-4 md:p-6">
      <ResponsiveContainer width="100%" height={380}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            strokeWidth={3}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Pie>

          {/* Tooltip & Legend */}
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />

          {/* Center Labels */}
          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-20}
                textAnchor="middle"
                className="fill-gray-500 text-sm font-medium"
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={12}
                textAnchor="middle"
                className="fill-gray-900 text-xl font-semibold"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomPieChart;
