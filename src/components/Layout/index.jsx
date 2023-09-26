import React, { useState } from 'react'
import { styled, useTheme } from '@mui/material/styles'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import Drawer from '@mui/material/Drawer'
import Navlist from './Navlist'
import Header from '../Header'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const PermanentDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  fontWeight: 500,
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  '& > .MuiPaper-root': {
    backgroundColor: theme.palette.background.alt,
    position: 'absolute',
  },
}))

const TemporaryDrawer = styled(Drawer)(({ theme, open }) => ({
  fontWeight: 500,
  '& > .MuiPaper-root': {
    backgroundColor: theme.palette.background.alt,
    backgroundImage: 'none',
  },
}))

export default function Layout(props) {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('tablet'))
  const [open, setOpen] = useState(matches ? false : true)

  return (
    <div>
      <Header />
      <Box sx={{ position: 'relative', height: '100vh' }}>
        {matches ? (
          <div>
            <div
              style={{
                textAlign: 'end',
                backgroundColor: 'var(--secondaryMain)',
              }}
            >
              <IconButton onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
            </div>
            {props.children}
            <TemporaryDrawer anchor={'left'} open={open} onClose={() => setOpen(false)}>
              <Box sx={{ width: `calc(100vw - 50px)` }}>
                <div style={{ textAlign: 'end', padding: '0.5rem' }}>
                  <IconButton onClick={() => setOpen(false)}>
                    <ChevronLeftIcon />
                  </IconButton>
                </div>
                <Divider />
                <Navlist />
              </Box>
            </TemporaryDrawer>
          </div>
        ) : (
          <Box
            sx={{
              display: 'flex',
              position: 'relative',
              height: 'auto',
              minHeight: '100vh',
            }}
          >
            <PermanentDrawer variant='permanent' open={open}>
              <DrawerHeader>
                {open ? (
                  <IconButton onClick={() => setOpen(false)}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                  </IconButton>
                ) : (
                  <IconButton color='inherit' aria-label='open drawer' onClick={() => setOpen(true)} edge='start'>
                    <MenuIcon />
                  </IconButton>
                )}
              </DrawerHeader>
              <Divider />
              {open && <Navlist />}
            </PermanentDrawer>
            <Box
              component='main'
              sx={{
                flexGrow: 1,
                p: 3,
                width: `calc(100vw - ${drawerWidth}px)`,
              }}
            >
              {props.children}
            </Box>
          </Box>
        )}
      </Box>
    </div>
  )
}
