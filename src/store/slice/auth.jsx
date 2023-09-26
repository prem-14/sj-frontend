import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
  name: 'auth',
  initialState: { admin: null, accessToken: null },
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload.admin
      state.accessToken = action.payload.accessToken
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload
    },
    logout(state) {
      state.accessToken = null
    },
  },
})

export const { setAdmin, setAccessToken, logout } = authSlice.actions

export const authReducer = authSlice.reducer
