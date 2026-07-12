import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MetaphorScene from './MetaphorScene.jsx';
import { heroCopyFor } from './StoryHero.model.js';

gsap.registerPlugin(ScrollTrigger);
export { heroCopyFor } from './StoryHero.model.js';

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

export default function StoryHero({ story, scrollerRef, values = {}, activeKey }) {
  const rootRef = useRef(null);
  const pinRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const panels = useMemo(() => (story?.panels?.length ? story.panels : [{ narration: heroCopyFor(story, 'prologue')[0], visual: story?.visual }]).slice(0, 4), [story]);
  const reveal = heroCopyFor(story, 'reveal');

  useEffect(() => {
    if (!rootRef.current || !pinRef.current) return undefined;
    const media = gsap.matchMedia();
    const scope = rootRef.current;
    media.add(
      { reduceMotion: '(prefers-reduced-motion: reduce)' },
      ({ conditions }) => {
        const noMotion = conditions.reduceMotion || reducedMotion;
        gsap.set('[data-story="card"]', { autoAlpha: noMotion ? 1 : 0, scale: noMotion ? 1 : 0.82 });
        gsap.set('[data-story="scene"]', { autoAlpha: noMotion ? 0 : 1, scale: noMotion ? 0.96 : 1 });
        gsap.set('[data-story="panel"]', { autoAlpha: 0, y: 18 });
        gsap.set('[data-story="panel"][data-panel-index="0"]', { autoAlpha: noMotion ? 0 : 1, y: 0 });
        gsap.set('[data-story="title"]', { autoAlpha: noMotion ? 1 : 0, y: noMotion ? 0 : 24 });
        gsap.set('[data-story="definition"]', { autoAlpha: noMotion ? 1 : 0, y: noMotion ? 0 : 18 });
        if (noMotion) return undefined;

        const timeline = gsap.timeline({
          defaults: { ease: 'power3.inOut' },
          scrollTrigger: {
            id: `story-hero-${activeKey}`,
            trigger: scope,
            scroller: scrollerRef?.current || undefined,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.7,
            pin: pinRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
          },
        });

        // Stage 1: comic panels resolve before title or definition exists.
        timeline.addLabel('panels');
        panels.slice(0, -1).forEach((_, index) => {
          timeline
            .to(`[data-story="panel"][data-panel-index="${index}"]`, { autoAlpha: 0, y: -18, duration: 0.42 })
            .to(`[data-story="panel"][data-panel-index="${index + 1}"]`, { autoAlpha: 1, y: 0, duration: 0.42 }, '<+=0.14');
        });
        timeline
          .to('[data-story="scene"]', { autoAlpha: 0, scale: 0.9, duration: 0.62 })
          .addLabel('reveal')
          .to('[data-story="card"]', { autoAlpha: 1, duration: 0.35 }, '<')
          .to('[data-story="title"]', { autoAlpha: 1, y: 0, duration: 0.32 }, '+=0.08')
          .to('[data-story="definition"]', { autoAlpha: 1, y: 0, duration: 0.28 }, '+=0.06')
          // Stage 2 -> 3: only after the reveal does the frame open.
          .addLabel('expand')
          .to('[data-story="card"]', { scale: 1, borderRadius: 0, duration: 0.85 }, '+=0.16');

        return () => timeline.kill();
      }, scope,
    );
    return () => media.revert();
  }, [activeKey, panels, reducedMotion, scrollerRef]);

  return (
    <section ref={rootRef} className="story-hero relative h-[320vh] bg-[#fbfbfd]">
      <div ref={pinRef} className="story-hero__pin relative h-screen w-full overflow-hidden">
        <div data-story="scene" className="absolute inset-0 z-10 flex h-full w-full items-center justify-center px-6 py-16 md:px-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#fff_0%,#fbfbfd_62%,#f2f2f7_100%)]" />
          <div className="relative grid h-full w-full max-w-[1400px] items-center gap-6 md:grid-cols-[.85fr_1.5fr]">
            <div className="relative z-10 h-full min-h-[320px] md:col-span-2">
              {panels.map((panel, index) => <div key={panel.id ?? index} data-story="panel" data-panel-index={index} className={`absolute inset-0 flex items-center ${index === 0 ? '' : 'opacity-0'}`}>
                <p className="story-hero__hook max-w-2xl font-serif text-[clamp(2rem,4.6vw,5.4rem)] leading-[.98] tracking-[-.06em] text-[#1d1d1f]">{panel.narration}</p>
                <div className="absolute bottom-[4%] right-[4%] h-[52%] w-[48%] md:h-[70%] md:w-[42%]"><MetaphorScene metaphor={panel.visual?.metaphor ?? story?.visual?.metaphor} values={values} interactions={story?.interactions} reducedMotion={reducedMotion} /></div>
              </div>)}
              <svg className="story-hero__protagonist pointer-events-none absolute bottom-[3%] left-[6%] h-32 w-28 md:h-44 md:w-40" viewBox="0 0 160 190" aria-hidden="true"><circle cx="80" cy="42" r="25" fill="#fbfbfd" stroke="#1d1d1f" strokeWidth="5" /><path d="M 80 68 C 49 72 40 116 46 158 M 80 68 C 111 72 120 116 114 158 M 48 96 L 18 125 M 112 96 L 143 72 M 62 157 L 48 186 M 98 157 L 112 186" fill="none" stroke="#1d1d1f" strokeWidth="6" strokeLinecap="round" /><circle cx="144" cy="70" r="10" fill="#ff9f0a" stroke="#1d1d1f" strokeWidth="4" /><path d="M 69 42 Q 80 50 91 42" fill="none" stroke="#0071e3" strokeWidth="4" strokeLinecap="round" /></svg>
            </div>
          </div>
        </div>

        <div data-story="card" className="absolute inset-0 z-20 flex h-full w-full origin-center scale-[.82] items-center justify-center border border-black/10 bg-white/96 px-7 py-16 opacity-0 shadow-[0_24px_100px_rgba(0,0,0,.12)] backdrop-blur-xl md:px-20">
          <div className="w-full max-w-5xl">
            <p data-story="title" className="max-w-5xl text-[clamp(3rem,8vw,9rem)] font-semibold leading-[.86] tracking-[-.08em] text-[#1d1d1f] opacity-0">{reveal[0]}</p>
            <p data-story="definition" className="mt-8 max-w-2xl text-[clamp(1.1rem,2vw,1.65rem)] leading-relaxed text-[#515154] opacity-0">{reveal[1]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
