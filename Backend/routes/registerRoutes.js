const express = require("express")
const registerModel = require("../model/registerModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const router = express.Router()

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registerModel.findOne({
      email,
      role: { $in: ["Admin", "User"] }
    });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ id: user._id }, "Your Secret Key", { expiresIn: "1h" });

    res.status(200).json({ message: `Login as ${user.role}`, token});
  } catch (err) {
    console.error(err);
   return res.status(500).json({ message: "Server error" });
  }
});

router.post("/verifyEmail",async(req,res) => {
    const {email} = req.body;
try{
    const foundEmail = await registerModel.findOne({email})
    if(!foundEmail){
        return res.status(404).json({message:"Email doesn't exist"})
    }
    return res.status(200).json({message:"Email found"})

}catch(err){
    return res.status(500).json({error:err.message})
}
})

router.put("/updatePassword",async(req,res) => {
    const {password} = req.body;
    try{
        const hashPassword = await bcrypt.hash(password,10)
    
         const updatePass = await registerModel.updateOne({email:req.params.email   ,password:hashPassword});
         if(updatePass){
            return res.status(200).json({message:"Password updated"})
         }
    }catch(err){
            return res.status(500).json({error:err})
    }
})

router.post("/signUp",async(req,res) => {
   try{
 const {name,email,password,role} = req.body;
 console.log("Role:",role)

  const existEmail =await registerModel.findOne({email})
  if(existEmail){
   return res.status(400).json({message:"Email already exist!"})
  }

   if (role === "Admin") {
      const adminExist = await registerModel.findOne({ role: "Admin" });

      if (adminExist) {
        return res.status(409).json({ message: "Admin already exists!" });
      }
    }
  
  const hashPassword = await bcrypt.hash(password,10)
  
  const user = await registerModel.create({
    name,email,password:hashPassword,role
});
  return res.status(200).json({result:user,message:`SignUp as ${role}`});

   }catch(err) {
   return res.status(500).json({error:err.message})
   }

})

module.exports = router;