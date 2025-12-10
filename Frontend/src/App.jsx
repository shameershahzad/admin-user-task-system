import React from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import TokenExpire from "./authentication/TokenExpire"
import Login from './authentication/Login'
import SignUp from "./authentication/SignUp"
import ForgotPassword from './authentication/ForgotPassword'
//  ---------Admin----------
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import ViewUsers from './pages/admin/ViewUsers'
import CreateTask from './pages/admin/CreateTask'
import AllTask from './pages/admin/AllTasks'
import EditTasks from './pages/admin/EditTasks'
// ---------Users-----------
import UserDashboard from './pages/user/UserDashboard'
import UserLayout from './components/user/UserLayout'
import MyTask from './pages/user/MyTask'

function App() {
 

  return (
    <>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/forgotPassword/:email" element={<ForgotPassword />} />
      <Route path = "/signUp" element = {<SignUp />} />
      

        <Route element={<TokenExpire><AdminLayout /></TokenExpire>}>
        <Route path = "/adminDashboard/:email" element = {<AdminDashboard />} />
        <Route path = "/viewUsers" element = {<ViewUsers />} />
        <Route path = "/allTasks" element = {<AllTask />} />
        <Route path = "/createTask" element = {<CreateTask />} />
        <Route path = "/editTask/:id" element = {<EditTasks />} />
        </Route>

      <Route element={<TokenExpire><UserLayout /></TokenExpire>}>
      <Route path = "/userDashboard/:email" element = {<UserDashboard />} />
      <Route path = "/myTask/:email" element = {<MyTask />} />
      </Route>
     </Routes>  
    </>
  )
}

export default App
