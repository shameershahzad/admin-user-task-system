import React from 'react'
import axios from "axios"
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./MyTask.css"

function MyTask() {
  const {email} = useParams()
  const [usertaskCard,setusertaskCard] = useState([])
  const [updatedTask,setupdatedTask] = useState({})
  const [message,setMessage] = useState('')
  const token = localStorage.getItem("token")

  useEffect(() => {
   axios.get(`http://localhost:3007/user/showUserTaskInCard/${email}`,{headers:{Authorization:`Bearer ${token}`}})
   .then(result => {
    if(result.data.result.length === 0){
      setMessage("No task available")
    }else{
      setMessage("")
    }
    console.log(result.data.result);
    setusertaskCard(result.data.result)
   }).catch(err => console.log("Error:",err))
  },[updatedTask])

  const updateTask = (id) => {
  
      axios.put(`http://localhost:3007/user/updateTask/${id}`,{status:updatedTask[id]},{headers:{Authorization:`Bearer ${token}`}})
        .then(result => {
          console.log(result)
          setupdatedTask(result)
          setusertaskCard([])
        }).catch(err => console.log("Error:",err))
    
  }

  return (
    <>
      <p style = {{fontSize:"25px",textAlign:"center",marginTop: "100px" }}>{message}</p>
     <div className='cardContainer'>
      {usertaskCard.map((value,index)=> (
        <div className='Card_Div' key = {index}>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
            <div style = {{display:"flex",justifyContent:"space-evenly"}}>
            <p>📅<b>{new Date(value.dueDate).toLocaleDateString('en-GB')}</b></p>
            <select  value={updatedTask[value._id] || value.status} onChange={(e) => setupdatedTask((prev) => ({...prev,
             [value._id]: e.target.value}))} >
              <option>{value.status}</option> 
              <option>complete</option>
              </select>
              </div>
            <button type = "submit" onClick={() => updateTask(value._id)}>Done</button>
        </div>
      ))}
     </div>
    </>
  )
}

export default MyTask
