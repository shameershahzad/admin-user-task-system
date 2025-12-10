import React from 'react'
import axios from "axios"
import { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./UserDashboard.css"


function UserDashboard() {
  const [allTask,setallTask] = useState([])
  const token = localStorage.getItem("token")
  const{email} = useParams()
  const nav = useNavigate()

  useEffect(() => {
    axios.get(`http://localhost:3007/user/countTaskOnDashboard/${email}`,{headers:{Authorization:`Bearer ${token}`}})
      .then(result => {
        console.log(result.data.result)
        setallTask(result.data.result)
      })
      .catch(err => console.log("Error:",err))
  },[])
 
  return (
    <>
    <h1>User Dashboard</h1>
    
       <div className = "cardContainer">
           <div className = "cardDiv">
            <h2>📋 Total Task</h2>
           <p>{allTask.countTaskUser}</p> 
           </div>

            <div className = "cardDiv">
            <h2>⏳Pending Task</h2>
            <p>{allTask.countPendingTask}</p>
           </div>

            <div className = "cardDiv">
            <h2>✅ Complete Task</h2>
            <p>{allTask.countCompleteTask}</p>
           </div>
           </div>
           <button onClick={() => nav(`/myTask/${email}`)} className='task-btn'>Go to Task</button>
    
    </>
  )
}

export default UserDashboard
