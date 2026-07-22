import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import 'katex/dist/katex.min.css'
import './index.css'
import App from './App.jsx'
import TopicExplorer from './components/TopicExplorer.jsx'
import { PodcastPlayerProvider } from './components/podcast/PodcastPlayerContext.jsx'
import PodcastChrome from './components/podcast/PodcastChrome.jsx'

const isRuntimeValidation = window.location.pathname.includes('/scene-runtime-validation')
const isTopicExplorer = window.location.pathname.includes('/explorer')
const DeepDiveReader = lazy(() => import('./components/DeepDiveReader.jsx'))

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PodcastPlayerProvider>
      <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" aria-label="Loading lesson reader" />}>{isRuntimeValidation ? <DeepDiveReader /> : isTopicExplorer ? <TopicExplorer /> : <App />}</Suspense>
      <PodcastChrome />
    </PodcastPlayerProvider>
  </StrictMode>,
)
