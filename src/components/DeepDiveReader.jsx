import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { deepDiveLessons } from '../data/deepDiveLessons';
import HoverGlossary from './HoverGlossary';
import DefinitionsPanel from './DefinitionsPanel';
import { STANDARD_SECTION_SCHEMA } from '../utils/deepDiveGenerationContract';
import searchIndex from '../data/search_index.json' with { type: 'json' };
import { SECURITISATION_MASTERCLASS } from '../data/securitisationMasterclass';

function CitationMarks({ sourceIds = [], sourceOrder }) {
  if (sourceIds.length === 0) return null;
  return (
    <sup className="deep-dive-citations" aria-label="Sources">
      {sourceIds.map((sourceId) => {
        const index = sourceOrder.indexOf(sourceId) + 1;
        return <a key={sourceId} href={`#source-${sourceId}`}>[{index}]</a>;
      })}
    </sup>
  );
}

const EMPHASIZED_TERMS = [
  'Bed Bath & Beyond', 'Quick Ratio', 'Current Ratio', 'Cash Ratio',
  'cash and cash equivalents', 'marketable securities', 'accounts receivable',
  'current liabilities', 'merchandise inventory', 'revolving credit facility',
  'borrowing-base', 'going concern', 'Chapter 11', 'Form 10-Q', 'inventory', 'receivables',
].sort((left, right) => right.length - left.length);

