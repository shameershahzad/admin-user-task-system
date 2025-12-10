const express = require("express")
const taskModel = require("../model/taskModel")
const registerModel = require("../model/registerModel")
const verifyToken = require("../middleware/verifyToken")
const router = express.Router();


router.get("/userName/:email",verifyToken,(req,res) => {
     registerModel.find({role:"User",email:req.params.email},{name:1,_id:0})
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message:err.message }))
})

router.get("/countTaskOnDashboard/:email",verifyToken,async(req,res) => {
    try{
        const countTaskUser = await taskModel.find({userEmail:req.params.email}).countDocuments({})
        const countPendingTask = await taskModel.find({userEmail:req.params.email}).countDocuments({status:"pending"})
        const countCompleteTask = await taskModel.find({userEmail:req.params.email}).countDocuments({status:"complete"})
    
        const sendAllTask = {countTaskUser,countPendingTask,countCompleteTask}
        return res.status(200).json({result:sendAllTask})   
    }
    catch(err){
        return res.status(500).json({error:err.message})
    }    
})

router.get("/showUserTaskInCard/:email",verifyToken,async(req,res) => {
    try{
        const foundTask = await taskModel.find({userEmail:req.params.email,status:"pending"},{userEmail:0}).sort({dueDate:1})
       return res.status(200).json({result:foundTask})
    }
      catch(err){
        return res.status(500).json({error:err.message})
    }   
    
})

router.put("/updateTask/:id",verifyToken,(req,res) => {
    taskModel.findOneAndUpdate({_id:req.params.id},{status:req.body.status})
    .then(updated => res.status(200).json(updated))
    .catch(err => res.status(500).json(err))

})

module.exports = router;