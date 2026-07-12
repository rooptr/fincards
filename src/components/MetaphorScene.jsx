import { useEffect, useId, useRef } from 'react';
import { gsap } from 'gsap';
import { metaphorFor } from './MetaphorScene.model.js';

const INK = '#1d1d1f';
const PAPER = '#fbfbfd';
const BLUE = '#0071e3';
const AMBER = '#ff9f0a';
const GREEN = '#34c759';
const COOL = '#8e8e93';

export { metaphorFor } from './MetaphorScene.model.js';

function numbersFrom(values) {
  return Object.values(values ?? {}).filter((value) => Number.isFinite(Number(value))).map(Number);
}

function valueFor(values, patterns, fallback) {
  const entry = Object.entries(values ?? {}).find(([key, value]) => patterns.some((pattern) => pattern.test(key)) && Number.isFinite(Number(value)));
  return entry ? Number(entry[1]) : fallback;
}

function percent(value, fallback = 50) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(0, Math.min(100, value <= 1 ? value * 100 : value));
}

function Frame({ type, filterId, children }) {
  return <svg viewBox="0 0 640 380" role="img" aria-label={`${type.replace(/_/g, ' ')} illustration`} className="metaphor-scene__svg" preserveAspectRatio="xMidYMid meet">
    <defs><filter id={filterId} x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="7" result="noise" /><feDisplacementMap in="SourceGraphic" in2="noise" scale=".7" xChannelSelector="R" yChannelSelector="G" /></filter></defs>
    {children}
  </svg>;
}

function TimeDecay({ values, filterId }) {
  const rate = percent(valueFor(values, [/rate|return|discount|cost/i], 10), 10) / 100;
  const years = Math.max(1, valueFor(values, [/year|time|period|duration/i], 4));
  const distance = Math.min(270, 72 + years * 28 + rate * 80);
  const scale = Math.max(.34, 1 - rate * .55 - years * .055);
  const color = rate + years / 20 > .62 ? COOL : AMBER;
  return <Frame type="time_decay" filterId={filterId}><path d="M 88 278 C 230 250, 350 174, 556 92" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeDasharray="3 12" filter={`url(#${filterId})`} /><path d="M 530 87 l 28 4 l -17 22" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="90" cy="278" r="9" fill={GREEN} stroke={INK} strokeWidth="3" /><g transform={`translate(${distance} ${-distance * .43}) rotate(-8) scale(${scale})`}><rect x="62" y="238" width="92" height="58" rx="9" fill={color} fillOpacity=".23" stroke={color} strokeWidth="4" filter={`url(#${filterId})`} /><path d="M 77 268 C 91 249, 125 249, 140 268 C 125 287, 91 287, 77 268" fill="none" stroke={color} strokeWidth="3" /><circle cx="108" cy="268" r="9" fill="none" stroke={color} strokeWidth="3" /></g></Frame>;
}

function RiskTicker({ values, filterId }) {
  const risk = percent(valueFor(values, [/risk|beta|volatil|return|cost/i], numbersFrom(values)[0] ?? 55));
  const flicker = Math.max(3, Math.round(risk / 9));
  return <Frame type="risk_ticker" filterId={filterId}><rect x="82" y="88" width="476" height="118" rx="18" fill={PAPER} stroke={INK} strokeWidth="5" filter={`url(#${filterId})`} /><path d="M 110 151 C 165 111 195 183 242 140 S 325 114 360 157 S 438 194 528 126" fill="none" stroke={risk > 58 ? AMBER : BLUE} strokeWidth="6" strokeLinecap="round" strokeDasharray={`${flicker} 8`} /><circle cx="126" cy="150" r="18" fill={GREEN} fillOpacity=".28" stroke={GREEN} strokeWidth="4" /><path d="M 126 187 L 126 246 M 126 246 L 94 302 M 126 246 L 158 302 M 126 218 L 82 242 M 126 218 L 174 200" fill="none" stroke={INK} strokeWidth="7" strokeLinecap="round" /><circle cx="126" cy="182" r="27" fill={PAPER} stroke={INK} strokeWidth="5" /><path d="M 114 181 Q 126 191 138 181" fill="none" stroke={BLUE} strokeWidth="4" strokeLinecap="round" /><path d="M 430 264 l 50 -32 M 480 232 l -4 23 M 480 232 l -23 5" fill="none" stroke={risk > 58 ? AMBER : BLUE} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></Frame>;
}

function Flow({ values, filterId }) {
  const split = percent(valueFor(values, [/split|weight|share|ratio|mix/i], numbersFrom(values)[0] ?? 50));
  const open = Math.max(.2, Math.min(1, split / 100));
  return <Frame type="flow" filterId={filterId}><path d="M 70 190 C 165 190 173 190 268 190 C 340 190 342 112 442 112 M 268 190 C 340 190 342 268 442 268" fill="none" stroke="#d2d2d7" strokeWidth="30" strokeLinecap="round" /><path d="M 70 190 C 165 190 173 190 268 190 C 340 190 342 112 442 112" pathLength="1" strokeDasharray={`${open} 1`} fill="none" stroke={BLUE} strokeWidth="18" strokeLinecap="round" filter={`url(#${filterId})`} /><path d="M 268 190 C 340 190 342 268 442 268" pathLength="1" strokeDasharray={`${1 - open + .2} 1`} fill="none" stroke={AMBER} strokeWidth="18" strokeLinecap="round" filter={`url(#${filterId})`} /><rect x="254" y="164" width="29" height="52" rx="7" fill={PAPER} stroke={INK} strokeWidth="4" transform={`rotate(${(split - 50) * .55} 268 190)`} /><circle cx="70" cy="190" r="20" fill={GREEN} fillOpacity=".26" stroke={GREEN} strokeWidth="4" /></Frame>;
}

