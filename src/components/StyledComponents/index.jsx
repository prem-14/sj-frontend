import { AppBar } from '@mui/material'
import { styled } from '@mui/system'

export const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt,
  position: 'unset',
  backgroundImage: 'none',
  zIndex: theme.zIndex.drawer + 1,
  boxShadow: `0 5px 15px ${theme.palette.common.shadow}`,
  color: theme.palette.text.primary,
  transition: 'none',
}))
