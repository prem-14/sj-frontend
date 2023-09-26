import React from 'react'
import { Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { alertActions } from '@/store/slice/alert'
import Snackbar from '@mui/material/Snackbar'
import AlertTitle from '@mui/material/AlertTitle'
import Slide from '@mui/material/Slide'
import { styled } from '@mui/system'

const CustomSnackbar = styled(Snackbar)({
  '& > .MuiAlert-standard': {
    fontSize: 'unset',
    width: 'auto',
  },
})

const AlerNotification = () => {
  const dispatch = useDispatch()
  const alertNotification = useSelector((state) => state.alert.notification)

  function SlideTransition(props) {
    return <Slide {...props} direction='up' />
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(
      alertActions.showAlertNotification({
        open: false,
      })
    )
  }

  return (
    <div>
      {alertNotification?.open ? (
        <CustomSnackbar
          open={true}
          autoHideDuration={2500}
          TransitionComponent={SlideTransition}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert onClose={handleClose} severity={alertNotification.type} sx={{ width: '100%' }}>
            <AlertTitle>{alertNotification.type}</AlertTitle>
            {alertNotification.message}
          </Alert>
        </CustomSnackbar>
      ) : null}
    </div>
  )
}

export default AlerNotification
