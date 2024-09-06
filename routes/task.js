const express = require("express")
const router = express.Router()
const isAuth = require("../middlewares/auth")
const { newTask, userTask, updateTask, deleteTask } = require("../controllers/task")

//  routes...
router.post("/new", isAuth, newTask)
router.get("/all", isAuth, userTask)
router.route("/:id")
.put( isAuth,updateTask)
.delete( isAuth,deleteTask)

module.exports = router