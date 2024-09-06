const jwt = require("jsonwebtoken");
const User = require('../models/user');
const isAuth = async (req,res,next)=>{

    const { token } = req.cookies;
    console.log(token)

   if (!token) {
    return res.status(408).json({
        success: false,
        message: "Please Login"
    });
}
 const decoded = jwt.verify(token,process.env.JWT_SECRET)
 req.user = await User.findById(decoded._id);
 next()
}
module.exports = isAuth;