const TERM_PATTERN = new RegExp(`(${EMPHASIZED_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

const PILOT_LABELS = {
  quick_ratio: 'Deep Dive: Quick Ratio',
  three_statement_modeling: 'Modeling Studio: Three-Statement Model',
  quick_ratio_decision_case: 'Case File: Liquidity Under Pressure',
  securitization_desk_pilot: 'Securitisation Desk: Pool and Waterfall',
};

const SEARCH_INDEX_ENTRIES = Object.entries(searchIndex);
const LIBRARY_LESSONS = deepDiveLessons.filter((candidate) => candidate.id !== 'securitization_desk_pilot');
const SECURITISATION_LESSONS = LIBRARY_LESSONS
  .filter((candidate) => candidate.kind === 'securitisation-desk')
  .sort((left, right) => lessonStudyOrder(left) - lessonStudyOrder(right));
const MASTERCLASS_ENTRY = {
  id: SECURITISATION_MASTERCLASS.id,
  kind: 'masterclass',
  title: SECURITISATION_MASTERCLASS.title,
  subtitle: SECURITISATION_MASTERCLASS.subtitle,
  canonicalName: 'Securitisation',
  definitionCatalog: Array.from(
    new Map(
      SECURITISATION_LESSONS
        .flatMap((lesson) => lesson.definitionCatalog ?? [])
        .map((item) => [item.id, item])
    ).values()
  ),
};
const LIBRARY_ENTRIES = [
  MASTERCLASS_ENTRY,
  ...LIBRARY_LESSONS.filter((candidate) => candidate.kind !== 'securitisation-desk'),
  ...SECURITISATION_LESSONS,
];
const SEARCH_PLACEHOLDERS = [
  'Search ratios, models, or concepts',
  'Try “working capital”',
  'Try “three-statement model”',
  'Try “credit risk”',
];

function lessonDisplayName(lesson) {
  if (lesson.kind === 'masterclass') return lesson.title;
  return lesson.canonicalName ? `Deep Dive: ${lesson.canonicalName}` : (PILOT_LABELS[lesson.id] ?? 'Deep Dive lesson');
}

function lessonTypeLabel(lesson) {
  if (lesson.kind === 'masterclass') return 'Deep Dive Masterclass';
  if (lesson.kind === 'modeling') return 'Modeling Studio';
  if (lesson.kind === 'decision-case') return 'Case File';
  if (lesson.kind === 'securitisation-desk') return 'Securitisation Desk';
  return 'Deep Dive';
}

function lessonStudyOrder(lesson) {
  if (lesson.kind === 'masterclass') return -1;
  if (!lesson.series) return Number.MAX_SAFE_INTEGER;
  return lesson.series.overallSequence ?? ((lesson.series.episodeNumber ?? 99) * 100) + (lesson.series.sequence ?? 99);
}

function normalizeSearchText(value) {
  return String(value ?? '').toLowerCase().replace(/securitisation/g, 'securitization');
}

function EditorialText({ text }) {
  return text.split(TERM_PATTERN).map((fragment, index) => (
    EMPHASIZED_TERMS.some((term) => term.toLowerCase() === fragment.toLowerCase())
      ? <span className="deep-dive-term" key={`${fragment}-${index}`}>{fragment}</span>
      : fragment
  ));
}

function NarrationControl({ lesson }) {
  const narrationEligible = lesson.id === 'quick_ratio' || lesson.audio?.screenIndependent;
  const audioRef = useRef(null);
  const [chapter, setChapter] = useState(null);
  const [status, setStatus] = useState('loading');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const audio = audioRef.current;
    audio?.pause();
    if (audio) audio.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
    setChapter(null);
    setStatus('loading');

    if (!narrationEligible) {
      setStatus('unavailable');
      return () => { cancelled = true; };
    }

    fetch(`${import.meta.env.BASE_URL}audio/deep-dive/${lesson.id}/manifest.json`)
      .then((response) => {
        if (!response.ok) throw new Error('Narration manifest unavailable');
        return response.json();
      })
      .then((manifest) => {
        if (!cancelled && manifest.chapters?.[0]) {
          setChapter(manifest.chapters[0]);
          setStatus('ready');
        }
      })
      .catch(() => {
        if (!cancelled) setStatus('unavailable');
      });

    return () => {
      cancelled = true;
      audio?.pause();
      if (audio) audio.currentTime = 0;
    };
  }, [lesson, narrationEligible]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !chapter) return;
    if (isPlaying) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setStatus('error');
    }
  };

  if (!narrationEligible) return null;

  return (
    <div className={`deep-dive-narration ${status === 'error' ? 'is-error' : ''}`}>
      <audio
        ref={audioRef}
        src={chapter?.audio ? `${import.meta.env.BASE_URL}${chapter.audio.replace(/^\//, '')}` : undefined}
        preload="metadata"
        onPlay={() => { setIsPlaying(true); setStatus('playing'); }}
        onPause={() => { setIsPlaying(false); setStatus('ready'); }}
        onEnded={() => { setIsPlaying(false); setProgress(1); setStatus('ready'); }}
        onTimeUpdate={(event) => {
          const element = event.currentTarget;
          setProgress(element.duration ? element.currentTime / element.duration : 0);
        }}
        onError={() => setStatus('error')}
      />
      <button
        type="button"
        className="deep-dive-narration-button"
        onClick={togglePlayback}
        disabled={!chapter || status === 'loading' || status === 'unavailable'}
        aria-label={isPlaying ? 'Pause lesson narration' : 'Listen to lesson'}
      >
        <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span>
        <strong>{isPlaying ? 'Pause' : 'Listen to lesson'}</strong>
      </button>
      <div className="deep-dive-narration-meta">
        <span>{status === 'error' ? 'Audio could not play' : status === 'unavailable' ? 'Narration unavailable' : status === 'loading' ? 'Preparing lesson narration' : 'Full lesson narration · Deepti'}</span>
        {false && (
        <span>{status === 'error' ? 'Audio could not play' : status === 'unavailable' ? 'Narration unavailable' : status === 'loading' ? 'Preparing narration' : 'Opening narration · Zara'}</span>
        )}
        <div className="deep-dive-narration-track" aria-hidden="true"><span style={{ transform: `scaleX(${progress})` }} /></div>
      </div>
    </div>
  );
}

function Sentence({ node, sourceOrder }) {
  return (
    <p className="deep-dive-copy">
      <EditorialText text={node.text} />
      <CitationMarks sourceIds={node.citations} sourceOrder={sourceOrder} />
    </p>
  );
}

function CramStrip({ lesson, sourceOrder }) {
  return (
    <aside className="deep-dive-cram" aria-label="Summary">
      <p className="deep-dive-cram-title">Summary</p>
      <dl>
        {lesson.cram.map((entry) => {
          const node = lesson.nodes[entry.pointer];
          return (
            <div key={entry.label}>
              <dt>{entry.label}</dt>
              <dd>
                <EditorialText text={node.text} />
                <CitationMarks sourceIds={node.citations} sourceOrder={sourceOrder} />
              </dd>
            </div>
          );
        })}
      </dl>
    </aside>
  );
}

function FilingImage({ evidence, source }) {
  const [failed, setFailed] = useState(false);
  const imageUrl = `${import.meta.env.BASE_URL}${evidence.image.replace(/^\//, '')}`;

  if (failed) {
    return (
      <a className="deep-dive-filing-fallback" href={source.url} target="_blank" rel="noreferrer">
        <strong>Open the original SEC filing</strong>
        <span>The filing image could not load in this environment.</span>
      </a>
    );
  }

  return (
    <a className="deep-dive-filing-image-link" href={source.url} target="_blank" rel="noreferrer">
      <img
        className="deep-dive-filing-image"
        src={imageUrl}
        alt={`${evidence.issuer} ${evidence.statementTitle} for ${evidence.period}, reported in ${evidence.unit}`}
        onError={() => setFailed(true)}
      />
    </a>
  );
}

function FilingExcerpt({ evidence, sourceOrder, sources }) {
  const source = sources[evidence.source];
  return (
    <figure className="deep-dive-filing-excerpt">
      <header>
        <div>
          <span>Original filing</span>
          <strong>{evidence.documentTitle}</strong>
        </div>
        <a href={source.url} target="_blank" rel="noreferrer">Open SEC filing</a>
      </header>
      <FilingImage evidence={evidence} source={source} />
      <p className="deep-dive-source-caption">Authentic capture from {source.title}. Values preserve the filing's reported units.</p>
      <p className="deep-dive-calculation"><span>Recomputed liquid coverage</span><strong>{evidence.formula}</strong><CitationMarks sourceIds={[evidence.source]} sourceOrder={sourceOrder} /></p>
      <p className="deep-dive-note">{evidence.note}<CitationMarks sourceIds={[evidence.source]} sourceOrder={sourceOrder} /></p>
    </figure>
  );
}

function SourceRecord({ evidence, sourceOrder, sources }) {
  const source = sources[evidence.source];
  return (
    <aside className="deep-dive-evidence-pending" aria-label="Primary source record">
      <span className="deep-dive-evidence-pending-kicker">Primary source</span>
      <strong>{evidence.documentTitle}</strong>
      <p>{evidence.summary ?? 'This source record anchors the lesson’s mechanics and decision implication in the governing document.'}</p>
      {evidence.image && (
        <a className="deep-dive-filing-image-link" href={source?.url ?? evidence.sourceUrl} target="_blank" rel="noreferrer">
          <img className="deep-dive-filing-image" src={`${import.meta.env.BASE_URL}${evidence.image.replace(/^\//, '')}`} alt={`Source exhibit for ${evidence.documentTitle}`} />
        </a>
      )}
      {evidence.rows?.length > 0 && (
        <dl className="deep-dive-inputs">
          {evidence.rows.map((row) => (
            <div key={row.item}>
              <dt>{row.item}</dt>
              <dd>{row.value}<CitationMarks sourceIds={[row.source]} sourceOrder={sourceOrder} /></dd>
            </div>
          ))}
        </dl>
      )}
      {source && <a href={source.url} target="_blank" rel="noreferrer">Open the source document <CitationMarks sourceIds={[evidence.source]} sourceOrder={sourceOrder} /></a>}
    </aside>
  );
}

function DecisionDiagram({ diagram, sourceOrder }) {
  const inputs = diagram.inputs?.length ? diagram.inputs : ['Source-defined inputs'];
  return (
    <figure className="deep-dive-diagram deep-dive-diagram-pending">
      <figcaption>{diagram.title}<CitationMarks sourceIds={[diagram.source]} sourceOrder={sourceOrder} /></figcaption>
      <div className="deep-dive-reasoning-map" aria-label={`${diagram.title} decision flow`}>
        <div><strong>Inputs</strong><span>{inputs.join(', ')}</span></div>
        <div><strong>Mechanism</strong><span>{diagram.transformation}</span></div>
        <div><strong>Decision</strong><span>{diagram.decision}</span></div>
      </div>
      <p className="deep-dive-note">{diagram.insight}</p>
    </figure>
  );
}

function LiquidityDiagram({ diagram, sourceOrder }) {
  const cashCoverage = (diagram.cash / diagram.liabilities) * 100;
  const uncovered = 100 - cashCoverage;
  return (
    <figure className="deep-dive-diagram">
      <figcaption>{diagram.title}<CitationMarks sourceIds={[diagram.source]} sourceOrder={sourceOrder} /></figcaption>
      <div className="deep-dive-liquidity-waterfall" aria-label="Cash passes the immediate-conversion test and covers six percent of current liabilities; inventory remains excluded until sold">
        <div className="deep-dive-asset-stack">
          <p>Reported current assets</p>
          <div className="deep-dive-asset-slice is-cash">
            <span>Cash</span>
            <strong>{diagram.cashLabel}</strong>
          </div>
          <div className="deep-dive-asset-slice is-inventory">
            <span>Inventory</span>
            <strong>{diagram.inventoryLabel}</strong>
          </div>
        </div>
        <div className="deep-dive-conversion-test" aria-hidden="true">
          <span>Immediate conversion test</span>
          <div className="is-admitted">Qualifies</div>
          <div className="is-excluded">Requires a sale</div>
        </div>
        <div className="deep-dive-liability-claim">
          <p>Current liabilities</p>
          <strong>{diagram.liabilitiesLabel}</strong>
          <div className="deep-dive-liability-column" style={{ '--cash-coverage': `${cashCoverage}%` }}>
            <div className="is-uncovered"><span>{uncovered.toFixed(1)}%</span><small>depends on conversion or funding</small></div>
            <div className="is-covered"><span>{cashCoverage.toFixed(1)}%</span><small>covered by reported cash</small></div>
          </div>
        </div>
      </div>
      <p className="deep-dive-note">{diagram.insight}</p>
    </figure>
  );
}

function MasteryQuestions({ questions }) {
  return (
    <div className="deep-dive-interview-answers">
      {questions.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p><EditorialText text={item.answer} /></p>
        </details>
      ))}
    </div>
  );
}

