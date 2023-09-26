import { createAsyncThunk } from '@reduxjs/toolkit'
import { axiosAdmin } from '@/common/axios/custom'
import { apiStatusResponse, commonErrorResponse } from '@/common/response'
import { generateConfig } from '@/common/api'

const getAllCustomers = createAsyncThunk('dummy/getAllCustomers', async (postData, { dispatch, signal }) => {
  try {
    const controller = new AbortController()
    signal.addEventListener('abort', () => {
      controller.abort()
    })
    const response = await axiosAdmin.post('/dummy/getAllCustomers', postData, {
      ...generateConfig(),
      signal: controller.signal,
    })
    // apiStatusResponse(dispatch, response)
    return response.data.data
  } catch (e) {
    commonErrorResponse(dispatch, e)
    // throw e
  }
})

const addCustomer = createAsyncThunk('dummy/addCustomer', async (postData, { dispatch }) => {
  try {
    const response = await axiosAdmin.post('/dummy/addCustomer', postData, {
      ...generateConfig(),
    })
    apiStatusResponse(dispatch, response)
    return response.data.data
  } catch (e) {
    commonErrorResponse(dispatch, e)
    // throw e
  }
})

const updateCustomer = createAsyncThunk('dummy/updateCustomer', async (postData, { dispatch }) => {
  try {
    const response = await axiosAdmin.post('/dummy/updateCustomer', postData, {
      ...generateConfig(),
    })
    apiStatusResponse(dispatch, response)
    return response.data.data
  } catch (e) {
    commonErrorResponse(dispatch, e)
    // throw e
  }
})

const getCustomer = createAsyncThunk('dummy/getCustomer', async (paramData, { dispatch, signal }) => {
  try {
    const controller = new AbortController()
    signal.addEventListener('abort', () => {
      controller.abort()
    })
    const response = await axiosAdmin.get('/dummy/getCustomer', {
      ...generateConfig(),
      signal: controller.signal,
      params: paramData,
    })
    return response.data.data
  } catch (e) {
    commonErrorResponse(dispatch, e)
    // throw e
  }
})

const changeCustomerStatus = createAsyncThunk('dummy/changeCustomerStatus', async (postData, { dispatch }) => {
  try {
    const response = await axiosAdmin.post('/dummy/changeCustomerStatus', postData, {
      ...generateConfig(),
    })
    apiStatusResponse(dispatch, response)
    return response.data.data
  } catch (e) {
    console.log('commonErrorResponse', e.response)
    commonErrorResponse(dispatch, e.response)
    // throw e
  }
})

export { getAllCustomers, addCustomer, updateCustomer, getCustomer, changeCustomerStatus }
