const express = require("express")
const router = express.Router();

//  helper functions
const { getAllTasks, createTask, getTask, updateTask, deleteTask } = require("../controllers/tasks");

// get all tasks and create tasks (routers chained since routers use the same path. )
router.route("/").get(getAllTasks).post(createTask);
// 'get task', 'update task' and 'delete task' routers chained since they use same path 
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;