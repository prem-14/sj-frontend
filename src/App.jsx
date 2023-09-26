import { useMemo } from 'react'
import { muiThemeSettings } from './theme'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import AlerNotification from './components/AlertNotification'
import { useSelector } from 'react-redux'
import Router from '@/routes'

function App() {
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo(() => createTheme(muiThemeSettings(mode)), [mode])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AlerNotification />
      <Router />
    </ThemeProvider>
  )
}

export default App
