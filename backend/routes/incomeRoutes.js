const express = require("express");
const Joi = require("joi");
const{
    addIncome,
    getAllIncome,
    deleteIncome,
    downloadIncomeExcel
} = require("../controllers/incomeController");
const {validate} = require("../middleware/validate");
const {
    createIncomeSchema,
    getIncomeSchema
} = require("../validation/income.validation");
const{protect} = require("../middleware/authMiddleware");
const {objectIdSchema} = require("../validation/common.validation");
const router = express.Router();

router.post("/add", protect, validate(createIncomeSchema), addIncome);
router.get("/get", protect, validate(getIncomeSchema, "query"), getAllIncome);
router.delete("/:id",  protect,  validate(Joi.object({id: objectIdSchema.required(),}), "params"), deleteIncome);
router.get("/downloadExcel", protect, validate(getIncomeSchema, "query"), downloadIncomeExcel);

module.exports = router;