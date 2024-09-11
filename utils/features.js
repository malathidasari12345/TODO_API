const jwt = require("jsonwebtoken")

const sendcookie = (user,res,message,statuscode = 200)=>{

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  console.log(process.env.Node_ENV);
  console.log(process.env.Node_ENV ==="Development")
  
 res.status(statuscode).cookie("token", token, {
      httpOnly: true,
      samesite:process.env.Node_ENV ==="Development" ? "lax" : "none",
      secure:process.env.Node_ENV ==="Development" ? false : true
  }).json({
      success: true,
      message
  });
}
module.exports = sendcookie
