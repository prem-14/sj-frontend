import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddUserMutation, useUpdateUserMutation, useGetUserQuery } from '@/store/apis/usersApi'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './UserManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addUser, addUserResults] = useAddUserMutation()
  const [updateUser, updateUserResults] = useUpdateUserMutation()
  const {
    data: userData,
    error,
    isFetching,
  } = useGetUserQuery(
    { id: data.data._id },
    {
      skip: data.status === 'new' ? true : false,
      refetchOnMountOrArgChange: true,
    }
  )

  const formikValidation = formValidationFunc()
  const formikInitialValues = formikInitialValuesFunc(data)
  const formInputs = formInputsFunc()

  const formik = useFormik({
    initialValues: formikInitialValues,
    validateOnChange: true,
    validationSchema: formikValidation,
    onSubmit: (values) => {
      console.log(values)
      data.status === 'new' ? addUser(values) : updateUser(values)
    },
  })
  useEffect(() => {
    console.log('userData', userData)
    if (userData?.data.responseData.record) {
      fillFormikField(formik, userData?.data.responseData.record)
    }
  }, [userData])

  useEffect(() => {
    if (addUserResults.isSuccess || updateUserResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('userAction')
    }
  }, [addUserResults, updateUserResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addUserResults.isLoading || updateUserResults.isLoading}
        >
          {isFetching ? (
            <CircularProgress />
          ) : (
            <div>
              <form onSubmit={formik.handleSubmit} autoComplete='nofill'>
                <>
                  <div className='row'>{inputData(formik, formInputs)}</div>

                  <div className='flex justify-center align-center mt-20'>
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
          )}
        </FullScreenDialog>
      )}
    </div>
  )
}

export default DashboardManage
