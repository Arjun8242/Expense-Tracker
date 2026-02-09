const xlsx = require("xlsx");
const Expense = require("../models/Expense");
const logger = require("../utils/logger");

exports.addExpense = async (req, res) => { logger.info("User:", req.user);
    logger.info("Body:", req.body);

    const userId = req.user.id;
    try {
        const { icon, source, amount, date } = req.body;

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
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;

    const {
    search = "",
    page = 1,
    limit = 5,
    fromDate,
    toDate,
    minAmount,
    maxAmount,
    sortBy = "latest", // latest | highest | lowest
  } = req.query;

    try {

        const query = { userId };

        /* 🔍 Search filter */
        if (search.trim()) {
        query.source = { $regex: search.trim(), $options: "i" };
        }

        /* 📅 Date range filter */
        if (fromDate || toDate) {
        query.date = {};
        if (fromDate) query.date.$gte = new Date(fromDate);
        if (toDate) query.date.$lte = new Date(toDate);
        }

        /* 💰 Amount range filter */
        if (minAmount || maxAmount) {
        query.amount = {};
        if (minAmount) query.amount.$gte = Number(minAmount);
        if (maxAmount) query.amount.$lte = Number(maxAmount);
        }

        /* ↕ Sorting */
        let sortQuery = { date: -1 }; // default latest
        if (sortBy === "highest") sortQuery = { amount: -1 };
        if (sortBy === "lowest") sortQuery = { amount: 1 };

        const skip = (Number(page) - 1) * Number(limit);

        const expenses = await Expense
        .find(query)
        .sort(sortQuery)
        .skip(skip)
        .limit(Number(limit));

        const totalExpenses = await Expense.countDocuments(query);

        return res.status(200).json({
          expenses,
          currentPage: Number(page),
          totalPages: Math.ceil(totalExpenses / limit),
          totalExpenses,
        });
    } catch (error) {
        logger.error(error);
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
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
