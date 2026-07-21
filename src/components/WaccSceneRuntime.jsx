import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MetaphorScene from './MetaphorScene.jsx';

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const localProgress = (progress, range) => clamp((progress - range.start) / (range.end - range.start));

function interpolate(from, to, progress) {
  return gsap.utils.interpolate(from, to, clamp(progress));
}

/**
 * Golden master scene graph. This is deliberately hardcoded for WACC only.
 * It is the source of truth for the runtime proof, not an authoring schema.
 */
export const waccScenes = [
  {
    id: 'wacc-panels',
    range: { start: 0.0, end: 0.45 },
    duration: 0.45,
    background: { from: '#0b0b0b', to: '#0b0b0b' },
    transition: 'continue',
    objects: [
      {
        id: 'panel-1-text',
        kind: 'text',
        position: { desktop: { x: '5%', y: '22%' }, mobile: { x: '6%', y: '11%' } },
        size: { desktop: { width: '46%', height: '42%' }, mobile: { width: '88%', height: '35%' } },
        baseStyle: { opacity: 1 },
        content: { text: 'Maya has two ways to fund the factory. The market is already pricing the risk.' },
      },
      {
        id: 'panel-1-illustration',
        kind: 'illustration',
        position: { desktop: { x: '57%', y: '17%' }, mobile: { x: '6%', y: '51%' } },
        size: { desktop: { width: '38%', height: '66%' }, mobile: { width: '88%', height: '42%' } },
        baseStyle: { opacity: 1 },
        content: { illustrationKey: 'wacc-founder-risk-ticker', centralObject: 'flickering ownership ticker', metaphor: 'risk_ticker' },
      },
      {
        id: 'panel-2-text',
        kind: 'text',
        position: { desktop: { x: '5%', y: '22%' }, mobile: { x: '6%', y: '11%' } },
        size: { desktop: { width: '46%', height: '42%' }, mobile: { width: '88%', height: '35%' } },
        baseStyle: { opacity: 0 },
        content: { text: 'Debt promises a fixed claim. Equity absorbs the uncertain upside and downside.' },
      },
      {
        id: 'panel-2-illustration',
        kind: 'illustration',
        position: { desktop: { x: '57%', y: '17%' }, mobile: { x: '6%', y: '51%' } },
        size: { desktop: { width: '38%', height: '66%' }, mobile: { width: '88%', height: '42%' } },
        baseStyle: { opacity: 0 },
        content: { illustrationKey: 'wacc-fixed-debt-contract', centralObject: 'stamped repayment schedule', metaphor: 'layers' },
      },
      {
        id: 'panel-3-text',
        kind: 'text',
        position: { desktop: { x: '5%', y: '22%' }, mobile: { x: '6%', y: '11%' } },
        size: { desktop: { width: '46%', height: '42%' }, mobile: { width: '88%', height: '35%' } },
        baseStyle: { opacity: 0 },
        content: { text: 'Mix those claims correctly, and WACC becomes the hurdle every project must clear.' },
      },
      {
        id: 'panel-3-illustration',
        kind: 'illustration',
        position: { desktop: { x: '57%', y: '17%' }, mobile: { x: '6%', y: '51%' } },
        size: { desktop: { width: '38%', height: '66%' }, mobile: { width: '88%', height: '42%' } },
        baseStyle: { opacity: 0 },
        content: { illustrationKey: 'wacc-funding-mix-flow', centralObject: 'two funding streams joining one gate', metaphor: 'flow' },
      },
    ],
    behaviors: [
      { type: 'crossfade', outgoing: 'panel-1-text', incoming: 'panel-2-text', range: { start: 0.12, end: 0.25 } },
      { type: 'crossfade', outgoing: 'panel-1-illustration', incoming: 'panel-2-illustration', range: { start: 0.12, end: 0.25 } },
      { type: 'crossfade', outgoing: 'panel-2-text', incoming: 'panel-3-text', range: { start: 0.28, end: 0.42 } },
      { type: 'crossfade', outgoing: 'panel-2-illustration', incoming: 'panel-3-illustration', range: { start: 0.28, end: 0.42 } },
    ],
  },
  {
    id: 'wacc-reveal',
    range: { start: 0.45, end: 0.65 },
    duration: 0.20,
    background: { from: '#0b0b0b', to: '#e8e8ed' },
    transition: 'continue',
    objects: [
      {
        id: 'wacc-title',
        kind: 'text',
        position: { desktop: { x: '50%', y: '34%' }, mobile: { x: '50%', y: '28%' } },
        size: { desktop: { width: '78%', height: '24%' }, mobile: { width: '88%', height: '22%' } },
        baseStyle: { opacity: 0 },
        content: { text: 'Weighted Average Cost of Capital' },
      },
      {
        id: 'wacc-definition',
        kind: 'text',
        position: { desktop: { x: '50%', y: '57%' }, mobile: { x: '50%', y: '54%' } },
        size: { desktop: { width: '60%', height: '20%' }, mobile: { width: '84%', height: '24%' } },
        baseStyle: { opacity: 0 },
        content: { text: 'The blended return a company must earn to compensate every source of capital for the risk it carries.' },
      },
    ],
    behaviors: [
      { type: 'fade', target: 'panel-3-text', range: { start: 0.45, end: 0.59 }, from: 1, to: 0 },
      { type: 'fade', target: 'panel-3-illustration', range: { start: 0.45, end: 0.59 }, from: 1, to: 0 },
      { type: 'fade', target: 'wacc-title', range: { start: 0.46, end: 0.56 }, from: 0, to: 1 },
      { type: 'fade', target: 'wacc-definition', range: { start: 0.51, end: 0.64 }, from: 0, to: 1 },
      { type: 'colorShift', target: 'scene-background', range: { start: 0.45, end: 0.65 }, from: '#0b0b0b', to: '#e8e8ed' },
    ],
  },
  {
    id: 'wacc-expand',
    range: { start: 0.65, end: 1.0 },
    duration: 0.35,
    background: { from: '#e8e8ed', to: '#ffffff' },
    transition: 'handoff',
    objects: [
      {
        id: 'wacc-card',
        kind: 'card',
        position: { desktop: { x: '50%', y: '50%' }, mobile: { x: '50%', y: '50%' } },
        size: { desktop: { width: '100%', height: '100%' }, mobile: { width: '100%', height: '100%' } },
        baseStyle: { opacity: 0 },
        content: { text: 'WACC definition card' },
      },
    ],
    behaviors: [
      { type: 'fade', target: 'wacc-card', range: { start: 0.60, end: 0.70 }, from: 0, to: 1 },
      {
        type: 'grow',
        target: 'wacc-card',
        range: { start: 0.65, end: 1.0 },
        from: { width: 'compactWidth', height: 'compactHeight', borderRadius: 28 },
        to: { width: 'viewportWidth', height: 'viewportHeight', borderRadius: 0 },
      },
      { type: 'colorShift', target: 'scene-background', range: { start: 0.65, end: 1.0 }, from: '#e8e8ed', to: '#ffffff' },
    ],
  },
];

