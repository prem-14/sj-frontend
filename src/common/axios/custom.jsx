import axios from 'axios'

const axiosAdmin = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin`,
  headers: {
    Accept: 'application/json',
  },
})

export { axiosAdmin }