function Branching({ values, filterId }) {
  const growth = Math.max(.25, Math.min(1, percent(valueFor(values, [/growth|share|ownership|split|rate/i], numbersFrom(values)[0] ?? 60)) / 100));
  const branch = (d, width, key) => <path key={key} d={d} pathLength="1" strokeDasharray={`${growth} 1`} fill="none" stroke={INK} strokeWidth={width} strokeLinecap="round" filter={`url(#${filterId})`} />;
  return <Frame type="branching" filterId={filterId}>{branch('M 320 326 C 320 252 320 214 320 178', 14, 'trunk')}{branch('M 320 205 C 266 174 223 142 174 94', 10, 'left')}{branch('M 320 205 C 376 170 424 139 474 88', 10, 'right')}{branch('M 239 153 C 203 147 169 156 132 143', 6, 'lefttip')}{branch('M 403 151 C 443 154 475 142 515 126', 6, 'righttip')}<circle cx="320" cy="330" r="13" fill={GREEN} fillOpacity=".28" stroke={GREEN} strokeWidth="4" /><circle cx="132" cy="143" r="16" fill={BLUE} fillOpacity=".25" stroke={BLUE} strokeWidth="3" /><circle cx="515" cy="126" r="16" fill={AMBER} fillOpacity=".25" stroke={AMBER} strokeWidth="3" /></Frame>;
}

function Layers({ values, filterId }) {
  const loss = percent(valueFor(values, [/loss|risk|rate|deduct|tax/i], numbersFrom(values)[0] ?? 30));
  return <Frame type="layers" filterId={filterId}>{[0, 1, 2, 3].map((layer) => { const exposed = Math.max(0, loss - layer * 25) / 25; const width = 310 - layer * 36; return <g key={layer} transform={`translate(${exposed * 24} 0)`} opacity={1 - exposed * .42}><rect x={165 + layer * 18} y={250 - layer * 44} width={width} height="40" rx="12" fill={layer % 2 ? BLUE : GREEN} fillOpacity=".18" stroke={layer % 2 ? BLUE : GREEN} strokeWidth="4" filter={`url(#${filterId})`} />{exposed > 0 && <path d={`M ${450 - layer * 18} ${270 - layer * 44} l 12 -12 l 12 12 l 12 -12`} fill="none" stroke={AMBER} strokeWidth="4" strokeLinecap="round" />}</g>; })}</Frame>;
}

function FeedbackLoop({ values, filterId }) {
  const strength = percent(valueFor(values, [/feedback|return|rate|gain|loop/i], numbersFrom(values)[0] ?? 55));
  const dash = Math.max(8, 64 - strength * .5);
  return <Frame type="feedback_loop" filterId={filterId}><path d="M 190 110 C 390 36 540 150 444 254 C 346 356 110 294 152 150 C 172 82 284 94 326 148" fill="none" stroke="#d2d2d7" strokeWidth="22" strokeLinecap="round" /><path d="M 190 110 C 390 36 540 150 444 254 C 346 356 110 294 152 150 C 172 82 284 94 326 148" fill="none" stroke={BLUE} strokeWidth="12" strokeLinecap="round" strokeDasharray={`${dash} ${dash}`} strokeDashoffset={-dash} filter={`url(#${filterId})`} /><circle cx="190" cy="110" r="20" fill={GREEN} fillOpacity=".28" stroke={GREEN} strokeWidth="4" /><circle cx="444" cy="254" r={13 + strength * .12} fill={AMBER} fillOpacity=".3" stroke={AMBER} strokeWidth="4" /><path d="M 317 127 l 15 21 l -25 1" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></Frame>;
}

const SCENES = { time_decay: TimeDecay, risk_ticker: RiskTicker, flow: Flow, branching: Branching, layers: Layers, feedback_loop: FeedbackLoop };

export default function MetaphorScene({ metaphor, values = {}, interactions = [], reducedMotion = false }) {
  const type = metaphorFor(metaphor);
  const rawId = useId();
  const filterId = `ink-${rawId.replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const rootRef = useRef(null);
  const Scene = SCENES[type];
  useEffect(() => {
    if (!rootRef.current || reducedMotion) return undefined;
    const context = gsap.context(() => gsap.fromTo(rootRef.current, { autoAlpha: .7, scale: .985 }, { autoAlpha: 1, scale: 1, duration: .35, ease: 'power2.out' }), rootRef.current);
    return () => context.revert();
  }, [type, values, reducedMotion]);
  return <div ref={rootRef} className={`metaphor-scene metaphor-scene--${type}`} data-metaphor={type} data-interaction-count={interactions.length}><Scene values={values} filterId={filterId} /></div>;
}
