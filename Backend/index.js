const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const registerRoutes = require("./routes/registerRoutes")
const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes")

connectDB()

const app = express()


app.use(express.json())
app.use(cors())

app.use("/register",registerRoutes)
app.use("/admin",adminRoutes)
app.use("/user",userRoutes)

const port = 3007;

app.listen(port,() => {
    console.log(`Server is running at port: ${port}`)
})