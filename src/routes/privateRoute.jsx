import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const { admin, accessToken } = useSelector((state) => state.auth)
  const location = useLocation()
  const exemptedRoutes = ['/changePassword']

  return accessToken && admin?.id ? (
    <>
      {admin.permissions.includes(location.pathname) || exemptedRoutes.includes(location.pathname) ? (
        <Outlet />
      ) : (
        <Navigate to='/unauthorized' state={{ from: location }} replace />
      )}
    </>
  ) : (
    <Navigate to='/' state={{ from: location }} replace />
  )
}

export default PrivateRoute
