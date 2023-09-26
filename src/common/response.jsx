import { alertActions } from '@/store/slice/alert'

const getAlertMessage = (data) => {
  const notification = {}
  if (data?.status) {
    if (data.status === 'success') {
      notification['message'] = data.data.message || 'Success'
      notification['type'] = 'success'
    } else if (data.status === 'error' || data.status === 'fail') {
      notification['message'] = data.data.message || 'Error'
      notification['type'] = 'error'
    }
  }
  return notification
}

const commonErrorResponse = (dispatch, err, alert = 1) => {
  if (alert && err?.name !== 'CanceledError') {
    dispatch(
      alertActions.showAlertNotification({
        open: true,
        message: err?.data?.data?.message || 'Something went wrong',
        type: 'error',
      })
    )
  }
}

const commonResponse = (dispatch, data, alert = 1) => {
  const { message, type } = getAlertMessage(data)

  if (message && type) {
    if (alert) {
      dispatch(
        alertActions.showAlertNotification({
          open: true,
          message: message,
          type: type,
        })
      )
    }
  }
}

const apiStatusResponse = (dispatch, res, alert = 1) => {
  if (res?.data?.status) {
    commonResponse(dispatch, res.data, alert)
  } else {
    commonErrorResponse(dispatch, res, alert)
  }
}

export { commonErrorResponse, commonResponse, apiStatusResponse }
