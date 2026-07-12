import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'katex/dist/katex.min.css';
import waccData from '../data/chapters/wacc.json';
import dcfData from '../data/chapters/dcf.json';
import extractedTopics from '../data/extractedTopics.json';
import { ExpressionEngine } from '../utils/ExpressionEngine';
import { normalizeStoryEngine } from '../utils/storyEngine';
import HandDrawnControl from './HandDrawnControl.jsx';
import MetaphorScene from './MetaphorScene.jsx';
import StoryHero from './StoryHero.jsx';
import { formulaMarkup, uniqueMetaphors } from '../utils/lessonPresentation.js';
import { buildTopicChapter } from '../utils/topicStoryGenerator.js';

gsap.registerPlugin(ScrollTrigger);

function ScrollProgress({ container }) {
  const progressRef = useRef(null);
  useEffect(() => {
    if (!progressRef.current || !container?.current) return undefined;
    const context = gsap.context(() => {
      const tween = gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: container.current, scroller: container.current, start: 'top top', end: 'bottom bottom', scrub: true },
      });
      return () => tween.kill();
    }, progressRef.current);
    return () => context.revert();
  }, [container]);
  return <div ref={progressRef} className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left scale-x-0 bg-[#0071e3]" />;
}

function formulaFor(scene, result) {
  const latex = scene.formula_package?.latex;
  if (!latex) return null;
  return (
    <div className="mt-6 border-t border-black/10 pt-4">
      <div className="formula-display overflow-x-auto text-[#1d1d1f]" aria-label={latex} dangerouslySetInnerHTML={{ __html: formulaMarkup(latex) }} />
      {result !== null && <p className="mt-2 text-lg font-semibold tracking-tight text-[#1d1d1f]">{Number(result).toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>}
    </div>
  );
}

function LessonSection({ scene, index, story, metaphor }) {
  const inputs = scene.widget_package?.inputs ?? scene.widget_package?.config?.inputs ?? [];
  const [values, setValues] = useState(() => Object.fromEntries(inputs.map((input) => [input.name, input.default ?? input.min ?? 0])));
  const expression = scene.widget_package?.expression ?? scene.widget_package?.config?.expression;
  const computed = expression ? ExpressionEngine.evaluate(expression, values) : null;
  const result = computed?.success ? computed.result : null;
  const title = scene.transition_package?.title ?? scene.learning_objective;
  const body = scene.transition_package?.story ?? scene.learning_objective;
  const supplemental = [
    scene.eli5_package?.eli5 ?? scene.eli5_package?.analogy,
    scene.mba_package?.mba ?? scene.mba_package?.description,
    scene.interview_package?.interview ?? scene.interview_package?.answer,
  ].filter(Boolean);
  const visualValues = { ...values, result };

  return (
    <section className="border-b border-black/[.07] bg-white py-24 md:py-36">
      <div className={`mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-10 ${index % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}>
        <div>
          <p className="max-w-xl text-[clamp(2.25rem,4.5vw,4.5rem)] font-semibold leading-[.95] tracking-[-.065em] text-[#1d1d1f]">{title}</p>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#515154]">{body}</p>
          {formulaFor(scene, result)}
          {supplemental.length > 0 && (
            <details className="group mt-8 max-w-xl border-t border-black/10 pt-4">
              <summary className="cursor-pointer text-sm font-medium text-[#0071e3] marker:hidden">Go deeper <span className="ml-1 inline-block transition-transform group-open:rotate-45">+</span></summary>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-[#6e6e73]">{supplemental.map((item, i) => <p key={i}>{item}</p>)}</div>
            </details>
          )}
        </div>
        <div className="rounded-[30px] border border-white bg-[#f5f5f7] p-5 shadow-[0_20px_60px_rgba(0,0,0,.06)] md:p-8">
          <MetaphorScene metaphor={metaphor} values={visualValues} interactions={story.interactions} />
          {inputs.length > 0 && (
            <div className="mt-4 space-y-4 border-t border-black/[.08] pt-5">
              {inputs.map((input) => <HandDrawnControl key={input.name} input={input} value={values[input.name]} metaphor={story.visual.metaphor} onChange={(name, value) => setValues((old) => ({ ...old, [name]: value }))} />)}
              {scene.widget_package?.insight && <p className="text-sm leading-relaxed text-[#6e6e73]">{scene.widget_package.insight}</p>}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function LessonView({ onClose }) {
  const [activeTopic, setActiveTopic] = useState('wacc');
  const [chapterData, setChapterData] = useState(waccData);
  const scrollerRef = useRef(null);
  const concept = chapterData.canonical_concept_model ?? {};
  const curriculum = chapterData.curriculum ?? chapterData.dependency_package ?? {};
  const scenes = chapterData.scenes ?? [];
  const story = normalizeStoryEngine(chapterData);
  const sceneMetaphors = uniqueMetaphors(scenes);
  const firstInputs = scenes[0]?.widget_package?.inputs ?? scenes[0]?.widget_package?.config?.inputs ?? [];
  const firstValues = Object.fromEntries(firstInputs.map((input) => [input.name, input.default ?? input.min ?? 0]));

  useEffect(() => {
    if (activeTopic === 'wacc') setChapterData(waccData);
    else if (activeTopic === 'dcf') setChapterData(dcfData);
    else {
      const record = extractedTopics.find((topic) => `generated_${topic.id}` === activeTopic);
      if (record) setChapterData(buildTopicChapter(record));
    }
  }, [activeTopic]);

  return (
    <div ref={scrollerRef} className="relative min-h-screen flex-1 overflow-y-auto bg-white text-[#1d1d1f]">
      <ScrollProgress container={scrollerRef} />
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-black/[.06] bg-white/75 px-5 py-3 backdrop-blur-xl md:px-8">
        <select aria-label="Choose lesson" value={activeTopic} onChange={(event) => setActiveTopic(event.target.value)} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-[#1d1d1f] outline-none">
          <option value="wacc">WACC</option><option value="dcf">Discounted Cash Flow</option>
          {extractedTopics.map((topic) => <option key={topic.id} value={`generated_${topic.id}`}>{topic.title}</option>)}
        </select>
        <button onClick={onClose} className="text-sm font-medium text-[#6e6e73] transition-colors hover:text-[#1d1d1f]">Close</button>
      </header>
      <StoryHero key={activeTopic} story={story} scrollerRef={scrollerRef} values={firstValues} activeKey={activeTopic} />
      <main>{scenes.map((scene, index) => <LessonSection key={`${activeTopic}-${index}`} scene={scene} index={index} story={story} metaphor={sceneMetaphors[index]} />)}</main>
      <footer className="bg-[#f5f5f7] px-6 py-24 text-center">
        <p className="mx-auto max-w-2xl text-3xl font-semibold tracking-[-.05em] text-[#1d1d1f]">{story.narrative.payoff || concept.purpose || 'Carry the picture with you.'}</p>
        {curriculum.prerequisites?.length > 0 && <p className="mt-5 text-sm text-[#6e6e73]">Built on {curriculum.prerequisites.join(' · ')}</p>}
        <button onClick={onClose} className="mt-9 rounded-full bg-[#0071e3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0077ed]">Complete lesson</button>
      </footer>
    </div>
  );
}
