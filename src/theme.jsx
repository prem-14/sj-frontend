const themes = (mode) => {
  let themePalette
  if (mode === 'light') {
    themePalette = {
      // palette values for light mode
      primary: {
        main: '#23B7C6',
        hover: 'rgba(29, 161, 242, 0.1)',
        contrastText: '#fff',
      },
      secondary: {
        main: '#5b7083',
        contrastText: '#fff',
      },
      background: {
        default: 'rgb(255, 255, 255)',
        alt: '#f8f8f8',
        variation: '#dfe2e4',
        dark: '#efefef',
      },
      text: {
        primary: 'rgb(15, 20, 25)',
        secondary: '#5b7083',
      },
      common: {
        shadow: '#e0e0e0',
      },
    }
  } else if (mode === 'dark') {
    themePalette = {
      // palette values for dark mode
      primary: {
        main: '#0D80D8',
        hover: 'rgba(29, 161, 242, 0.1)',
        contrastText: '#fff',
      },
      secondary: {
        main: '#5b7083',
        contrastText: '#fff',
      },
      background: {
        default: 'rgb(21, 32, 43)',
        alt: '#1a2836',
        variation: '#25384b',
        dark: '#0f1b26',
      },
      text: {
        primary: 'rgb(255, 255, 255)',
        secondary: '#8899a6',
      },
      common: {
        shadow: '#224059',
      },
    }
  }
  rootThemeSettings(themePalette)
  return themePalette
}

function rootThemeSettings(themePalette) {
  Object.entries(themePalette).forEach(([key, value]) => {
    const keys = Object.keys(value)
    keys.forEach((k) => {
      // console.log(`--${key}${k.charAt(0).toUpperCase()}${k.slice(1)}`) // {primary: {main: "#23B7C6"}} ===> "primaryMain: "#23B7C6
      // document.documentElement.style.setProperty('--primaryMain', "#23B7C6");

      document.documentElement.style.setProperty(
        `--${key}${k.charAt(0).toUpperCase()}${k.slice(1)}`,
        themePalette[key][k]
      )
    })
  })
}

// mui theme settings (https://mui.com/material-ui/customization/default-theme/)
export const muiThemeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...themes(mode),
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      body1: {
        fontSize: '1.5rem',
      },
      button: {
        fontSize: '1.2rem',
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: '1.3rem',
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          fontSizeMedium: {
            fontSize: '2.2rem',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            // margin: '10px',
            width: '100%',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: '1.5rem', // set the desired font size
          },
        },
      },
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 640,
        laptop: 1024,
        desktop: 1200,
      },
    },
  }
}
