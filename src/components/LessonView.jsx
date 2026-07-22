import { lazy, Suspense } from 'react';

const DeepDiveReader = lazy(() => import('./DeepDiveReader.jsx'));

export default function LessonView({ onClose }) {
  return <Suspense fallback={<div className="min-h-screen bg-[#f5f5f7]" aria-label="Loading lesson reader" />}><DeepDiveReader onClose={onClose} /></Suspense>;
}
