import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CoverageProvider } from './lib/CoverageProvider.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CoverageProvider>
      <App />
    </CoverageProvider>
  </StrictMode>,
)
