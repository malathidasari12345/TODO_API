const User = require('../models/user');
const bcrypt = require('bcrypt');
const sendcookie = require('../utils/features');

// register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        sendcookie( user, res, "reistered successfully",201);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed',
            error: error.message,
        });
    }
};

// login....
const login = async (req,res,next)=>{
  try{
    const { email, password} = req.body
    let user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(401).json({
            success: false,
            message: "Invalid Email or Password"
        });
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: "Invalid Password"
        });
    }
    sendcookie(user,res,`welcome back ${user.name}`,200)
  }catch(error){
    res.status(500).json({
        success: false,
        message: 'Login failed',
        error: error.message,
    });
  }
}
// Get user 
const getUser = (req, res) => {
    const { _id: id, email, name, role } = req.user; 
    res.status(200).json({
        success: true,
        user: {  id, email,name, role }  
    });
};

// logout
const logout = (req,res)=>{
    res.status(200)
    .cookie("token","",{
        expires: new Date(Date.now()),
        samesite:process.env.Node_ENV ==="Development" ? "lax" : "none",
        secure:process.env.Node_ENV ==="Development" ? false : true
    })
    .json({
        success : true,
        message : "Loggedout Successfully"
       })
}
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    register,
    getUser,
    login,
    logout
};
