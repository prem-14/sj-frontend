import { Button } from '@mui/material'
import React from 'react'
import inputData from '../inputs'

const CustomSearch = (props) => {
  const searchInfo = props.searchInfo
  const formik = props.formik

  const handleSubmit = (e) => {
    formik.values.page = 1
    formik.handleSubmit(e)
  }
  return (
    <form onSubmit={handleSubmit} className='mb-20'>
      <div className='row'>
        {inputData(formik, searchInfo)}
        <div className='col-4'>
          <Button color='primary' variant='contained' type='submit' sx={{ marginTop: '1rem' }}>
            Search
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CustomSearch
