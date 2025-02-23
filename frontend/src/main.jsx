import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import styles from "./index.module.css"
// import './main.css'
// import App from './App.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home/>
  </StrictMode>,
)
