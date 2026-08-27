import React, { useEffect, useState } from 'react'
import "./AdminNavbar.css"
import { useNavigate,NavLink} from 'react-router-dom'
import api from '../../api/axios'


function AdminNavbar() {
    const nav = useNavigate()
    const [email,setEmail] = useState("")

  const logOutBtn = () => {
    localStorage.removeItem("token")
    console.log("Token deleted!")
    nav("/")
  } 

  useEffect(() => {
    api.get("/admin/emailSendOnNavbar")
    .then(result => {
     console.log(result.data[0].email)
     setEmail(result.data[0].email)
    })
  },[])

  return (
    <>
      <div className='navDiv'>
  <img src="/Task_Logo.ico" alt="App Icon" width={40} height={37}  style={{ marginTop:"-13px" }}  />

        <h1 style = {{marginLeft:"-114px",marginTop:"10px", color: "#00363a",fontWeight:"bold"}}><i>Taskity</i></h1>
      <div className='linkDiv'>
      <NavLink className={({isActive }) => isActive? "nav-link active" : "nav-link"} to = {`/adminDashboard/${email}`}>Dashboard</NavLink>
      <NavLink className={({isActive }) => isActive? "nav-link active" : "nav-link"} to = "/viewUsers">Users</NavLink>
      <NavLink className={({isActive }) => isActive? "nav-link active" : "nav-link"} to = "/allTasks">All Tasks</NavLink>
      <NavLink className={({isActive }) => isActive? "nav-link active" : "nav-link"} to = "/createTask">Create Task</NavLink>
      </div>
      
        <button onClick = {logOutBtn} className='logout-button' >Logout</button>
        </div> 
    </>
  )
}

export default AdminNavbar
