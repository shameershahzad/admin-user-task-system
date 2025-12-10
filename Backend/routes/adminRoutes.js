const express = require("express")
const registerModel = require("../model/registerModel")
const taskModel = require("../model/taskModel")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router()


router.get("/adminName/:email",verifyToken,(req,res) => {
     registerModel.find({role:"Admin",email:req.params.email},{name:1,_id:0})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message:err.message }))
})

router.get("/emailSendOnNavbar",verifyToken,(req,res) => {
     registerModel.find({role:"Admin"},{email:1})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message:err.message }))
})

router.get("/showCardsOnDashboard",verifyToken,async(req,res) => {
    try{
         const countAllUsers = await registerModel.countDocuments({role:"User"}) 
        
         
         const countAllTasks = await taskModel.countDocuments({})
         

         const countPendingTask = await taskModel.countDocuments({status:"pending"})
       
         const countCompleteTask = await taskModel.countDocuments({status:"complete"})
          
         const sendCardData = {countAllUsers,countAllTasks,countPendingTask,countCompleteTask}
     

         return res.status(200).json({result:sendCardData,message:"All Data Found!"})
      

    }catch(err){
            return res.status(500).json({message:err.message})

    }
})


router.get("/allUsers",verifyToken,async(req,res) => {
    try{
        const fetchUsers = await registerModel.find({role:"User"})
    
        if(!fetchUsers){
            return res.status(404).json({message:"No user found!"})
        }
        return res.status(200).json({result:fetchUsers,message:"All users found"})
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
})

router.get("/sendUseronCreateTask",verifyToken,async(req,res) => {
    try{
        const foundUser = await registerModel.find({role:"User"},{email:1,name:1});

        if(!foundUser){
            return res.status(404).json({message:"No user found"})
        }
            return res.status(200).json({result:foundUser,message:"User found"})

    }
    catch(err){
            return res.status(500).json({message:err.message})
    }
})

router.get("/sendUseronEditTask",verifyToken,async(req,res) => {
    try{
        const foundUser = await registerModel.find({role:"User"},{email:1});

        if(!foundUser){
            return res.status(404).json({message:"No user found"})
        }
            return res.status(200).json({result:foundUser,message:"User found"})

    }
    catch(err){
            return res.status(500).json({message:err.message})
    }
})

router.post("/createTask",verifyToken,async(req,res) => {
    try{
        const addTask = await taskModel.create(req.body)
         
        if(!addTask){
                return res.status(404).json({message:"No task added!"})
        }
         return res.status(200).json({result:addTask,message:"Task added!"})
    }
    catch(err){
            return res.status(500).json({message:err.message})
    }     
})

router.get("/allPendingTasks",async(req,res) => {
    try{
        const fetchTasks = await taskModel.find({status:"pending"})
    
        if(!fetchTasks){
            return res.status(404).json({message:"No task found!"})
        }
        return res.status(200).json({result:fetchTasks,message:"Task found"})
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
})

router.get("/allCompleteTasks",async(req,res) => {
    try{
        const fetchTasks = await taskModel.find({status:"complete"})
    
        if(!fetchTasks){
            return res.status(404).json({message:"No task found!"})
        }
        return res.status(200).json({result:fetchTasks,message:"Task found"})
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }
})

router.get("/prevTask/:id",verifyToken, (req, res) => {
  const { id } = req.params;
 
  taskModel.findOne({_id:id})   
    .then(result => {
      if (!result) {
        return res.status(404).json({ message: "Task not found" });
      }
      return res.json(result);
    })
    .catch(err => res.status(500).json({ error: err.message }));
});

router.put("/editTask/:id", verifyToken, (req, res) => {
  taskModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body // update data you send from frontend
  )
    .then(updated => res.json(updated))
    .catch(err => res.status(500).json(err));
});

router.delete("/deleteTask/:id",verifyToken,(req,res) => {
     taskModel.findOneAndDelete({ _id: req.params.id})
        .then(deleted => res.json({ message: "Task deleted successfully", deleted }))
        .catch(err => res.status(500).json(err));
})



module.exports = router;