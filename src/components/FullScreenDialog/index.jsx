import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Slide from '@mui/material/Slide'
import { CustomAppBar } from '../StyledComponents'
import { styled } from '@mui/system'
import { LinearProgress } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paperFullScreen': {
    backgroundColor: theme.palette.background.default,
    backgroundImage: 'none',
  },
}))

export default function FullScreenDialog(props) {
  return (
    <div>
      <CustomDialog
        fullScreen
        open={props.open}
        onClose={props.handleClose}
        TransitionComponent={Transition}
        disableEnforceFocus
      >
        <CustomAppBar
          sx={{
            position: 'relative',
            backgroundColor: (theme) => theme.palette.background.variation,
            boxShadow: 'none',
          }}
        >
          <Toolbar>
            <IconButton edge='start' color='inherit' onClick={props.handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h5' component='div'>
              {props.modaltitle}
            </Typography>
          </Toolbar>
        </CustomAppBar>
        {props.loading && <LinearProgress />}
        <div className='p-20'>{props.children}</div>
      </CustomDialog>
    </div>
  )
}
