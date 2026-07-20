import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PodcastPlayerProvider } from './components/podcast/PodcastPlayerContext.jsx'
import PodcastChrome from './components/podcast/PodcastChrome.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PodcastPlayerProvider>
      <App />
      <PodcastChrome />
    </PodcastPlayerProvider>
  </StrictMode>,
)
