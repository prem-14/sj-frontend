import { logout, setAccessToken } from '@/store/slice/auth'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/`

// https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#automatic-re-authorization-by-extending-fetchbasequery
// https://codevoweb.com/react-redux-toolkit-refresh-token-authentication/

// const baseQuery = fetchBaseQuery({
//   baseUrl,
//   prepareHeaders: (headers, { getState }) => {
//     console.log('getState', getState())
//     const accessToken = getState().auth.accessToken

//     if (accessToken) {
//       headers.set('authorization', `Bearer ${accessToken}`)
//     }

//     return headers
//   },
// })

const baseQuery = (baseUrl) =>
  fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`)
      }

      return headers
    },
  })

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let tempBaseUrl = baseUrl

  if (args.parentPath === 'common') {
    tempBaseUrl = `${tempBaseUrl.replace('/admin/', '/common/')}`
  }

  let result = await baseQuery(tempBaseUrl)(args, api, extraOptions)

  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(baseUrl)(
      { url: '/auth/refreshToken', credentials: 'include' },
      api,
      extraOptions
    )
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setAccessToken(refreshResult.data.data.accessToken))
      // retry the initial query
      result = await baseQuery(tempBaseUrl)(args, api, extraOptions)
    } else {
      api.dispatch(logout())
      window.history.pushState(null, null, '/')
      window.dispatchEvent(new Event('popstate'))
      // window.location.href = '/'
    }
  }
  return result
}

export { baseQuery, baseQueryWithReauth }
