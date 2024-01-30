const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.trim(); 
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.adminData = { email: decodedToken.email };
    next();
  } catch (err) {
    res.status(403).json({
      success: false,
      message: "Authentication failed!",
    });
  }
};
