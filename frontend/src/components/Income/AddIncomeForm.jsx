import React, { useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!income.source || !income.amount || !income.date) return;
    onAddIncome(income);
    setIncome({ source: "", amount: "", date: "", icon: "" }); // reset after submit
  };

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Emoji Picker */}
      <div className="flex items-center gap-3">
        <EmojiPickerPopup
          icon={income.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <span className="text-sm text-gray-500">
          Pick an icon for this income
        </span>
      </div>

      {/* Inputs */}
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance, Salary, etc."
        type="text"
      />

      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      {/* Submit Button */}
      <div className="flex justify-end pt-4">
        <motion.button
          type="button"
          onClick={handleSubmit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={18} />
          Add Income
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddIncomeForm;
