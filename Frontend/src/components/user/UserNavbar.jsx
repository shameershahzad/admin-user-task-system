import React,{useState,useEffect} from 'react'
import "./userNavbar.css"
import { useNavigate,NavLink,useParams } from 'react-router-dom'
import axios from 'axios'

function UserNavbar() {

  const [userName,setuserName] = useState(null)
  const {email} = useParams()
  const token = localStorage.getItem("token")

  
  const nav = useNavigate()

  const logOutBtn = () => {
    localStorage.removeItem("token")
    console.log("Token deleted!")
    nav("/")
  } 

    useEffect(() => {
     axios.get(`http://localhost:3007/user/userName/${email}`,{headers:{Authorization:`Bearer ${token}`}})
     .then(res => {
      console.log(res.data[0])
      setuserName(res.data[0])
     }).catch(err => console.log("Error:",err))
  },[email])

  return (
    <>
    <div className='nav-div'>
  <img src="/Task_Logo.ico" alt="App Icon" width={40} height={37}  style={{ marginTop:"-13px",marginLeft:"9px" }}  />
      <h1 style = {{marginLeft:"-286px",marginTop:"10px", color: "#00363a",fontWeight:"bold"}}><i>Taskity</i></h1>
        <div className='link-div'>
      <NavLink className={({isActive }) => isActive? "nav-link active" : "nav-link"} to = {`/userDashboard/${email}`}>Dashboard</NavLink>
      <NavLink className={({isActive }) => isActive? "nav-link active" : "nav-link"} to={`/myTask/${email}`}>My Task</NavLink>
        </div>
        <div className='dashBoardHeader'>
    {userName && <p style = {{marginTop:"2px"}} className='userName'>👤{userName.name}</p> }
        <button onClick = {logOutBtn} className='logout-button' >Logout</button>
        </div>
    </div>
    </>

  )
}

export default UserNavbar
