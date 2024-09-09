const express = require('express');
const app = express();
const db = require('./data/database');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user');
const taskrouter = require('./routes/task')
const cors = require("cors")

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin :[process.env.FRONTEND_URL],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

// Routes
app.use('/users', userRouter);
app.use("/task", taskrouter)
app.get("/",(req,res)=>{
    res.send("hello,Welcome to TODO Application")
})

// Start server
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
