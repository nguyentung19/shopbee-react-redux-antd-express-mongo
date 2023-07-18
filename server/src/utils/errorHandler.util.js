const colors = require("colors/safe");
const notify = require("../configs/notify");

const errorHandler = (err, req, res, next) => {
  console.log(colors.bgRed(err.name));

  if (err.name == "CastError") {
    res.status(404).json({
      success: false,
      message: notify.ERROR_CASTERROR,
    });
  } else if (err.name == "ObjectParameterError") {
    res.status(404).json({
      succes: false,
      message: notify.ERROR_OBJECT_PARAMETER_ERROR,
    });
  } else if (err.name == "ReferenceError") {
    res.status(404).json({
      succes: false,
      message: notify.ERROR_REFERENCE_ERROR,
    });
  } else if (err.name == "TypeError") {
    res.status(404).json({
      succes: false,
      message: notify.ERROR_TYPE,
    });
  }

  res.status(500).json({
    success: false,
    message: "SERVER ERROR",
  });
};

module.exports = errorHandler;
