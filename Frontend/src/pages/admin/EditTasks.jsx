import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom'

function EditTasks() {
    const {id} = useParams();
    const nav = useNavigate()
    const [fetchUser,setfetchUser] = useState([])
    const [message,setMessage] = useState('')
    const [editTask,seteditTask] = useState({title:"",dueDate:"",userEmail:"",status:'',description:""})
    const [originalTask,setoriginalTask] = useState({title:"",dueDate:"",userEmail:"",status:'',description:""})


    const token = localStorage.getItem("token");

       useEffect(() => {
    
    axios.get("http://localhost:3007/admin/sendUseronEditTask",{headers:{Authorization:`Bearer ${token}`}})
    .then(result => {
      console.log(result.data.result)
      setfetchUser(result.data.result)
    }).catch(err => {
      console.log("Error:",err)
    })

   },[])

    useEffect(() => {
     axios.get(`http://localhost:3007/admin/prevTask/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
 .then(res => {
    const task = res.data;
    console.log(task)
  seteditTask({
    title: task.title,
    dueDate: new Date(task.dueDate).toISOString().split('T')[0],
    userEmail:task.userEmail,
    status: task.status,
    description: task.description
  });
  setoriginalTask({
     title: task.title,
    dueDate: new Date(task.dueDate).toISOString().split('T')[0],
    userEmail:task.userEmail,
    status: task.status,
    description: task.description
  });
})

.catch(err => {
  console.log(err);
  setMessage("Failed to load task. Try Again!");
  setTimeout(() => {
    nav("/allTasks");
  },1500)
});
}, [id]);

    useEffect(() => {
       if(message){
           const timeout = setTimeout(() => setMessage(''), 3000);
         return () => clearTimeout(timeout);
       }
     },[message])


    const editData = (e) => {
    e.preventDefault();

     if(editTask.title === originalTask.title && editTask.dueDate === originalTask.dueDate && 
      editTask.userEmail === originalTask.userEmail && editTask.description === originalTask.description  ){
    setMessage("Nothing update")
    setTimeout(() => {
    nav("/allTasks")
    },1500)
  }
else{

  axios.put(`http://localhost:3007/admin/editTask/${id}`, editTask, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(() => {
    setMessage("✅ Task updated");
    setTimeout(() => {
      nav("/allTasks");
    },1500)
  })
  .catch(err => {
    console.log(err);
    setMessage("Update failed. Try Again.");
  });
}
};


  return (
    <>
      {message && <h2 style = {{textAlign:"center",marginTop:"80px",
    color: message.startsWith("✅") ? "#4CAF50" : "red"}}>{message}</h2>}
    <div className='taskDiv'>
    <h1 style={{marginLeft:"100px"}}>Edit Task</h1>
    <form onSubmit = {editData}>
      <div className='Input_Group'>
        <label>Title:</label>
       <input type = "text" placeholder='Enter title here...' value = {editTask.title} 
       onChange={(e) =>  seteditTask({...editTask,title:e.target.value})} />
       </div>
       <div className='Input_Group' >
        <label>Due Date:</label>
       <input type = "date" value = {editTask.dueDate} 
       onChange={(e) =>  seteditTask({...editTask,dueDate:e.target.value})} />
       </div>

       <div className='Input_Group'>
       <label>Status</label>
       <input type = "text" value = {editTask.status} readOnly />
       </div>
       <div className='Input_Group'>
       <label>Select User:</label>
       <select style={{cursor:"pointer",width:"99%"}} value = {editTask.userEmail} 
       onChange={(e) =>  seteditTask({...editTask,userEmail:e.target.value})}>
       <option value="" disabled >Select User</option>
       {fetchUser.map((user,index) => (
        <option key = {index} value = {user.email}>{user.email}</option>
       ))}
       </select>
       </div>
       <div className='Input_Group'>
       <label>Description</label>
       <textarea placeholder='Description of task write here...' value = {editTask.description} 
       onChange={(e) =>  seteditTask({...editTask,description:e.target.value})}/>
       </div>
       <button type = "submit">Update Task</button>
    </form>
    </div>
    </>
  )
}

export default EditTasks
