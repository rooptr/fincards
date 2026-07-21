import { gsap } from 'gsap';

const defaults = {
  duration: 1,
  ease: 'none',
};

function timeline() {
  // Child timelines must remain playable so the master scrub timeline owns
  // their progress and can reverse them symmetrically.
  return gsap.timeline({ defaults });
}

function behaviorFade({ element, params = {} }) {
  return gsap.fromTo(element, { opacity: params.from ?? 0 }, { opacity: params.to ?? 1, duration: params.duration ?? defaults.duration, ease: params.ease ?? defaults.ease, immediateRender: false });
}

function behaviorBurn({ element, params = {} }) {
  const tl = timeline();
  tl.fromTo(element, { opacity: 1, filter: 'brightness(1) saturate(1)' }, { opacity: params.toOpacity ?? 0.28, filter: 'brightness(0.55) saturate(0.2)', duration: params.duration ?? 1, ease: params.ease ?? 'power1.in', immediateRender: false });
  return tl;
}

function behaviorSplit({ element, params = {} }) {
  return gsap.fromTo(element, { x: 0, opacity: 1 }, { x: params.distance ?? 120, opacity: params.toOpacity ?? 0.85, duration: params.duration ?? 1, ease: params.ease ?? defaults.ease, immediateRender: false });
}

function behaviorShake({ element, params = {} }) {
  const tl = timeline();
  const distance = params.distance ?? 8;
  tl.to(element, { x: distance, duration: 0.12, ease: 'sine.inOut' })
    .to(element, { x: -distance, duration: 0.12, ease: 'sine.inOut' })
    .to(element, { x: distance * 0.5, duration: 0.12, ease: 'sine.inOut' })
    .to(element, { x: 0, duration: 0.14, ease: 'sine.out' });
  return tl;
}

function behaviorCollapse({ element, params = {} }) {
  return gsap.fromTo(element, { scaleY: 1, transformOrigin: params.origin ?? 'center center', opacity: 1 }, { scaleY: params.toScale ?? 0.08, opacity: params.toOpacity ?? 0.35, duration: params.duration ?? 1, ease: params.ease ?? 'power2.inOut', immediateRender: false });
}

function behaviorGrow({ element, params = {} }) {
  const from = {};
  const to = {};
  if (params.fromScale != null || params.toScale != null) {
    from.scale = params.fromScale ?? 1;
    to.scale = params.toScale ?? 1;
  }
  if (params.fromOpacity != null || params.toOpacity != null) {
    from.opacity = params.fromOpacity ?? 1;
    to.opacity = params.toOpacity ?? 1;
  }
  const horizontalGutter = params.horizontalGutter ?? params.gutter ?? 0;
  const verticalGutter = params.verticalGutter ?? params.gutter ?? 0;
  if (params.fromWidth != null) from.width = params.fromWidth;
  if (params.toWidth === 'viewport') to.width = () => `${window.innerWidth - (horizontalGutter * 2)}px`;
  else if (params.toWidth != null) to.width = params.toWidth;
  if (params.fromHeight != null) from.height = params.fromHeight;
  if (params.toHeight === 'viewport') to.height = () => `${window.innerHeight - (verticalGutter * 2)}px`;
  else if (params.toHeight != null) to.height = params.toHeight;
  return gsap.fromTo(element, from, { ...to, duration: params.duration ?? 1, ease: params.ease ?? 'power2.out', immediateRender: false });
}

function behaviorFloat({ element, params = {} }) {
  return gsap.fromTo(element, { y: params.fromY ?? 24, opacity: params.fromOpacity ?? 0.5 }, { y: params.toY ?? 0, opacity: params.toOpacity ?? 1, duration: params.duration ?? 1, ease: params.ease ?? 'power2.out', immediateRender: false });
}

function behaviorAssemble({ element, params = {} }) {
  return gsap.fromTo(element, { opacity: 0, y: params.fromY ?? 28, scale: params.fromScale ?? 0.94 }, { opacity: 1, y: 0, scale: 1, duration: params.duration ?? 1, ease: params.ease ?? 'power3.out', immediateRender: false });
}

function behaviorCount({ element, params = {} }) {
  const target = Number(params.to ?? 100);
  const start = Number(params.from ?? 0);
  const state = { value: start };
  return gsap.to(state, {
    value: target,
    duration: params.duration ?? 1,
    ease: params.ease ?? 'none',
    snap: { value: params.snap ?? 1 },
    onUpdate: () => { element.textContent = `${Math.round(state.value)}`; },
  });
}

function behaviorHighlight({ element, params = {} }) {
  return gsap.fromTo(element, { backgroundColor: params.fromColor ?? 'rgba(255,255,255,0.04)', borderColor: params.fromBorder ?? 'rgba(255,255,255,0.18)' }, { backgroundColor: params.toColor ?? 'rgba(41,151,255,0.16)', borderColor: params.toBorder ?? '#2997ff', duration: params.duration ?? 1, ease: params.ease ?? 'power2.out', immediateRender: false });
}

function behaviorMorph({ element, params = {} }) {
  const from = { borderRadius: params.fromRadius ?? 28, rotation: params.fromRotation ?? 0 };
  const to = { borderRadius: params.toRadius ?? 8, rotation: params.toRotation ?? 0 };
  if (params.fromShadow != null) from.boxShadow = params.fromShadow;
  if (params.toShadow != null) to.boxShadow = params.toShadow;
  if (params.fromMargin != null) from.margin = params.fromMargin;
  if (params.toMargin != null) to.margin = params.toMargin;
  return gsap.fromTo(element, from, { ...to, duration: params.duration ?? 1, ease: params.ease ?? 'power2.inOut', immediateRender: false });
}

export const behaviorFactories = {
  fade: behaviorFade,
  burn: behaviorBurn,
  split: behaviorSplit,
  shake: behaviorShake,
  collapse: behaviorCollapse,
  grow: behaviorGrow,
  float: behaviorFloat,
  assemble: behaviorAssemble,
  count: behaviorCount,
  highlight: behaviorHighlight,
  morph: behaviorMorph,
};

export function createBehaviorSegment({ action, object, element, params }) {
  const factory = behaviorFactories[action];
  if (!factory) throw new Error(`No behavior factory for ${action}`);
  return factory({ action, object, element, params });
}
