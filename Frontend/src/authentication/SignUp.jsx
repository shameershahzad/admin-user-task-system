import React,{useState,useEffect} from 'react'
import "./SignUp.css"
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

function SignUp() {
 const [name,setName] = useState('')
 const [email,setEmail] = useState('')
 const [password,setPassword] = useState('')
 const [role,setRole] = useState('')
 const [message,setMessage] = useState('')
 
 const navigate = useNavigate()


 const handleSubmit = (e) => {
  e.preventDefault();

 
  if (!name || !email || !password || !role) {
    setMessage("All fields are required");
    return;
  }
  console.log("Role:",role)
  
  axios.post("http://localhost:3007/register/signUp", {
    name,
    email,
    password,
    role
  })
  .then(result => {
    console.log(result);
   
    if(result.data.message === `SignUp as ${role}`){
      setMessage(`✅ ${result.data.message}`);
      setTimeout(() => {
        navigate("/");
      },1500)       
    }
  })
  .catch(err => {
    console.log(err);
     if(err.response?.data?.message === "Email already exist!"){
      setMessage("Email already exist")
      setEmail("")
    }else if(err.response?.data?.message === "Admin already exists!") {
      setMessage("Admin already exist")
      setRole("")  
    }
    
    else{
      setMessage("SignUp failed!");
      setName("");
      setEmail("");
      setPassword("");
      setRole("")
    }
  });
};

   useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);
  
  return (
    <>
{message && (<h2 style={{position: "fixed", top: "4%", left: "50%", transform: "translate(-50%, -50%)",textAlign: "center",
 padding: "12px 24px", borderRadius: "8px",color: message.startsWith("✅") ? "green" : "red",}}> {message} </h2>
)}
<div className="signup-page-container">
      <div className='signUpDiv'>
       <h1 className="form-title">SignUp Page</h1>

       <form onSubmit={handleSubmit}>
        <div className='input-Group'>
        <input type = "text" placeholder='Enter name...' className='input-Field' id = "name"
        value = {name} onChange={(e) => setName(e.target.value)}/>
        <input type = "email" placeholder='Enter email...' className='input-Field' id = "email"
        value = {email} onChange={(e) => setEmail(e.target.value)}/>
        <input type = "password" placeholder='Enter password...' className='input-Field' id = "password"
        value = {password} onChange={(e) => setPassword(e.target.value)}/>
        <select className='input-Field' style={{width:"100%",cursor:"pointer"}} id = "role"
         value = {role} onChange={(e) => setRole(e.target.value)} >
          <option value="" disabled>Select role</option>
          <option value = "Admin">Admin</option>
          <option value = "User">User</option>
        </select>
        </div>
        <button type='submit' className='signUpBtn'>SignUp</button>
       </form>
        <p style={{ textAlign: "center", color: "#fff",fontSize:"17px" }}>
      Already have an account?{" "}
      <Link to="/" style={{ color: "white", textDecoration: "underline" }}>Login </Link>
    </p>
    </div>
    </div>
    </>
  )
}

export default SignUp