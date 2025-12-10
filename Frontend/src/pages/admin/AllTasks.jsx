import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./AllTasks.css"
import { useNavigate } from 'react-router-dom'

function AllTasks() {
  const [fetchTask,setfetchTask] = useState([])
  const [filterTaskInput,setFilterTaskInput] = useState('')
  const [filterTask,setfilterTask] = useState([])
  const [view,setView] = useState("pending")
  const [message,setMessage] = useState('')


  const taskArray = Object.values(fetchTask)
  const nav = useNavigate()

  const token = localStorage.getItem("token")


  const handleFilterTask = (e) => {
   const findTask = e.target.value.toLowerCase();
   setFilterTaskInput(findTask);

   const fetchTask = taskArray.filter(item => item.title.toLowerCase().includes(findTask) ||
    item.email || item.description.toLowerCase().includes(findTask) || item.status.toLowerCase().includes(findTask) ||
     new Date(item.dueDate).toLocaleDateString('en-GB').includes(findTask))
    setfilterTask(fetchTask)
  }

  const editTask = (id) => {
      const foundID = fetchTask.find(tasks => tasks._id === id)
  if(foundID){
    nav(`/editTask/${id}`)
  }
  else{
    setMessage("Task id is not found")
  }
  }

  const deleteTask = (id) => {
     axios.delete(`http://localhost:3007/admin/deleteTask/${id}`, {
    headers: {
      Authorization: `Bearer ${token}` 
    }
  })
  .then(() => {
    setMessage("✅ Task Deleted");
    setfetchTask(prev => prev.filter(item => item._id !== id));
  })
  .catch(err => {
    console.log(err);
    setMessage("Task not deleted.");
  });
  }

  useEffect(() => {
  if(message){
      const timeout = setTimeout(() => setMessage(''), 3000);
    return () => clearTimeout(timeout);
  }
},[message])

const viewPendingTask = () => {
    axios.get("http://localhost:3007/admin/allPendingTasks",{headers:{Authorizaton:`Bearer ${token}`}})
    .then(result => {
      if(result.data.message === "Task found" && result.data.result.length > 0){
        console.log(result.data.result)
        setView("pending")
         setfetchTask(result.data.result)
      }else{
        setMessage("No task found")
      }
      
    })
    .catch(err =>{
      console.log("Error:",err)
      if(err?.response?.data?.message === "No task found!"){
        setMessage("No task found")
      }
    })
}

const viewCompleteTask = () => {
     axios.get("http://localhost:3007/admin/allCompleteTasks",{headers:{Authorizaton:`Bearer ${token}`}})
    .then(result => {
      if(result.data.message === "Task found" && result.data.result.length > 0){
        console.log(result.data.result)
        setView("completed")
         setfetchTask(result.data.result)
      }else{
        setMessage("No task found")
      }
      
    })
    .catch(err =>{
      console.log("Error:",err)
      if(err?.response?.data?.message === "No task found!"){
        setMessage("No task found")
      }
    })
}

  return (
    <>
    <div className="message-container">
    {message && <h2 style = {{color: message.startsWith("✅") ? "#4CAF50" : "red"}}  className="message">
      {message}</h2>}
    </div>  
    <div className='mainContent'>
      <div className='input-button-div'>
      <button onClick={viewPendingTask}>View Pending Task</button>
      <input type = "text" className='inputField' value={filterTaskInput} onChange={handleFilterTask} placeholder='Search User...'/>
      <button onClick={viewCompleteTask}>View Complete Task Task</button>
      </div>
    <div className='table-container'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Due Date</th>
                    <th>User Email</th>
                    <th>Description</th>
                    <th>Status</th>
                     <th>{view === "pending" ? "Actions" : ""}</th>
                </tr>
            </thead>
            <tbody>
             {(filterTaskInput.trim() ? filterTask :taskArray).map((value,index) => (
              <tr key = {index}>
                <td>{value.title}</td>
                <td>{new Date(value.dueDate).toLocaleDateString('en-GB')}</td>
                <td>{value.userEmail}</td>
                <td title={value.description}>
                 {value.description.length > 40 ? value.description.substring(0, 40) + '...' : value.description}
                </td>
                <td>{value.status}</td>
                <td>
                  {
                    view === "pending" &&  <div className='action-buttons'>
                  <button onClick = {() => editTask(value._id)}>Edit</button>
                  <button  onClick = {() => deleteTask(value._id)} >Delete</button>
                  </div>
                  }
                 
                </td>
              </tr>
             ))}
            </tbody>
        </table>
    </div>
    </div>
    </>
  )
}

export default AllTasks