function StandardArticle({ lesson, sourceOrder }) {
  return (
    <>
      <CramStrip lesson={lesson} sourceOrder={sourceOrder} />
      <div className="deep-dive-article-body">
        {lesson.sections.map((section) => (
          <section id={`section-${section.id}`} key={section.id} className={`deep-dive-section deep-dive-section-${section.id}`}>
            <h2>{section.heading}</h2>
            {section.sentences?.map((nodeId) => <Sentence key={nodeId} node={lesson.nodes[nodeId]} sourceOrder={sourceOrder} />)}
            {section.body?.map((paragraph) => <p key={paragraph} className="deep-dive-copy"><EditorialText text={paragraph} /><CitationMarks sourceIds={section.citations} sourceOrder={sourceOrder} /></p>)}
            {section.formula && <HoverGlossary formula={lesson.formulas[section.formula]} />}
            {section.evidence && <SourceRecord evidence={section.evidence} sourceOrder={sourceOrder} sources={lesson.sources} />}
            {section.diagram && (Number.isFinite(section.diagram.cash) && Number.isFinite(section.diagram.liabilities)
              ? <LiquidityDiagram diagram={section.diagram} sourceOrder={sourceOrder} />
              : <DecisionDiagram diagram={section.diagram} sourceOrder={sourceOrder} />)}
            {section.reasoningMap && (
              <ol className="deep-dive-reasoning-map">
                {section.reasoningMap.map((item) => <li key={item.term}><strong>{item.term}</strong><span>{item.detail}</span></li>)}
              </ol>
            )}
            {section.quote && (
              <blockquote className="deep-dive-quote">
                <p>{section.quote}</p>
              </blockquote>
            )}
            {section.conclusionQuestions && (
              <MasteryQuestions questions={section.conclusionQuestions} />
            )}
          </section>
        ))}
      </div>
    </>
  );
}

