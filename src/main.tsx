import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CampaignProvider } from './context/CampaignContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CampaignProvider>
        <App />
      </CampaignProvider>
    </BrowserRouter>
  </StrictMode>,
)
