import EditIcon from '@mui/icons-material/Edit'
import BlockIcon from '@mui/icons-material/Block'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const formikInitialValuesFunc = () => {
  const formikInitialValues = {
    page: 1,
    limit: 20,
    orderby: ['id asc'],
    filters: {
      first_name: {
        value: '',
        type: 'like',
        field: 'first_name',
      },
      last_name: {
        value: '',
        type: 'like',
        field: 'last_name',
      },
    },
  }
  return formikInitialValues
}

const tableColumnsFunc = (onClickSingle) => {
  const tableColumns = [
    {
      field: 'first_name',
      type: 'string',
      headerName: 'First Name',
      width: 200,
    },
    {
      field: 'last_name',
      type: 'string',
      headerName: 'Last Name',
      width: 200,
    },
    {
      field: 'email',
      type: 'string',
      headerName: 'Email',
      width: 200,
    },
    {
      field: 'subscribed',
      type: 'boolean',
      headerName: 'Subscribed',
    },
    {
      field: 'createdAt',
      type: 'dateTime',
      headerName: 'Created On',
      width: 200,
    },
    {
      field: 'updatedAt',
      type: 'dateTime',
      headerName: 'Updated On',
      width: 200,
    },
    {
      field: 'action',
      type: 'action',
      clickType: 'edit',
      onclick: onClickSingle,
      headerName: 'Action',
      tooltipTitle: 'Edit',
      icon: <EditIcon color='secondary' />,
      MaxWidth: 200,
    },
  ]

  return tableColumns
}

const searchFormFunc = () => {
  const searchInfo = [
    {
      label: 'First Name',
      placeholder: 'Enter First name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'first_name',
      filter: true,
      onBlurEvent: true,
      onChangeEvent: false,
    },
    {
      label: 'Last Name',
      placeholder: 'Enter Last name',
      class: 'col-12 col-md-4 col-sm-6',
      type: 'text',
      name: 'last_name',
      filter: true,
      onBlurEvent: true,
      onChangeEvent: false,
    },
  ]
  return searchInfo
}

const tableActionsFunc = (onSelectMultiProducts) => {
  const tableActions = [
    {
      label: 'Move to unsubscribe',
      icon: <BlockIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: false,
    },
    {
      label: 'Move to subscribe',
      icon: <CheckCircleIcon color='secondary' />,
      onclick: onSelectMultiProducts,
      type: true,
    },
  ]
  return tableActions
}

export { tableColumnsFunc, formikInitialValuesFunc, searchFormFunc, tableActionsFunc }
