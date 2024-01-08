const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/admin");


exports.login = async (req, res) => {
  try {
    const { email, password } = req.params;

    
    let existingUser;
    
    try {
      existingUser = await User.findOne({ email: email });
    } catch (err) {
      const error = new Error("Logging in failed, please try again later.");
      throw error;
    }
    
    if (!existingUser) {
      const error = new Error("Invalid credentials, could not log you in.");
      throw error;
    }
    
    let isValidPassword = false;
    try {
      // isValidPassword = await bcrypt.compare(password, existingUser.password);
      isValidPassword = password === existingUser.password;
    } catch (err) {
      const error = new Error(
        "Could not log you in, please check your credentials and try again."
        );
      throw error;
    }
    
    if (!isValidPassword) {
      const error = new Error("Invalid credentials, could not log you in.");
      throw error;
    }
    
    let token;
    try {
      token = jwt.sign(
        {email: existingUser.email },
        "supersecret_dont_share",
        // { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new Error("Logging in failed, please try again later.");
      throw error;
    }

    console.log("token : " ,token);

    res.status(201).json({
      success: true,
      email: existingUser.email,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};
