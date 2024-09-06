const Task = require("../models/task");

// Function to create a new task
const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        // Create and save the task
        await Task.create({
            title,
            description,
            user: req.user
        });

        res.status(200).json({
            success: true,
            message: "Task added successfully"
        });
    } catch (error) {
        next(error); 
    }
}

// to get tasks of the logged-in user
const userTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        // Find tasks that belong to the logged-in user and populate the user's name
        const tasks = await Task.find({ user: userId })
            .select('title description isCompleted createdAt') 
            .populate('user', 'name'); 

        // Check if the user has any tasks
        if (tasks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No tasks found for this user."
            });
        }

        // Return the tasks
        res.status(200).json({
            success: true,
            TotalTasks: tasks.length,
            tasks
        });
    } catch (error) {
        next(error);
    }
};


// update tasks
const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        task.iscompleted = !task.iscompleted;
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated",
        });
    } catch (error) {
        next(error); 
    }
};

// delete task
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found",
            });
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted",
        });
    } catch (error) {
        next(error); 
    }
};


// Exporting the functions
module.exports = {
    newTask,
    userTask,
    updateTask,
    deleteTask
};
