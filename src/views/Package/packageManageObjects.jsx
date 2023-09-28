import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    name: '',
    price: '',
    description: '',
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    name: Yup.string().required('Required!'),
    price: Yup.number().required('Required!'),
    description: Yup.string(),
  })
  return formValidation
}

const formInputsFunc = () => {
  const formInput = [
    {
      label: 'Name *',
      placeholder: 'Enter package name',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'name',
    },
    {
      label: 'Price *',
      placeholder: 'Enter price',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'price',
    },
    {
      label: 'Description',
      placeholder: 'Enter description',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'description',
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
