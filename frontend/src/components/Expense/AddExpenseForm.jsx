import React, { useState } from "react";
import Input from "../inputs/Input";
import EmojiPickerPopup from "../EmojiPickerPopup";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!expense.source || !expense.amount || !expense.date) return;
    onAddExpense(expense);
    setExpense({ source: "", amount: "", date: "", icon: "" }); // reset after submit
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
          icon={expense.icon}
          onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
        />
        <span className="text-sm text-gray-500">
          Pick an icon for this expense
        </span>
      </div>

      {/* Inputs */}
      <Input
        value={expense.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Expense Source"
        placeholder="Groceries, Rent, Utilities, etc."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="Enter amount"
        type="number"
      />

      <Input
        value={expense.date}
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
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={18} />
          Add Expense
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddExpenseForm;
