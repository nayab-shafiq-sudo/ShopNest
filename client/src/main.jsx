import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/AuthContext.jsx'
import {Provider} from  'react-redux'
import store from './redux/Store.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </Provider>,
)
