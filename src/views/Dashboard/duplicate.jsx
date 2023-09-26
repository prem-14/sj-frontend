import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { allCategories } from '@/assets/sampledata/categories'

const DashboardManage = () => {
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
      type: 'date',
      name: 'date',
      label: 'Date',
      class: 'col-12 col-sm-4',
      min: '2018-01-01',
      max: '2018-12-31',
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
  ])

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

  const badgeValues = [
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
      type: 'date',
      name: 'date',
      label: 'Date',
      class: 'col-12 col-sm-4',
      min: '2018-01-01',
      max: '2018-12-31',
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
  ]

  console.log(formik.values.parent)
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
          },
        ])
        badgeValues.push({
          label: 'Sub Category',
          type: 'select',
          class: `col-12 col-sm-4`,
          name: 'subCategory',
          options: data,
        })
        console.log(badgeValues)
        setChange(true)
      }
    }
  }, [formik.values.parent])

  console.log(badgeValues)

  return (
    <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
      <div className='row'>{inputData(formik, badgeValues)}</div>

      <Button variant='contained' color='primary' type='submit' sx={{ marginLeft: '1rem' }}>
        Submit
      </Button>
    </form>
  )
}

export default DashboardManage
