const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
//Regiser
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.json({
        success: false,
        message: "User Already exist with the same email! Please try Again",
      });
    }
    // Hash Password
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ userName, email, password: hashPassword });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registered Successful",
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return res.json({
        success: false,
        message: "User doesn't exist! please Register first",
      });
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Incorrect Password! please try again",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );
    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged in successfully",
      user: {
        email: checkUser.email,
        role: checkUser.role,
        id: checkUser._id,
      },
    });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

//logout
const logout =(req,res) =>{
  res.clearCookie('token').json({
    success: true,
    message: 'Logged out successfully!'
  })
}
//auth middleware

const authMiddleware = async(req,res,next) => {
  const token = req.cookies.token;
  if(!token) return res.status(401).json({
    success: false,
    message :  'Unauthorised user!'
  })
  try{
    const decode = jwt.verify(token,"CLIENT_SECRET_KEY");
    req.user = decode;
    next()
}
catch(error){
  res.status(401).json({
     success: false,
    message :  'Unauthorised user!'
  })
}
}

module.exports = { registerUser, loginUser,logout, authMiddleware };
