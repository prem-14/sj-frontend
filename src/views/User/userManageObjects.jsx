import * as Yup from 'yup'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    subscribed: false,
  }
  return formikInitialValues
}

const formValidationFunc = () => {
  const formValidation = Yup.object({
    first_name: Yup.string().required('Required!'),
    last_name: Yup.string().required('Required!'),
    email: Yup.string().email().required('Required!'),
    subscribed: Yup.boolean().required('Required!'),
  })
  return formValidation
}

const formInputsFunc = () => {
  const formInput = [
    {
      label: 'First name *',
      placeholder: 'Enter first name',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'first_name',
    },
    {
      label: 'Last name *',
      placeholder: 'Enter first name',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'last_name',
    },
    {
      label: 'Email *',
      placeholder: 'Enter email',
      class: 'col-sm-6 col-12',
      type: 'text',
      name: 'email',
    },
    {
      title: 'Subscribed',
      type: 'radio',
      name: 'subscribed',
      class: 'col-sm-6 col-md-4 col-12',
      item: [
        { id: true, description: 'Yes' },
        { id: false, description: 'No' },
      ],
    },
  ]

  return formInput
}

export { formikInitialValuesFunc, formInputsFunc, formValidationFunc }
