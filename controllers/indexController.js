const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const ErorrHandler = require("../utils/ErrorHandler");
const flash = require("express-flash");


exports.homepage = catchAsyncErrors(async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Server is running...",
    });
  } catch (error) {
    next(error);
  }
});
