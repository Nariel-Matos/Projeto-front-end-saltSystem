import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom'
import './index.css'
import Routers from './router/router'



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <BrowserRouter>
        <Routers />
    </BrowserRouter>
  </React.StrictMode>
)
