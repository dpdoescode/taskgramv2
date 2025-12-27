import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// import { SessionContextProvider } from '@supabase/auth-helpers-react'
import App from './App'
import './index.css'   // global reset
import './styles.css'  // app styles

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <SessionContextProvider supabaseClient={supabase} > */}
        <App />
      {/* </SessionContextProvider> */}
    </BrowserRouter>
  </React.StrictMode>
)
