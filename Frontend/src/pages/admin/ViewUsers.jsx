import React, { useState } from 'react'
import axios from 'axios'
import {useEffect} from "react"
import "./ViewUser.css"

function ViewUsers() {

    const [allUser,setallUser] = useState({})
    const [filterUserInput,setfilterUserInput] = useState('')
    const [userFilterData,setuserFilterData] = useState([])
    const [message,setMessage] = useState('')
    const token = localStorage.getItem("token")
    
    const userArray = Object.values(allUser)

    useEffect(() => {
      axios.get("http://localhost:3007/admin/allUsers",{headers:{Authorization:`Bearer ${token}`}})
      .then(result => {
        if(result.data.message === "All users found" && result.data.result.length > 0 ){
            console.log("Fetch Users:",result.data)
            setallUser(result.data.result)
        }
      })
      .catch(err => {
          console.log("Error:",err)
          if(err?.response?.data?.message === "No user found"){
            console.log(err.message)
             setMessage("No user found!")
          }
      })
    },[])

    const handleFilterUser = (e) => {
       const namesFilter = e.target.value.toLowerCase();
       setfilterUserInput(namesFilter);

       const filteredUser = userArray.filter(item =>  item.name.toLowerCase().includes(namesFilter))
       setuserFilterData(filteredUser)
    }

       useEffect(() => {
         if(message){
             const timeout = setTimeout(() => setMessage(''), 3000);
           return () => clearTimeout(timeout);
         }
       },[message])
    

  return (
    <>
   <div className="message-container">
    {message && <h2 style = {{color: message.startsWith("✅") ? "#4CAF50" : "red"}}  className="message">
      {message}</h2>}
    </div> 
    <div className='mainContent'>
    <input type = "text" className='inputField' value={filterUserInput} onChange={handleFilterUser} placeholder='Search User...'/>
    <div className='table-container'>
        <table className='table'>
            <thead>
                <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
             {(filterUserInput.trim() ? userFilterData :userArray).map((value,index) => (
              <tr key = {index}>
                <td>{value.name}</td>
                <td>{value.email}</td>
                <td>{value.role}</td>
              </tr>
             ))}
            </tbody>
        </table>
    </div>
    </div>
    </>
  )
}

export default ViewUsers
