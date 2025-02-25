// For Admin (standard admin login)
exports.AdminSendToken = (admin, statusCode, res) => {
  try {
    const adminToken = admin.getJwtToken(); // Generate token for admin

    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      // secure: true, // Uncomment if using HTTPS
    };

    res
      .status(statusCode)
      .cookie("adminToken", adminToken, options)
      .redirect("/admin");
  } catch (error) {
    console.error("Error in AdminSendToken:", error);
    res.status(500).send("Internal Server Error");
  }
};
