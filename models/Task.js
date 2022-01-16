const mongoose = require("mongoose");


// task object 
const taskObject = {
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
            maxlength: [20, "name can\'t have more than 20 characters"],
            minlength: [3, "can\'t have less than 3 characters"]
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
    }
    // task schema 
const TaskSchema = new mongoose.Schema(taskObject)
module.exports = mongoose.model('Task', TaskSchema);