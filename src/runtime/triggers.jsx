import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { ScrollTrigger };

export function createScrollTrigger({ trigger, timeline, scroller, distance = 2400, pinOffset = 0, onProgress }) {
  return ScrollTrigger.create({
    id: 'scene-runtime-scroll',
    trigger,
    scroller: scroller || undefined,
    // Pin from the very first scroll pixel. Delaying this start makes the
    // stage travel upward before GSAP takes control, which reads as a shake.
    // The fixed pin retains its measured document offset under the sticky
    // application header.
    start: 0,
    end: `+=${distance}`,
    pin: true,
    // This is the native page scroller, so keep the pinned stage on the
    // browser's fixed layer. Transform pinning moves the entire scene on
    // every wheel tick and is what made the card, copy, and canvas jitter.
    // Only children are animated by the scrubbed master timeline.
    pinType: 'fixed',
    pinSpacing: true,
    scrub: true,
    invalidateOnRefresh: true,
    animation: timeline,
    onUpdate: (self) => onProgress?.(self.progress, self.direction),
  });
}

export function SliderTrigger({ label = 'Value', value, min = 0, max = 100, step = 1, onChange }) {
  const handleInput = (event) => onChange(Number(event.currentTarget.value));
  const handlePointerDown = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    const raw = min + ratio * (max - min);
    const next = Math.round(raw / step) * step;
    onChange(Math.min(max, Math.max(min, next)));
  };

  return (
    <label className="runtime-slider">
      <span>{label}</span>
      <output>{value}</output>
      <input type="range" value={value} min={min} max={max} step={step} onPointerDown={handlePointerDown} onInput={handleInput} onChange={handleInput} />
    </label>
  );
}
