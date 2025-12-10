const mongoose = require("mongoose")
require("dotenv").config();

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("DB connected!"))
    .catch((err) => console.log("Error:",err))
}

module.exports = connectDB;