/**
 * Applies one reusable behavior to one global progress value.
 * It returns deterministic style patches; it owns no DOM and no events.
 */
export function applyBehavior(behavior, progress, context = {}) {
  const p = localProgress(progress, behavior.range);

  if (behavior.type === 'fade') {
    return { objectStyles: { [behavior.target]: { opacity: interpolate(behavior.from, behavior.to, p) } } };
  }

  if (behavior.type === 'crossfade') {
    return {
      objectStyles: {
        [behavior.outgoing]: { opacity: interpolate(1, 0, p) },
        [behavior.incoming]: { opacity: interpolate(0, 1, p) },
      },
    };
  }

  if (behavior.type === 'grow') {
    const width = (value) => value === 'compactWidth' ? context.compactWidth : context.viewport.width;
    const height = (value) => value === 'compactHeight' ? context.compactHeight : context.viewport.height;
    return {
      objectStyles: {
        [behavior.target]: {
          width: interpolate(width(behavior.from.width), width(behavior.to.width), p),
          height: interpolate(height(behavior.from.height), height(behavior.to.height), p),
          borderRadius: interpolate(behavior.from.borderRadius, behavior.to.borderRadius, p),
        },
      },
    };
  }

  if (behavior.type === 'colorShift') {
    return { sceneStyle: { backgroundColor: interpolate(behavior.from, behavior.to, p) } };
  }

  return {};
}

function resolveRuntimeFrame(progress, viewport) {
  const compactWidth = Math.max(280, Math.min(viewport.width - 28, viewport.width < 640 ? viewport.width - 28 : 720));
  const compactHeight = Math.max(300, Math.min(viewport.height - 48, viewport.height * 0.58));
  const context = { viewport, compactWidth, compactHeight };
  const objects = {};
  waccScenes.forEach((scene) => scene.objects.forEach((object) => {
    objects[object.id] = { opacity: object.baseStyle?.opacity ?? 0 };
  }));

  const output = { objects, sceneStyle: { backgroundColor: '#0b0b0b' } };
  waccScenes.forEach((scene) => scene.behaviors.forEach((behavior) => {
    const patch = applyBehavior(behavior, progress, context);
    Object.entries(patch.objectStyles ?? {}).forEach(([id, style]) => {
      output.objects[id] = { ...output.objects[id], ...style };
    });
    output.sceneStyle = { ...output.sceneStyle, ...(patch.sceneStyle ?? {}) };
  }));
  return output;
}

function ProtagonistPlaceholder() { return null; }

