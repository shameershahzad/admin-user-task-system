import React,{useState,useEffect} from 'react'
import "./Login.css"
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom'

function Login() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [message,setMessage] = useState('')
     const navigate = useNavigate()

  
const handleSubmit = (e) => {
  e.preventDefault()
  
  axios.post("http://localhost:3007/register/",{email,password})
  .then(result => {
 
       console.log("Result",result.data);

    if(result.data.token){
      localStorage.setItem("token",result.data.token)
    }
  if(result.data.message === "Incorrect password"){
    setMessage("Password is incorrect")
    setPassword("")
  }
    
    if(result.data.message?.startsWith("Login as")){
      setMessage(`✅ ${result.data.message}`)
      setTimeout(() => {
        if(result.data.message === "Login as Admin"){
        navigate(`/adminDashboard/${email}`)
        }
        else{
           navigate(`/userDashboard/${email}`)
        }
      },1000)
    }

    
  })
  .catch(err => {
     if(err.response?.data?.message === "No user found"){
      setMessage("No user found")
      setEmail('');
      setPassword('');
    }
    else{
      setMessage("Login Failed!")
      setEmail('');
      setPassword('');
    }
  })
}


 useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);
 
  const handleForgotPass = () => {
     if(!email){
      setMessage("Please enter email to forgot password")
     }else{
        axios.post("http://localhost:3007/register/verifyEmail",{email})
        .then((result) => {
                if(result.data.message === "Email found" ){
                  navigate(`/forgotPassword/${email}`)
                }
        })
        .catch((err) => {
          if(err.response?.data?.message === "Email doesn't exist"){
            setMessage("Email doesn't exist!")
          }
        })
     }
  }

  return (
    <>
   {message && (<h2 style={{position: "fixed", top: "4%", left: "50%", transform: "translate(-50%, -50%)",textAlign: "center",
 padding: "12px 24px", borderRadius: "8px",color: message.startsWith("✅") ? "green" : "red",}}> {message} </h2>
)}
<div className="login-page-container">
    <div className='loginDiv'>
     <h1 className='form-title'>Login Page</h1> 
       <form onSubmit={handleSubmit}>
        <div className='input-group'>
        <input type = "email" placeholder='Enter email...' className='input-field' 
        value = {email} onChange={(e) => setEmail(e.target.value)}/>
        <input type = "password" placeholder='Enter password...' className='input-field'
        value = {password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <span onClick={handleForgotPass} style={{marginLeft:"65%",cursor:"pointer"}}>Forgot Password</span>
        <button type='submit' className='loginBtn'>Login</button>
       </form>
        <p style={{ textAlign: "center", color: "#fff",fontSize:"17px" }}>
      Don't have an account?
      <Link to="/signUp" style={{ color: "white", textDecoration: "underline" }}>Sign Up
      </Link>
    </p>
    </div>
    </div>
    </>
  )
}

export default Login