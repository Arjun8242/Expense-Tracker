const express = require("express");
const Joi = require("joi");
const{
    addExpense,
    getAllExpense,
    deleteExpense,
    downloadExpenseExcel
} = require("../controllers/expenseController");
const {validate} = require("../middleware/validate");
const {
    createExpenseSchema,
    getExpenseSchema
} = require("../validation/expense.validation");
const{protect} = require("../middleware/authMiddleware");
const {objectIdSchema} = require("../validation/common.validation");
const router = express.Router();

router.post("/add", protect, validate(createExpenseSchema), addExpense);
router.get("/get", protect, validate(getExpenseSchema, "query"), getAllExpense);
router.delete("/:id", protect, validate(Joi.object({id: objectIdSchema.required(),}), "params"), deleteExpense);
router.get("/downloadExcel", protect, validate(getExpenseSchema, "query"), downloadExpenseExcel);

module.exports = router;