// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthContext, AuthProvider } from './features/auth/auth.context.jsx'
import { SongContextProvider } from './features/home/song.context.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider >
      <SongContextProvider>
        <App />
      </SongContextProvider>
      
  </AuthProvider>
)
