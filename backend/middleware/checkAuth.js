const jwt = require("jsonwebtoken");
const admin = require("../models/admin");
require('dotenv').config();

module.exports = async(req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization.trim(); 
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    let adminEmailVerify = await admin.findOne({email : decodedToken.email});
    if(adminEmailVerify ==null){
      throw new Error("Authentication failed!");
    }else{
      req.adminData = { email: decodedToken.email };
      next();
    }
    
  } catch (err) {
    res.status(403).json({
      success: false,
      message:err.message ,
    });
  }
};
