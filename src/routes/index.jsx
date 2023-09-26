import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
// import PrivateRoute from './privateRoute'
import User from '@/views/User'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='*' element={<Dashboard />} />

        {/* <Route element={<PrivateRoute />}> */}
        <Route path='/users' element={<User />} />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
