import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { logout, setAdmin } from '../slice/auth'

const authsApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/auth`,
  }),
  endpoints(builder) {
    return {
      login: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/login',
            method: 'POST',
            body: bodyData,
            credentials: 'include',
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const adminData = await queryFulfilled
            dispatch(setAdmin(adminData.data.data))
            apiStatusResponse(dispatch, adminData)
          } catch (err) {
            console.log(err)
            // commonErrorResponse(dispatch, err)
          }
        },
      }),
      logout: builder.mutation({
        query: (bodyData) => {
          return {
            url: '/logout',
            method: 'POST',
            body: bodyData,
            credentials: 'include',
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const data = await queryFulfilled
            dispatch(logout())

            // window.history.replaceState(null, null, '/')
            window.history.pushState(null, null, '/')
            window.dispatchEvent(new Event('popstate'))

            // window.location.href = '/'
            apiStatusResponse(dispatch, data)
          } catch (err) {
            commonErrorResponse(dispatch, err)
          }
        },
      }),
      loadAdmin: builder.query({
        query: (bodyData) => {
          return {
            url: '/loadAdmin',
            method: 'GET',
            body: bodyData,
            credentials: 'include',
          }
        },
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled
            dispatch(setAdmin(data.data))
          } catch (err) {
            console.error(err)
            // commonErrorResponse(dispatch, err)
          }
        },
      }),
    }
  },
})

export const { useLoginMutation, useLogoutMutation, useLoadAdminQuery } = authsApi
export { authsApi }
