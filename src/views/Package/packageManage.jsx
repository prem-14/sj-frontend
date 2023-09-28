import FullScreenDialog from '@/components/FullScreenDialog'
import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import inputData from '@/components/inputs'
import { Button, CircularProgress } from '@mui/material'
import { useAddPackageMutation, useUpdatePackageMutation, useGetPackageQuery } from '@/store/apis/packagesApi'
import { formInputsFunc, formValidationFunc, formikInitialValuesFunc } from './PackageManageObjects'
import { fillFormikField } from '@/common/commonFunctions'

const DashboardManage = (props) => {
  const data = props.data
  const toggleFullScreenDialog = props.toggleFullScreenDialog

  const [addPackage, addPackageResults] = useAddPackageMutation()
  const [updatePackage, updatePackageResults] = useUpdatePackageMutation()
  const {
    data: packageData,
    error,
    isFetching,
  } = useGetPackageQuery(
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
      data.status === 'new' ? addPackage(values) : updatePackage(values)
    },
  })
  useEffect(() => {
    console.log('packageData', packageData)
    if (packageData?.data.responseData.record) {
      fillFormikField(formik, packageData?.data.responseData.record)
    }
  }, [packageData])

  useEffect(() => {
    if (addPackageResults.isSuccess || updatePackageResults.isSuccess) {
      toggleFullScreenDialog(false)
      props.fromComponent('packageAction')
    }
  }, [addPackageResults, updatePackageResults])

  return (
    <div>
      {data.popup && (
        <FullScreenDialog
          modaltitle={data.status === 'new' ? 'ADD NEW ' : `EDIT `}
          open={data.popup}
          handleClose={() => toggleFullScreenDialog(false)}
          loading={addPackageResults.isLoading || updatePackageResults.isLoading}
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
