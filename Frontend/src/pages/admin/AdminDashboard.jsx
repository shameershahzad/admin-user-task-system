import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import api from '../../api/axios'
import "./AdminDashboard.css"

function AdminDashboard() {
  const [adminName,setadminName] = useState(null)
  const [cardsData,setCardsData] = useState([])
  const {email} = useParams()



  useEffect(() => {
     api.get(`/admin/adminName/${email}`)
     .then(res => {
      console.log(res.data[0])
      setadminName(res.data[0])
     }).catch(err => console.log("Error:",err))
  },[email])

  useEffect(() => {
   api.get("/admin/showCardsOnDashboard")
    .then(result => {
      console.log(result.data.result)
      setCardsData(result.data.result)
    }).catch(err => console.log("Error:",err))
  },[email])

  return (
    <> 
    {adminName && <h1 className='welcome-heading'>Welcome,{adminName.name}</h1> }
         <div className = "cardContainer">
           <div className = "cardDiv">
            <h2>👤 Total User</h2>
           <p>{cardsData.countAllUsers}</p> 
           </div>

            <div className = "cardDiv">
            <h2>📋Total Task</h2>
            <p>{cardsData.countAllTasks}</p>
           </div>

            <div className = "cardDiv">
            <h2>⏳Pending Task</h2>
           <p>{cardsData.countPendingTask} </p> 
           </div>

            <div className = "cardDiv">
            <h2>✅Completed Task</h2>
            <p>{cardsData.countCompleteTask}</p>
           </div>
         </div>
      
    </>
  );
}



export default AdminDashboard
