import { createElement } from 'react';
import { QuickRatioLessonCanvas } from './ValidationContent.jsx';
import TypewriterCopy from './TypewriterCopy.jsx';

const objects = [
  'lesson-card',
  'hook-copy',
  'topic-name',
  'topic-title',
  'topic-definition',
  'lesson-canvas',
];

export const validationScenes = [
  {
    id: 'hook',
    title: 'Hook',
    background: '#f5f5f7',
    duration: 1.05,
    transition: 'continue',
    layout: 'compact-card',
    objects,
    behaviors: [],
  },
  {
    id: 'topic-reveal',
    title: 'Topic reveal',
    background: '#f5f5f7',
    duration: 1.05,
    transition: 'continue',
    layout: 'compact-card',
    objects,
    behaviors: [
      { target: 'hook-copy', action: 'float', params: { fromY: -40, toY: -120, fromOpacity: 1, toOpacity: 0, duration: 0.78 } },
      { target: 'topic-name', action: 'assemble', params: { fromY: 80, fromScale: 1, duration: 0.42 }, at: 0.34 },
      { target: 'topic-title', action: 'assemble', params: { fromY: 80, fromScale: 1, duration: 0.46 }, at: 0.42 },
      { target: 'topic-definition', action: 'assemble', params: { fromY: 80, fromScale: 1, duration: 0.48 }, at: 0.5 },
    ],
  },
  {
    id: 'lesson-canvas',
    title: 'Lesson canvas',
    background: '#f5f5f7',
    duration: 1.15,
    transition: 'handoff',
    layout: 'lesson-canvas',
    objects,
    behaviors: [
      { target: 'topic-name', action: 'float', params: { fromY: 0, toY: -100, fromOpacity: 1, toOpacity: 1, duration: 0.7 } },
      { target: 'topic-title', action: 'float', params: { fromY: 0, toY: -100, fromOpacity: 1, toOpacity: 1, duration: 0.7 } },
      { target: 'topic-definition', action: 'float', params: { fromY: 0, toY: -100, fromOpacity: 1, toOpacity: 0.92, duration: 0.7 } },
      { target: 'lesson-canvas', action: 'assemble', params: { fromY: 80, fromScale: 1, duration: 0.58 } },
    ],
  },
];

export const validationObjects = [
  {
    id: 'lesson-card',
    position: { x: '50%', y: '50%' },
    size: { width: '100vw', height: '100dvh' },
    opacity: 1,
    style: {
      position: 'relative',
      left: 'auto',
      top: 'auto',
      transform: 'none',
      translate: 'none',
      display: 'block',
      overflow: 'visible',
      border: 'none',
      borderRadius: 0,
      margin: 0,
      // Lesson content overflows the 100vh card after the pin releases.
      // Match the surrounding canvas so that handoff has no visible seam.
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },
  },
  {
    id: 'hook-copy',
    parentId: 'lesson-card',
    position: { x: '8%', y: '34%' },
    size: { width: '84%', height: '32%' },
    opacity: 1,
    content: createElement(TypewriterCopy, { text: `You have ${String.fromCodePoint(0x20b9)}50 crore in current assets. You still go bankrupt tomorrow.` }),
    style: { display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#1d1d1f', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 650, letterSpacing: '-0.03em', lineHeight: 1.02 },
  },
  {
    id: 'topic-name',
    parentId: 'lesson-card',
    position: { x: '8%', y: '25%' },
    size: { width: '84%', height: 'auto' },
    opacity: 0,
    text: 'QUICK RATIO',
    style: { display: 'block', textAlign: 'center', color: '#0071e3', fontSize: 'clamp(3rem, 8vw, 9rem)', fontWeight: 750, letterSpacing: '-0.03em', lineHeight: 0.88 },
  },
  {
    id: 'topic-title',
    parentId: 'lesson-card',
    position: { x: '8%', y: '43%' },
    size: { width: '84%', height: 'auto' },
    opacity: 0,
    text: 'Measures whether a company can pay its short-term obligations without depending on inventory.',
    style: { display: 'block', textAlign: 'center', color: '#1d1d1f', fontSize: 'clamp(1.15rem, 2.6vw, 1.8rem)', fontWeight: 650, letterSpacing: '-0.03em', lineHeight: 1.1 },
  },
  {
    id: 'topic-definition',
    parentId: 'lesson-card',
    position: { x: '14%', y: '59%' },
    size: { width: '72%', height: 'auto' },
    opacity: 0,
    text: 'The acid test asks what can pay a bill now, before inventory has time to move.',
    style: { display: 'block', textAlign: 'center', color: '#515154', fontSize: 'clamp(0.9rem, 1.6vw, 1.04rem)', fontWeight: 500, letterSpacing: '-0.015em', lineHeight: 1.42 },
  },
  {
    id: 'lesson-canvas',
    parentId: 'lesson-card',
    position: { x: '6%', y: '55%' },
    size: { width: '88%', height: '40%' },
    opacity: 0,
    content: createElement(QuickRatioLessonCanvas),
    style: { display: 'block', color: '#1d1d1f', overflow: 'visible', padding: '0 4% 5rem' },
  },
];
