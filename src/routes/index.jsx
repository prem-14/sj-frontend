import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Login from '@/views/Login'
import Dashboard from '@/views/Dashboard'
// import PrivateRoute from './privateRoute'
import User from '@/views/User'
import Package from '@/views/Package'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}

        {/* <Route element={<PrivateRoute />}> */}
        <Route path='/' element={<User />} />
        <Route path='/packages' element={<Package />} />
        <Route path='*' element={<Dashboard />} />

        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
