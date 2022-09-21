import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { ThemeProvider, CssBaseline } from '@mui/material'

import { ligthTheme } from './themes'
import { store } from 'state/store'

import App from 'components/app'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
   <Provider store={store}>
      <ThemeProvider theme={ ligthTheme }>
         <CssBaseline />
         <App />
      </ThemeProvider>
   </Provider>
)
