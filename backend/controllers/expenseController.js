const xlsx = require("xlsx");
const Expense = require("../models/Expense");

exports.addExpense = async (req, res) => { console.log("User:", req.user);
    console.log("Body:", req.body);

    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;
        if(!icon || !source || !amount || !date){
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        return res.status(201).json({ message: "Expense added successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        return res.status(200).json(expenses);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expenses = await Expense.find({ userId });
        const data = expenses.map((item) => ({
            source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Expenses");
        xlsx.writeFile(workbook, "Expenses.xlsx");
        res.download('Expenses.xlsx');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
