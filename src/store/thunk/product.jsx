import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosAdmin } from '@/common/axios/custom'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { generateConfig } from '@/common/api'

const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, { dispatch, signal }) => {
    try {
      const controller = new AbortController()
      signal.addEventListener('abort', () => {
        controller.abort()
      })
      const response = await axiosAdmin.get('/products', {
        ...generateConfig(),
        signal: controller.signal,
      })
      apiStatusResponse(dispatch, response)
      return response.data
    } catch (e) {
      commonErrorResponse(dispatch, e)
      // throw e
    }
  }
)

export { getAllProducts }
