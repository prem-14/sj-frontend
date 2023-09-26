import * as React from 'react'
import Popover from '@mui/material/Popover'
import { styled } from '@mui/system'

const CustomPopover = styled(Popover)(({ theme }) => ({
  '& .MuiPopover-paper': {
    backgroundColor: theme.palette.background.default,
    padding: '1rem',
  },
}))

export default function BasicPopover({ children, ...rest }) {
  return (
    <CustomPopover
      {...rest}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {children}
    </CustomPopover>
  )
}
