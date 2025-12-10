const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title:String,
    dueDate:Date,
    status:String,
    userEmail:String,
    description:String
})

const taskModel = mongoose.model("createTask",taskSchema)
module.exports = taskModel;