const Joi = require("joi");

exports.createExpenseSchema = Joi.object({
  source: Joi.string().trim().min(2).required(),
  amount: Joi.number().positive().required(),
  date: Joi.date().required(),
  icon: Joi.string().optional(),
});

exports.getExpenseSchema = Joi.object({
  search: Joi.string().allow("").optional(),
  page: Joi.number().min(1).optional(),
  limit: Joi.number().min(1).max(100).optional(),
  fromDate: Joi.date().optional(),
  toDate: Joi.date().optional(),
  minAmount: Joi.number().min(0).optional(),
  maxAmount: Joi.number().min(0).optional(),
  sortBy: Joi.string().valid("latest", "highest", "lowest").optional(),
});
