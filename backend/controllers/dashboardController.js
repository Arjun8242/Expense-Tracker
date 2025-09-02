const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const last60daysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: sixtyDaysAgo },
    }).sort({ date: -1 });

    const incomeLast60Days = last60daysIncomeTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId, // ✅ fixed
      date: { $gte: thirtyDaysAgo },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    const lastTransactions = [
      ...(await Income.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)).map((txn) => ({ ...txn.toObject(), type: "income" })),
      ...(await Expense.find({ userId: userObjectId })
        .sort({ date: -1 })
        .limit(5)).map((txn) => ({ ...txn.toObject(), type: "expense" })),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    res.json({
      totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpenses: totalExpense[0]?.total || 0,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60daysIncomeTransactions,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
