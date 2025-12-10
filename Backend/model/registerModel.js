const mongoose = require("mongoose")

const registerSchema = new mongoose.Schema({
    name:String,
    email:String,
    role:String,
    password:String
})

const registerModel = mongoose.model("register",registerSchema)
module.exports = registerModel;