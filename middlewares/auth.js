const jwt = require("jsonwebtoken");
const { catchAsyncErrors } = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { adminToken } = req.cookies;

  if (!adminToken) {
    res.clearCookie("adminToken");
    return res.redirect("/admin/login");
  }

  try {
    const { id } = jwt.verify(adminToken, process.env.JWT_SECRET);
    const admin = await SuparAdmin.findById(id);

    if (!admin) {
      res.clearCookie("adminToken");
      return res.redirect("/admin/login");
    }

    if (admin.status === "Inactive") {
      res.clearCookie("adminToken");
      return res.redirect("/admin/login");
    }

    req.id = id;
    tokenAdmin = req.id;

    next();
  } catch (error) {
    res.clearCookie("adminToken");
    return res.redirect("/admin/login");
  }
});

