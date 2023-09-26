import { createSlice } from '@reduxjs/toolkit'
import { getAllCustomers, addCustomer, updateCustomer, getCustomer, changeCustomerStatus } from '../thunk/dummy'

const dummySlice = createSlice({
  name: 'dummy',
  initialState: {
    allCustomers: [],
    singleCustomer: null,
    type: null,
  },
  reducers: {
    clearCustomer(state) {
      state.singleCustomer = null
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllCustomers.fulfilled, (state, action) => {
      state.type = action.type
      state.allCustomers = action.payload.responseData
    })

    builder.addCase(addCustomer.fulfilled, (state, action) => {
      state.type = action.type
    })

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.type = action.type
    })

    builder.addCase(getCustomer.fulfilled, (state, action) => {
      state.type = action.type
      state.singleCustomer = action.payload.responseData
    })

    builder.addCase(changeCustomerStatus.fulfilled, (state, action) => {
      state.type = action.type
    })
  },
})

export const { clearCustomer } = dummySlice.actions
export const dummyReducer = dummySlice.reducer
