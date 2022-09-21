import { createTheme } from '@mui/material'

export const ligthTheme = createTheme({
   palette: {
      primary: {
         main: '#004795'
      },
      secondary: {
         main: '#DD5145'
      },
      error: {
         main: '#DD5145'
      }
   },
   typography: {
      fontFamily: 'Acme, sans-serif',
      fontSize: 13,
      h1: {
         fontWeight: 1000,
         fontSize: 20
      },
      h2: {
         fontWeight: 1000,
         fontSize: 18
      },
      h3: {
         fontWeight: 1000,
         fontSize: 16
      },
      h4: {
         fontWeight: 1000,
         fontSize: 14
      },
      h5: {
         fontWeight: 500,
         fontSize: 12
      },
      h6: {
         fontWeight: 500,
         fontSize: 10
      }
   },
   components: {
      MuiTextField: {
         styleOverrides: {
            root: {
               fontSize: 14
            }
         }
      },
      MuiTabs: {
         styleOverrides: {
            indicator: {
               backgroundColor: '#fff'
            }
         }
      },
      MuiButton: {
         defaultProps: {
            color: 'primary'
         },
         styleOverrides: {
            colorInherit: '#fff'
         }
      }
   }
})
