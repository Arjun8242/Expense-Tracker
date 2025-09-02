const xlsx = require("xlsx");
const income = require("../models/Income");

exports.addIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const {icon,source,amount,date} = req.body;
        if(!icon || !source || !amount || !date){
            return res.status(400).json({message: "Please provide all required fields"});
        }

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
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }

};

exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
    try {
        const incomes = await income.find({ userId }).sort({ date: -1 });
        return res.status(200).json(incomes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

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
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
