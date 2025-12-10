import React from 'react'
import UserNavbar from './UserNavbar'
import { Outlet } from 'react-router-dom'

function UserLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  )
}

export default UserLayout
