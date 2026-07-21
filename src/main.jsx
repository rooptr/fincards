import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.jsx'
import DeepDiveReader from './components/DeepDiveReader.jsx'
import TopicExplorer from './components/TopicExplorer.jsx'
import { PodcastPlayerProvider } from './components/podcast/PodcastPlayerContext.jsx'
import PodcastChrome from './components/podcast/PodcastChrome.jsx'

const isRuntimeValidation = window.location.pathname.includes('/scene-runtime-validation')
const isTopicExplorer = window.location.pathname.includes('/explorer')

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PodcastPlayerProvider>
      {isRuntimeValidation ? <DeepDiveReader /> : isTopicExplorer ? <TopicExplorer /> : <App />}
      <PodcastChrome />
    </PodcastPlayerProvider>
  </StrictMode>,
)
