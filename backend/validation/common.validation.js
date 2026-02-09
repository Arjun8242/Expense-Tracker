const Joi = require("joi");
const mongoose = require("mongoose");

exports.objectIdSchema = Joi.string().custom((value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message("Invalid ID");
  }
  return value;
});
