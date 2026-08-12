import React, { useEffect, useState } from 'react'
import "./CreateTask.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function CreateTask() {
  const [fetchUser,setfetchUser] = useState([])
  const [title,setTitle] = useState('')
  const [dueDate,setdueDate] = useState('')
  const [description,setDescription] = useState('')
  const [userEmail,setuserEmail] = useState('')
  const [status] = useState("pending")
  const [message,setMessage] = useState('')
  

  const nav = useNavigate()

  const token = localStorage.getItem("token")

   useEffect(() => {
    
    axios.get("http://localhost:3007/admin/sendUseronCreateTask",{headers:{Authorization:`Bearer ${token}`}})
    .then(result => {
      console.log(result.data.result)
      setfetchUser(result.data.result)
    }).catch(err => {
      console.log("Error:",err)
    })

   },[])

   const handleSubmit = (e) => {
    e.preventDefault()
     if(!title || !dueDate || !userEmail || !description){
      setMessage("All fields required!")
     } 
     else{
      const sendTask = {title,dueDate,userEmail,status,description}
      axios.post("http://localhost:3007/admin/createTask",sendTask,{headers:{Authorization:`Bearer ${token}`}})
      .then(result => {
        console.log("Result:",result)
        if(result.data.message === "Task added!"){
          setMessage("✅ Task added!")
          setTimeout(() => {
            nav("/allTasks")
          },1000)
        }
        else{
          setMessage("Task not added")
        }
      })
      .catch((err) => console.log("Error:",err))
     }   
   }

     useEffect(() => {
     if(message){
         const timeout = setTimeout(() => setMessage(''), 3000);
       return () => clearTimeout(timeout);
     }
   },[message])

  return (
    <>
      {message && <h2 style = {{textAlign:"center",marginTop:"80px",
    color: message.startsWith("✅") ? "#4CAF50" : "red"}}>{message}</h2>}
    <div className='taskDiv'>
    <h1>Create Task</h1>
    <form onSubmit = {handleSubmit}>
      <div className='Input_Group'>
        <label>Title:</label>
       <input type = "text" placeholder='Enter title here...' value = {title} onChange={(e) => setTitle(e.target.value)} />
       </div>
       <div className='Input_Group' >
        <label>Due Date:</label>
       <input type = "date" value = {dueDate} onChange={(e) => setdueDate(e.target.value)} />
       </div>

       <div className='Input_Group'>
       <label>Status</label>
       <input type = "text" value = {status} readOnly />
       </div>
       <div className='Input_Group'>
       <label>Select User:</label>
       <select style={{cursor:"pointer",width:"99%"}} value = {userEmail} onChange={(e) => setuserEmail(e.target.value)}>
       <option value="" disabled >Select User</option>
       {fetchUser.map((user,index) => (
        <option key = {index} value =  {user.email}>{user.email}</option>
       ))}
       </select>
       </div>
       <div className='Input_Group'>
       <label>Description</label>
       <textarea placeholder='Description of task write here...' value = {description} onChange={(e) => setDescription(e.target.value)}/>
       </div>
       <button type = "submit">Add Task</button>
    </form>
    </div>
    </>
  )
}

export default CreateTask
