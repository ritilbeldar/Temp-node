const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("./catchAsyncErrors");
const SuparAdmin = require("../models/suparAdmin/GymAdmin");

// Middleware to authenticate SuparAdmin using JWT token
exports.isSuparAdminAuth = catchAsyncErrors(async (req, res, next) => {
  const { suparAdminToken } = req.cookies;

  if (!suparAdminToken) {
    res.clearCookie("suparAdminToken");
    return res.redirect("/suparadmin/login");
  }

  try {
    const { id } = jwt.verify(suparAdminToken, process.env.JWT_SECRET);
    const suparAdmin = await SuparAdmin.findById(id);

    if (!suparAdmin) {
      res.clearCookie("suparAdminToken");
      return res.redirect("/suparadmin/login");
    }

    req.id = id;
    tokenSuparAdmin = req.id;
    next();
  } catch (error) {
    res.clearCookie("suparAdminToken");
    return res.redirect("/suparadmin/login");
  }
});