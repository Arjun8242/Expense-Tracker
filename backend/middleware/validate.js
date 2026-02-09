exports.validate = (schema, property = "body") => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // collect all errors
    });

    if (error) {
      error.statusCode = 400; // bad request
      return next(error);
    }

    // overwrite request with sanitized value
    req[property] = value;
    next();
  };
};
