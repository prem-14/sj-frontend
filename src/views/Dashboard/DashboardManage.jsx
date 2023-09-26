import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import inputData from '@/components/inputs'
import { Button } from '@mui/material'
import { allCategories } from '@/assets/sampledata/categories'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.function
  const [change, setChange] = useState()
  const [formValues, setFormValues] = useState([
    {
      label: 'Name',
      placeholder: 'Enter name',
      class: 'col-12 col-sm-6',
      type: 'text',
      name: 'name',
    },
    {
      type: 'color',
      name: 'colour',
      label: 'Badge color',
      class: 'col-12 col-sm-6',
    },
    {
      type: 'editor',
      name: 'answer',
      label: 'Answer',
      class: 'col-12',
    },
    {
      type: 'time',
      name: 'time',
      label: 'Time',
      class: 'col-12 col-sm-4',
      // min: '2018-01-01',
      // max: '2018-12-31',
    },
    {
      type: 'datetime',
      name: 'datetime',
      label: 'DateTime',
      class: 'col-12 col-sm-4',
      min: '2018-06-07T00:00',
      max: '2018-06-14T00:00',
    },
    {
      label: 'Parent Category',
      type: 'select',
      class: `col-12 col-sm-4`,
      name: 'parent',
      options: allCategories
        .filter((cat) => cat.parent_id === 0)
        .map((cat) => ({
          show: cat.name,
          value: cat.id,
        })),
    },
    {
      label: 'Parent Category',
      type: 'select1',
      class: `col-12 col-sm-4`,
      name: 'parent',
      options: allCategories
        .filter((cat) => cat.parent_id === 0)
        .map((cat) => ({
          show: cat.name,
          value: cat.id,
        })),
    },
  ])

  const formikValidation = Yup.object({
    name: Yup.string().required('Required!'),
    colour: Yup.string().required('Required!'),
  })

  const formikInitialValues = {
    id: 0,
    name: '',
    colour: '#000',
  }

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      setTimeout(() => {
        toggleFullScreenDialog(false)
      }, 2000)
    },
  })
  // https://codepen.io/WebReflection/embed/MoYoNy?
  console.log(formik.values?.datetime && new Date(formik.values?.datetime).toISOString())

  console.log(formik.values?.time)
  useEffect(() => {
    if (formik.values.parent) {
      const data = allCategories
        .filter((cat) => cat.parent_id == formik.values.parent)
        .map((cat) => ({
          show: cat.name,
          value: cat.id,
        }))
      console.log(data)
      if (data.length > 0) {
        setFormValues([
          ...formValues,
          {
            label: 'Sub Category',
            type: 'select',
            class: `col-12 col-sm-4`,
            name: 'subCategory',
            options: data,
            parent_id: formik.values.parent,
          },
        ])
      }
    }
  }, [formik.values.parent])

  console.log(formValues)

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
        >
          <div className='addUserModal'>
            <div className='fspBody'>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>{inputData(formik, formValues)}</div>

                  <div className='flex justify-center align-center mt-10'>
                    <Button variant='contained' color='secondary' onClick={() => toggleFullScreenDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant='contained' color='primary' type='submit' sx={{ marginLeft: '1rem' }}>
                      Submit
                    </Button>
                  </div>
                </>
              </form>
            </div>
          </div>
        </FullScreenDialog>
      )}
    </div>
  )
}

export default DashboardManage
