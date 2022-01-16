const Task = require("../models/Task");
const asyncMiddleware = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

// create task
const createTask = asyncMiddleware(async(req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
})


// get all tasks
const getAllTasks = asyncMiddleware(async(req, res) => {
    const all_tasks = await Task.find({});

    if (all_tasks.length < 1) return res.status(404).json({ "message": "Task database is empty. Please save some tasks" });
    res.status(200).send(all_tasks);
})


// get task
const getTask = asyncMiddleware(async(req, res) => {
    // req id in params 
    const { id: taskID } = req.params;
    // db document
    const task = await Task.findOne({ _id: taskID });
    if (!task) return res.status(404).json({ "message": "Resource could not be found" });
    res.status(200).json({ task });
})


// delete task
const deleteTask = asyncMiddleware(async(req, res) => {
    // req id in params 
    const { id: taskID } = req.params;
    // db document
    const task = await Task.findByIdAndDelete({ _id: taskID });
    if (!task) return res.status(404).json({ "message": "Resource could not be found" });
    res.status(200).json(`task with id: ${taskID} deleted successfully`);
})


// update task
const updateTask = asyncMiddleware(async(req, res) => {
    // req id in params 
    const { id: taskID } = req.params;
    // db document
    const task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ "message": "resource could not be found" });
    if (!req.body.name) return res.status(400).json({ "message": "body can\'t be empty" });
    // destructure name and isCompleted values from the req.body object
    const { name, isCompleted } = req.body
    res.status(200).json({ id: taskID, name, isCompleted, status: "success" });
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};