function RuntimeObject({ object, style, theme }) {
  const position = object.position;
  const size = object.size;
  const customStyle = {
    '--object-x': position.desktop.x,
    '--object-y': position.desktop.y,
    '--object-width': size.desktop.width,
    '--object-height': size.desktop.height,
    '--object-mobile-x': position.mobile.x,
    '--object-mobile-y': position.mobile.y,
    '--object-mobile-width': size.mobile.width,
    '--object-mobile-height': size.mobile.height,
    opacity: style.opacity,
    width: object.kind === 'card' ? `${style.width}px` : undefined,
    height: object.kind === 'card' ? `${style.height}px` : undefined,
    borderRadius: object.kind === 'card' ? `${style.borderRadius}px` : undefined,
    backgroundColor: object.kind === 'card' ? theme.backgroundColor : undefined,
    color: theme.ink,
  };

  if (object.kind === 'card') return <div className="scene-runtime__object scene-runtime__object--card" style={customStyle} aria-hidden="true" />;
  if (object.kind === 'text') return <p className={`scene-runtime__object scene-runtime__object--text${object.id.startsWith('wacc-') ? ' scene-runtime__object--reveal' : ''}`} style={customStyle}>{object.content.text}</p>;
  if (object.kind === 'illustration') return <div className="scene-runtime__object scene-runtime__object--illustration" style={customStyle}><MetaphorScene metaphor={object.content.metaphor} illustrationKey={object.content.illustrationKey} centralObject={object.content.centralObject} heroInk={theme.ink} heroPaper={theme.backgroundColor} /></div>;
  return <ProtagonistPlaceholder />;
}

export default function WaccSceneRuntime({ scrollerRef, activeKey }) {
  const rootRef = useRef(null);
  const progressRef = useRef(0);
  const expandedRef = useRef(false);
  const touchYRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [viewport, setViewport] = useState(() => ({ width: window.innerWidth, height: window.innerHeight }));
  const frame = useMemo(() => resolveRuntimeFrame(progress, viewport), [progress, viewport]);
  const theme = {
    backgroundColor: frame.sceneStyle.backgroundColor,
    ink: interpolate('#f5f5f7', '#1d1d1f', localProgress(progress, { start: 0.56, end: 1 })),
  };

  useEffect(() => {
    const update = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    progressRef.current = 0;
    expandedRef.current = false;
    setProgress(0);
    setExpanded(false);
  }, [activeKey]);

  useEffect(() => {
    const scroller = scrollerRef?.current;
    if (!scroller || !rootRef.current) return undefined;
    const setProgressValue = (value) => {
      const next = clamp(value);
      progressRef.current = next;
      const isExpanded = next >= 0.999;
      expandedRef.current = isExpanded;
      setExpanded(isExpanded);
      setProgress(next);
    };
    const capture = (delta, event) => {
      if (event.cancelable) event.preventDefault();
      setProgressValue(progressRef.current + delta);
    };
    const wheel = (event) => {
      const delta = (event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY) * 0.0011;
      const atTop = scroller.scrollTop <= 4;
      if (expandedRef.current) {
        if (atTop && delta < 0) capture(delta, event);
        return;
      }
      if (progressRef.current <= 0.0001 && delta < 0) return;
      capture(delta, event);
    };
    const touchStart = (event) => { touchYRef.current = event.touches[0]?.clientY ?? null; };
    const touchMove = (event) => {
      const y = event.touches[0]?.clientY;
      if (y == null || touchYRef.current == null) return;
      const delta = (touchYRef.current - y) * 0.0009;
      touchYRef.current = y;
      const atTop = scroller.scrollTop <= 4;
      if (expandedRef.current) {
        if (atTop && delta < 0) capture(delta, event);
        return;
      }
      if (progressRef.current <= 0.0001 && delta < 0) return;
      capture(delta, event);
    };
    const touchEnd = () => { touchYRef.current = null; };
    scroller.addEventListener('wheel', wheel, { passive: false });
    scroller.addEventListener('touchstart', touchStart, { passive: true });
    scroller.addEventListener('touchmove', touchMove, { passive: false });
    scroller.addEventListener('touchend', touchEnd, { passive: true });
    if (import.meta.env.DEV) console.debug('[WaccSceneRuntime] trigger mounted', { scroller, scenes: waccScenes.map((scene) => scene.id) });
    return () => {
      scroller.removeEventListener('wheel', wheel);
      scroller.removeEventListener('touchstart', touchStart);
      scroller.removeEventListener('touchmove', touchMove);
      scroller.removeEventListener('touchend', touchEnd);
    };
  }, [activeKey, scrollerRef]);

  return (
    <section ref={rootRef} className="scene-runtime relative h-screen overflow-hidden" style={frame.sceneStyle} data-scene-runtime="wacc" data-progress={progress.toFixed(3)} data-expanded={expanded}>
      {waccScenes.flatMap((scene) => scene.objects).map((object) => (
        <RuntimeObject key={object.id} object={object} style={frame.objects[object.id]} theme={theme} />
      ))}
    </section>
  );
}
