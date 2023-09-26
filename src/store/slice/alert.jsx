import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
  name: 'alert',
  initialState: { notification: null },
  reducers: {
    showAlertNotification(state, action) {
      if (action.payload.open === true) {
        state.notification = {
          message: action.payload.message,
          type: action.payload.type,
          open: action.payload.open,
        }
      } else if (action.payload.open === false) {
        state.notification = null
      }
    },
  },
})

export const alertActions = alertSlice.actions

export const alertReducer = alertSlice.reducer
