import { createSlice } from '@reduxjs/toolkit'
import { getAllProducts } from '../thunk/product'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    isLoading: false,
    data: [],
    error: null,
    type: null,
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.type = action.type // product/getAllProducts/fulfilled
      state.data = action.payload
    })
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  },
})

export const productReducer = productSlice.reducer