function ModelingLab({ lesson, sourceOrder }) {
  return (
    <div className="deep-dive-article-body deep-dive-lab">
      <section id="section-objective" className="deep-dive-section">
        <h2>Decision Objective</h2>
        <p className="deep-dive-copy">{lesson.objective}</p>
      </section>

      <section id="section-inputs" className="deep-dive-section">
        <h2>Source Inputs</h2>
        <dl className="deep-dive-inputs">
          {lesson.inputs.map((input) => (
            <div key={input.name}>
              <dt>{input.name}</dt>
              <dd>{input.value}<CitationMarks sourceIds={[input.source]} sourceOrder={sourceOrder} /></dd>
              <span>{input.unit}</span>
            </div>
          ))}
        </dl>
      </section>

      <section id="section-build-order" className="deep-dive-section">
        <h2>Construction Sequence</h2>
        <ol className="deep-dive-build-order">
          {lesson.buildOrder.map((step) => (
            <li key={step.title}>
              <strong>{step.title}</strong>
              <p>{step.detail}<CitationMarks sourceIds={[step.source]} sourceOrder={sourceOrder} /></p>
            </li>
          ))}
        </ol>
      </section>

      <section id="section-dependency-graph" className="deep-dive-section">
        <h2>Dependency Architecture</h2>
        <div className="deep-dive-dependency-graph" role="img" aria-label="Three-statement model dependencies">
          {lesson.graph.map(([from, to]) => (
            <div key={`${from}-${to}`}><span>{from}</span><b>→</b><span>{to}</span></div>
          ))}
        </div>
      </section>

      <section id="section-checks" className="deep-dive-section">
        <h2>Model Integrity Checks</h2>
        <div className="deep-dive-checks">
          {lesson.checks.map((check) => (
            <div key={check.title}>
              <strong>{check.title}</strong>
              <p>{check.detail}<CitationMarks sourceIds={[check.source]} sourceOrder={sourceOrder} /></p>
            </div>
          ))}
        </div>
      </section>

      <section id="section-scenario-change" className="deep-dive-section">
        <h2>Scenario Transmission</h2>
        <Sentence node={lesson.nodes[lesson.scenario.sentence]} sourceOrder={sourceOrder} />
        <p className="deep-dive-copy">{lesson.scenario.trace}</p>
      </section>

      <section id="section-output-interpretation" className="deep-dive-section">
        <h2>Decision Interpretation</h2>
        <p className="deep-dive-copy">{lesson.output}</p>
      </section>

      <section id="section-audit-questions" className="deep-dive-section">
        <h2>Model Review Questions</h2>
        <MasteryQuestions questions={lesson.auditQuestions} />
      </section>
    </div>
  );
}

