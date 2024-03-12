const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require('dotenv').config();

//models
const Events = require('../models/event');
const Admin = require("../models/admin");


exports.addAdmin = async(req , res)=>{
   try{
   let {name , email , password} = req.body;


   let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 12);
    } catch (err) {
      const error = new Error("Could not create user, please try again.");
      throw error;
    }

    try{
      let newAdmin = new Admin({name : name , email : email , password : hashedPassword})
      await newAdmin.save();
    }catch(errr){
      throw new Error("already this email are used")
    }
   res.status(200).json({
    success : true,
    message : "Successfully add newAdmin"
   })
   }catch(error){
    res.status(500).json({
      success: false,
      message: error.message,
    });
   }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.params;

    let existingAdmin;
    try {
      existingAdmin = await Admin.findOne({ email: email });
      

    } catch (err) {
      const error = new Error("Logging in failed, please try again later.");
      throw error;
    }
    
    if (existingAdmin == null) {
      const error = new Error("Invalid email");
      throw error;
    }

    
    let isValidPassword = false;
    try {
      isValidPassword = await bcrypt.compare(password, existingAdmin.password);
      // isValidPassword = password === existingAdmin.password;
    } catch (err) {
      const error = new Error(
        "Could not log you in, please check your credentials and try again."
        );
        throw error;
      }
      
      if (!isValidPassword) {
        res.status(500).json({
          success: false,
          message: "Invalid password",
        });
        
        return;
      }
      
      let token;
      try {
        token = jwt.sign(
          {email: existingAdmin.email },
          process.env.JWT_SECRET_KEY
          ,
          // { expiresIn: "1h" }
          );
        } catch (err) {
      const error = new Error("Logging in failed, please try again later.");
      throw error;
    }

    res.status(201).json({
      success: true,
      email: existingAdmin.email,
      id : existingAdmin._id,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateAdminProfile = async(req , res)=>{
  try{
  let {name , email , password} = req.body;


  // let hashedPassword;
  //  try {
  //    hashedPassword = await bcrypt.hash(password, 12);
  //  } catch (err) {
  //    const error = new Error("Could not update profile, please try again.");
  //    throw error;
  //  }

 
  await Admin.updateOne(
    {_id : req.params.id },
    // {$set : {name : name , email : email , password : hashedPassword }}
    {$set : {name : name , email : email , password : password }}
  )

  let token;
    try {
      token = jwt.sign(
        {email: email },
        process.env.JWT_SECRET_KEY
        ,
        // { expiresIn: "1h" }
      );
    } catch (err) {
      const error = new Error("update profile in failed, please try again later.");
      throw error;
    }

  res.status(200).json({
   success : true,
      email: email,
      id : req.params.id,
      token: token,
  })
  }catch(error){
   res.status(500).json({
     success: false,
     message: error.message,
   });
  }
}



exports.getAdminProfile = async(req , res)=>{
  try{
 
     let admin;
     try{
       admin = await Admin.findOne({_id : req.params.id})
     }catch(error){
      throw new Error("Invalid id")
     }

  res.status(200).json({
   success : true,
      admin : admin
  })
  }catch(error){
   res.status(500).json({
     success: false,
     message: error.message,
   });
  }
}

exports.addFirstAdmin = async(req , res)=>{
  try{
  let {name , email , password} = req.body;



  let hashedPassword;
   try {
     hashedPassword = await bcrypt.hash(password, 12);
   } catch (err) {
     const error = new Error("Could not create user, please try again.");
     throw error;
   }

   try{
     let newAdmin = new Admin({name : name , email : email , password : hashedPassword})
     await newAdmin.save();
   }catch(errr){
     throw new Error("already this email are used")
   }
  res.status(200).json({
   success : true,
   message : "Successfully add newAdmin"
  })
  }catch(error){
   res.status(500).json({
     success: false,
     message: error.message,
   });
  }
}