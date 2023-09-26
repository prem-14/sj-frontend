import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { styled } from '@mui/system'

const StyledDialog = styled(Dialog)(({ theme, width }) => ({
  '& .MuiDialog-paper': {
    backgroundColor: theme.palette.background.variation,
    maxWidth: width ? `${width}px` : '400px',
    backgroundImage: 'none',
  },
}))

export default function CustomDialog(props) {
  const open = props.open
  const handleClose = props.handleClose
  const title = props.title

  return (
    <StyledDialog open={open} onClose={handleClose} fullWidth={true} width={props.width}>
      <DialogTitle id='form-dialog-title' sx={{ fontSize: '1.9rem', fontWeight: '600' }}>
        {title}
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
    </StyledDialog>
  )
}
