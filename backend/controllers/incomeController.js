const xlsx = require("xlsx");
const income = require("../models/Income");
const logger = require("../utils/logger");

exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const {icon,source,amount,date} = req.body;
        
        const newIncome = new income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        return res.status(201).json({message: "Income added successfully"});
    } catch (error) {
        logger.error(error);
        return res.status(500).json({message: "Internal server error"});
    }

};


exports.getAllIncome = async (req, res) => {
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

    const incomes = await income
      .find(query)
      .sort(sortQuery)
      .skip(skip)
      .limit(Number(limit));

    const totalIncomeCount = await income.countDocuments(query);

    return res.status(200).json({
      incomes,
      currentPage: Number(page),
      totalPages: Math.ceil(totalIncomeCount / limit),
      totalIncomeCount,
    });
  } catch (error) {
    logger.error("Income filter error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



exports.deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        await income.findByIdAndDelete(incomeId);
        return res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await income.find({ userId });
        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date
        }));

        const worksheet = xlsx.utils.json_to_sheet(data);
        const workbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(workbook, worksheet, "Incomes");
        xlsx.writeFile(workbook, "Incomes.xlsx");
        res.download('Incomes.xlsx');
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