function DecisionCase({ lesson, sourceOrder }) {
  return (
    <div className="deep-dive-article-body deep-dive-decision-case">
      {lesson.sections.map((section) => (
        <section id={`section-${section.id}`} key={section.id} className={`deep-dive-section deep-dive-section-${section.id}`}>
          <h2>{section.heading}</h2>
          {section.body && <p className="deep-dive-copy"><EditorialText text={section.body} /></p>}
          {section.id === 'verified-evidence' && (
            <dl className="deep-dive-inputs">
              {lesson.inputs.map((input) => (
                <div key={input.name}>
                  <dt>{input.name}</dt>
                  <dd>{input.value}<CitationMarks sourceIds={[input.sourceId]} sourceOrder={sourceOrder} /></dd>
                  <span>{input.unit} · {input.asOfDate.replaceAll('-', ' / ')}</span>
                </div>
              ))}
            </dl>
          )}
          {section.id === 'committee-mandate' && (
            <div className="deep-dive-checks">
              {lesson.options.map((option) => <div key={option.title}><strong>{option.title}</strong><p>{option.detail}</p></div>)}
            </div>
          )}
          {section.id === 'proposed-position' && (
            <p className="deep-dive-copy"><strong>Recommendation: </strong>{lesson.answerKey.recommendation}</p>
          )}
          {section.id === 'committee-examination' && <MasteryQuestions questions={lesson.challengeQuestions} />}
          {section.id === 'reasoned-resolution' && (
            <div className="deep-dive-decision-answer">
              <p><strong>Reasoning</strong>{lesson.answerKey.reasoning}</p>
              <p><strong>Evidence required</strong>{lesson.answerKey.evidenceRequired}</p>
              <p><strong>What would reverse the position</strong>{lesson.answerKey.reversalEvidence}</p>
              <p><strong>Tempting wrong answer</strong>{lesson.answerKey.temptingWrongAnswer}</p>
              <p><strong>Committee follow-up</strong>{lesson.answerKey.followUpQuestion}</p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function SecuritisationDesk({ lesson, sourceOrder }) {
  return (
    <div className="deep-dive-article-body deep-dive-securitisation-desk">
      {lesson.sections.map((section) => (
        <section id={`section-${section.id}`} key={section.id} className="deep-dive-section">
          <h2>{section.heading}</h2>
          {section.body?.map((paragraph) => <p key={paragraph} className="deep-dive-copy"><EditorialText text={paragraph} /></p>)}
          {section.id === 'transaction-mandate' && (
            <>
              <p className="deep-dive-copy"><strong>Role: </strong>{lesson.role}</p>
              <p className="deep-dive-copy"><strong>Decision: </strong>{lesson.decision}</p>
            </>
          )}
          {section.id === 'pool-data-room' && (
            <dl className="deep-dive-inputs">
              {lesson.inputs.map((input) => (
                <div key={input.name}>
                  <dt>{input.name}</dt>
                  <dd>{input.value}<CitationMarks sourceIds={[input.sourceId]} sourceOrder={sourceOrder} /></dd>
                  <span>{input.unit} · {input.asOfDate}</span>
                </div>
              ))}
            </dl>
          )}
          {section.id === 'structure-design' && (
            <>
              <div className="deep-dive-checks">
                {lesson.parties.map((party) => <div key={party.name}><strong>{party.name}</strong><p>{party.responsibility}</p></div>)}
              </div>
              <div className="deep-dive-checks deep-dive-tranches">
                {lesson.tranches.map((tranche) => <div key={tranche.name}><strong>{tranche.name}</strong><p>{tranche.priority} Data required: {tranche.dataRequirement}</p></div>)}
              </div>
            </>
          )}
          {section.id === 'priority-of-payments' && (
            <ol className="deep-dive-build-order">
              {lesson.waterfall.map((step) => <li key={step.step}><strong>{step.name}</strong><p>{step.consequence}</p></li>)}
            </ol>
          )}
          {section.id === 'credit-enhancement-triggers' && (
            <div className="deep-dive-checks">
              {lesson.triggers.map((trigger) => <div key={trigger.name}><strong>{trigger.name}</strong><p>Threshold: {trigger.threshold}. {trigger.consequence}</p></div>)}
            </div>
          )}
          {section.id === 'stress-transmission' && <p className="deep-dive-copy"><EditorialText text={lesson.stress.trace} /></p>}
          {section.id === 'investment-committee-memo' && <p className="deep-dive-copy"><EditorialText text={lesson.decisionMemo} /></p>}
          {section.id === 'desk-drill' && <MasteryQuestions questions={lesson.reviewQuestions} />}
        </section>
      ))}
    </div>
  );
}

function Sources({ lesson, sourceOrder }) {
  return (
    <footer className="deep-dive-sources">
      <h2>Sources</h2>
      <ol>
        {sourceOrder.map((sourceId) => {
          const source = lesson.sources[sourceId];
          return (
            <li id={`source-${sourceId}`} key={sourceId}>
              <a href={source.url} target="_blank" rel="noreferrer">{source.title}</a>
              <span>{source.publisher}</span>
            </li>
          );
        })}
      </ol>
    </footer>
  );
}

const MODELING_LAB_ANCHORS = [
  ['objective', 'Objective'],
  ['inputs', 'Inputs'],
  ['build-order', 'Build'],
  ['dependency-graph', 'Architecture'],
  ['checks', 'Checks'],
  ['scenario-change', 'Scenario'],
  ['output-interpretation', 'Decision Use'],
  ['audit-questions', 'Review'],
];

const SECURITISATION_DESK_ANCHORS = [
  ['transaction-mandate', 'Mandate'],
  ['pool-data-room', 'Pool Data'],
  ['structure-design', 'Structure'],
  ['priority-of-payments', 'Waterfall'],
  ['credit-enhancement-triggers', 'Protection'],
  ['stress-transmission', 'Stress'],
  ['investment-committee-memo', 'Decision'],
  ['desk-drill', 'Applied Questions'],
];

function useActiveNavigationItem(items) {
  const [activeItemId, setActiveItemId] = useState(items[0]?.id);

  useEffect(() => {
    setActiveItemId(items[0]?.id);
    const targets = items
      .map((item) => ({ item, element: document.getElementById(item.targetId) }))
      .filter(({ element }) => element);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top);
      const activeTarget = targets.find(({ element }) => element === visible[0]?.target);
      if (activeTarget) setActiveItemId(activeTarget.item.id);
    }, {
      rootMargin: '-112px 0px -68% 0px',
      threshold: [0, 0.2, 0.6],
    });
    targets.forEach(({ element }) => observer.observe(element));
    return () => observer.disconnect();
  }, [items]);

  return activeItemId;
}

function ReadingNavigation({ lesson, items, activeItemId, ariaLabel, showSearchShortcut = false, onSearchClick }) {
  const activeItem = items.find((item) => item.id === activeItemId) ?? items[0];
  const renderLinks = (className) => (
    <div className={className}>
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.targetId}`}
          className={activeItemId === item.id ? 'is-active' : ''}
          aria-current={activeItemId === item.id ? 'location' : undefined}
        >
          {item.label}
        </a>
      ))}
    </div>
  );

  return (
    <>
      <nav className="deep-dive-chapter-shelf" aria-label={ariaLabel}>
        <div className="deep-dive-shelf-definitions"><DefinitionsPanel lesson={lesson} /></div>
        <div className="deep-dive-shelf-capsule" tabIndex="0" aria-label={`Show ${ariaLabel.toLowerCase()}`}>
          <span className="deep-dive-shelf-progress" aria-hidden="true"><i /></span>
          <strong>{activeItem?.label}</strong>
        </div>
        <div className="deep-dive-shelf-panel">
          <header>
            <span>Current chapter</span>
            <strong>{activeItem?.label}</strong>
          </header>
          {showSearchShortcut && (
            <button className="deep-dive-shelf-search" type="button" onClick={onSearchClick}>Find a lesson</button>
          )}
          {renderLinks('deep-dive-shelf-links')}
        </div>
      </nav>
      <nav className="deep-dive-mobile-tabs" aria-label={ariaLabel}>
        <DefinitionsPanel lesson={lesson} />
        {renderLinks('deep-dive-mobile-tab-links')}
      </nav>
    </>
  );
}

function ArticleAnchorBar({ lesson, showSearchShortcut, onSearchClick }) {
  const anchors = useMemo(() => (
    lesson.kind === 'modeling'
      ? MODELING_LAB_ANCHORS.map(([id, label]) => ({ id, label, targetId: `section-${id}` }))
      : lesson.kind === 'securitisation-desk'
        ? SECURITISATION_DESK_ANCHORS.map(([id, label]) => ({ id, label, targetId: `section-${id}` }))
      : lesson.sections.map((section) => {
        const schema = STANDARD_SECTION_SCHEMA.find((item) => item.heading === section.heading);
        return { id: section.id, label: schema?.navigationLabel ?? section.heading, targetId: `section-${section.id}` };
      })
  ), [lesson]);
  const activeSection = useActiveNavigationItem(anchors);

  return <ReadingNavigation lesson={lesson} items={anchors} activeItemId={activeSection} ariaLabel="Lesson sections" showSearchShortcut={showSearchShortcut} onSearchClick={onSearchClick} />;
}

function MasterclassAnchorBar({ lesson }) {
  const items = useMemo(() => [
    { id: 'overview', label: 'Overview', targetId: 'masterclass-overview' },
    ...SECURITISATION_MASTERCLASS.episodes.map((episode) => ({
      id: episode.id,
      label: `${episode.number}. ${episode.title}`,
      targetId: `masterclass-episode-${episode.id}`,
    })),
  ], []);
  const activeEpisode = useActiveNavigationItem(items);

  return <ReadingNavigation lesson={lesson} items={items} activeItemId={activeEpisode} ariaLabel="Securitisation masterclass episodes" />;
}

function MasterclassArticle({ onOpenLesson }) {
  return (
    <article className="deep-dive-page deep-dive-masterclass-page" data-kind="masterclass">
      <header className="deep-dive-hero">
        <p>Deep Dive Masterclass</p>
        <div className="deep-dive-series-marker">
          <span>Structured credit</span>
          <strong>7 episodes</strong>
          <em>25 ordered lessons</em>
        </div>
        <h1>{SECURITISATION_MASTERCLASS.title}</h1>
        <div>{SECURITISATION_MASTERCLASS.subtitle}. Begin with the architecture and follow the sequence through collateral, legal isolation, cash-flow allocation, capital structure, risk transfer, and market liquidity.</div>
      </header>

      <div className="deep-dive-reveal">
        <section id="masterclass-overview" className="deep-dive-masterclass-overview">
          <p className="deep-dive-masterclass-kicker">Complete study path</p>
          <h2>One transaction. Seven lenses.</h2>
          <p>Securitisation is not one formula. It is a chain of legal rights, collateral behaviour, servicing controls, cash-flow timing, payment priority, credit enhancement, and investor protection. Each episode isolates one link and then reconnects it to the transaction as a whole.</p>
        </section>

        <div className="deep-dive-masterclass-episodes">
          {SECURITISATION_MASTERCLASS.episodes.map((episode) => {
            const lessons = episode.topicIds
              .map((topicId) => SECURITISATION_LESSONS.find((candidate) => candidate.topicId === topicId))
              .filter(Boolean);
            return (
              <section id={`masterclass-episode-${episode.id}`} className="deep-dive-masterclass-episode" key={episode.id}>
                <header>
                  <span>Episode {episode.number} of {SECURITISATION_MASTERCLASS.episodes.length}</span>
                  <h2>{episode.title}</h2>
                  <p>{lessons.length} lessons in sequence</p>
                </header>
                <ol>
                  {lessons.map((lesson) => (
                    <li key={lesson.id}>
                      <button type="button" onClick={() => onOpenLesson(lesson.id)}>
                        <span>Lesson {lesson.series.overallSequence}</span>
                        <strong>{lesson.canonicalName}</strong>
                        <em>{lesson.title}</em>
                        <span aria-hidden="true">Open</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}

function DeepDiveArticle({ lesson }) {
  const sourceOrder = useMemo(() => Object.keys(lesson.sources), [lesson]);

  return (
    <article className="deep-dive-page" data-kind={lesson.kind}>
      <header className="deep-dive-hero">
        <p>{lesson.eyebrow}</p>
        {lesson.date && <time>{lesson.date}</time>}
        {lesson.series && (
          <div className="deep-dive-series-marker" aria-label={`${lesson.series.title}, lesson ${lesson.series.overallSequence} of ${lesson.series.totalLessons}, episode ${lesson.series.episodeNumber} of ${lesson.series.totalEpisodes}`}>
            <span>{lesson.series.title}</span>
            <strong>Lesson {lesson.series.overallSequence} of {lesson.series.totalLessons}</strong>
            <em>Episode {lesson.series.episodeNumber} of {lesson.series.totalEpisodes} · {lesson.series.sequence} of {lesson.series.topicCount}: {lesson.series.episodeTitle}</em>
          </div>
        )}
        <h1>{lesson.title}</h1>
        <div>
          <EditorialText text={lesson.dek} />
          <CitationMarks sourceIds={lesson.dekSourceIds} sourceOrder={sourceOrder} />
        </div>
        <NarrationControl lesson={lesson} />
      </header>
      <div className="deep-dive-reveal">
        {lesson.kind === 'modeling'
          ? <ModelingLab lesson={lesson} sourceOrder={sourceOrder} />
          : lesson.kind === 'decision-case'
            ? <DecisionCase lesson={lesson} sourceOrder={sourceOrder} />
            : lesson.kind === 'securitisation-desk'
              ? <SecuritisationDesk lesson={lesson} sourceOrder={sourceOrder} />
            : <StandardArticle lesson={lesson} sourceOrder={sourceOrder} />}
        <Sources lesson={lesson} sourceOrder={sourceOrder} />
      </div>
    </article>
  );
}

export default function DeepDiveReader({ initialLessonId = null, onClose = null }) {
  const [activeId, setActiveId] = useState(initialLessonId);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const searchBarRef = useRef(null);
  const [showSearchShortcut, setShowSearchShortcut] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const isMasterclass = activeId === SECURITISATION_MASTERCLASS.id;
  const lesson = activeId ? LIBRARY_LESSONS.find((candidate) => candidate.id === activeId) ?? null : null;
  const activeContent = lesson || isMasterclass;
  const filteredLessons = useMemo(() => {
    const needle = normalizeSearchText(searchQuery.trim());
    if (!needle) return [];
    return LIBRARY_ENTRIES.filter((candidate) => {
      const searchableText = [
        lessonDisplayName(candidate),
        lessonTypeLabel(candidate),
        candidate.title,
        candidate.subtitle,
        candidate.series?.title,
        candidate.series?.episodeTitle,
      ].map(normalizeSearchText).join(' ');
      const directMatch = searchableText.includes(needle);
      const candidateIds = new Set([candidate.id, candidate.topicId, candidate.id === 'quick_ratio_decision_case' ? 'quick_ratio' : null].filter(Boolean));
      const indexedMatch = SEARCH_INDEX_ENTRIES.some(([term, topicId]) => candidateIds.has(topicId) && normalizeSearchText(term).includes(needle));
      return directMatch || indexedMatch;
    }).sort((left, right) => lessonStudyOrder(left) - lessonStudyOrder(right));
  }, [searchQuery]);

  useEffect(() => {
    if (!activeContent || !searchBarRef.current) {
      setShowSearchShortcut(false);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setShowSearchShortcut(!entry.isIntersecting);
    }, { rootMargin: '-58px 0px 0px', threshold: 0 });
    observer.observe(searchBarRef.current);
    return () => observer.disconnect();
  }, [activeContent]);

  useEffect(() => {
    const advancePlaceholder = () => setPlaceholderIndex((current) => (current + 1) % SEARCH_PLACEHOLDERS.length);
    let intervalId = window.setInterval(advancePlaceholder, 3200);
    const handleVisibility = () => {
      window.clearInterval(intervalId);
      if (document.visibilityState === 'visible') intervalId = window.setInterval(advancePlaceholder, 3200);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <main className={`deep-dive-reader ${activeContent ? 'has-active-lesson' : 'is-library'}`}>
      <nav ref={searchBarRef} className="deep-dive-switcher" aria-label="Deep Dive lesson library">
        <div className="deep-dive-library-header">
          {onClose && <button type="button" onClick={onClose} className="deep-dive-library-button" aria-label="Back to Podcast">← Podcast</button>}
          <div className="deep-dive-library-title">
            <strong><span>deep</span><span>DIVE</span></strong>
          </div>
          <form
            className="deep-dive-search-field"
            onSubmit={(event) => {
              event.preventDefault();
              const firstMatch = filteredLessons[0];
              if (firstMatch) {
                setActiveId(firstMatch.id);
                setSearchQuery('');
              }
            }}
          >
            <span>{activeContent ? 'Find another lesson' : 'Search the library'}</span>
            <input
              ref={searchInputRef}
              autoFocus={!activeContent}
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder=""
              aria-label="Search Deep Dive lessons"
            />
            <AnimatePresence mode="wait">
              {!searchQuery && (
                <motion.p
                  key={SEARCH_PLACEHOLDERS[placeholderIndex]}
                  className="deep-dive-search-placeholder"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                >
                  {SEARCH_PLACEHOLDERS[placeholderIndex]}
                </motion.p>
              )}
            </AnimatePresence>
            <button
              className="deep-dive-search-submit"
              disabled={!searchQuery.trim() || filteredLessons.length === 0}
              type="submit"
              aria-label="Open first matching lesson"
            >
              <motion.svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <motion.path
                  d="M5 12h14m-6-6 6 6-6 6"
                  initial={{ pathLength: 0.55 }}
                  animate={{ pathLength: searchQuery ? 1 : 0.55 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                />
              </motion.svg>
            </button>
          </form>
          {activeContent && (
            <button
              className="deep-dive-library-button"
              type="button"
              onClick={() => {
                setActiveId(lesson?.kind === 'securitisation-desk' ? SECURITISATION_MASTERCLASS.id : null);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span aria-hidden="true">⌘</span>
              {lesson?.kind === 'securitisation-desk' ? 'Securitisation' : 'All lessons'}
            </button>
          )}
        </div>
        {searchQuery.trim() && (
          <div className="deep-dive-search-results" role="listbox" aria-label="Deep Dive lessons">
            {filteredLessons.map((candidate) => (
              <button
                key={candidate.id}
                type="button"
                role="option"
                aria-selected={candidate.id === activeId}
                className={candidate.id === activeId ? 'is-active' : ''}
                onClick={() => { setActiveId(candidate.id); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              >
                <span className="deep-dive-search-result-type">{lessonTypeLabel(candidate)}</span>
                <strong>{lessonDisplayName(candidate).replace(/^Deep Dive: /, '')}</strong>
                {candidate.series && <small className="deep-dive-search-result-order">Lesson {candidate.series.overallSequence} · Episode {candidate.series.episodeNumber}</small>}
                <span className="deep-dive-search-result-arrow" aria-hidden="true">↗</span>
              </button>
            ))}
            {filteredLessons.length === 0 && <p className="deep-dive-search-empty">No lesson matches “{searchQuery}”.</p>}
          </div>
        )}
      </nav>
      {activeContent && (
        <>
          {isMasterclass
            ? <MasterclassAnchorBar lesson={MASTERCLASS_ENTRY} />
            : <ArticleAnchorBar
              lesson={lesson}
              showSearchShortcut={showSearchShortcut}
              onSearchClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.setTimeout(() => searchInputRef.current?.focus(), 260);
              }}
            />}
          {isMasterclass
            ? <MasterclassArticle onOpenLesson={(lessonId) => { setActiveId(lessonId); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
            : <DeepDiveArticle lesson={lesson} />}
        </>
      )}
    </main>
  );
}
