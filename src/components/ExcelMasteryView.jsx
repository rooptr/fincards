import { useEffect, useMemo, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { excelMasteryData } from '../data/excelMasteryData';
import { normalizeFormulaSource } from '../utils/excelFormula.js';

const pageFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif';
const displayFont = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif';
const ink = '#173125';
const muted = '#617269';
const green = '#107c41';
const paleGreen = '#e8f3eb';
const border = '#dbe6dd';

function FormulaBox({ formula }) {
  const renderedFormula = useMemo(() => {
    if (!formula) return { value: null, isHtml: false };

    const cleanFormula = normalizeFormulaSource(formula);

    try {
      return {
        value: katex.renderToString(cleanFormula, { throwOnError: false, displayMode: false }),
        isHtml: true,
      };
    } catch {
      return { value: cleanFormula, isHtml: false };
    }
  }, [formula]);

  if (!renderedFormula.value) return null;

  return (
    <div
      style={{
        marginTop: 18,
        padding: '14px 16px',
        borderRadius: 12,
        background: '#173125',
        color: '#f5fff7',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ed2aa', marginBottom: 8 }}>
        Formula
      </div>
      {renderedFormula.isHtml ? (
        <div style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#f5fff7' }} dangerouslySetInnerHTML={{ __html: renderedFormula.value }} />
      ) : (
        <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 14, whiteSpace: 'pre-wrap', color: '#f5fff7' }}>
          {renderedFormula.value}
        </div>
      )}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div style={{ display: 'grid', gap: 3 }}>
      <strong style={{ fontSize: 22, lineHeight: 1, color: ink, fontWeight: 650 }}>{value}</strong>
      <span style={{ fontSize: 12, color: muted, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

export default function ExcelMasteryView({ onBack }) {
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const itemCount = excelMasteryData.reduce((total, section) => total + section.items.length, 0);

  useEffect(() => {
    const sections = sectionRefs.current.filter(Boolean);
    if (!sections.length || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(Number(visible.target.dataset.sectionIndex));
      },
      { root: scrollContainerRef.current, rootMargin: '-12% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionIndex) => {
    const target = sectionRefs.current[sectionIndex];
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      ref={scrollContainerRef}
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        background: '#f5f8f5',
        width: '100%',
        boxSizing: 'border-box',
        color: ink,
        fontFamily: pageFont,
      }}
    >
      <div style={{ width: '100%', maxWidth: 1180, margin: '0 auto', padding: '18px clamp(18px, 4vw, 42px) 100px', boxSizing: 'border-box' }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            border: 0,
            background: 'transparent',
            color: muted,
            padding: '8px 0',
            marginBottom: 30,
            cursor: 'pointer',
            fontFamily: pageFont,
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          ← Back to categories
        </button>

        <header style={{ background: paleGreen, border: `1px solid ${border}`, borderRadius: 24, padding: 'clamp(24px, 5vw, 48px)', marginBottom: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 760 }}>
              <div style={{ color: green, fontSize: 12, fontWeight: 750, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Excel · Finance · Modeling
              </div>
              <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(42px, 8vw, 76px)', lineHeight: 0.98, letterSpacing: '-0.055em', fontWeight: 600, margin: 0, color: ink }}>
                Excel Mastery
              </h1>
              <p style={{ fontSize: 'clamp(17px, 2.4vw, 23px)', lineHeight: 1.45, color: '#456052', maxWidth: 690, margin: '22px 0 0' }}>
                A finance-first guide to building, valuing, and auditing models that another analyst can trust.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', paddingTop: 4 }}>
              <Stat value={excelMasteryData.length} label="sections" />
              <Stat value={itemCount} label="concepts" />
            </div>
          </div>
        </header>

        <nav
          aria-label="Excel Mastery sections"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 20,
            margin: '0 -1px 34px',
            padding: '12px 10px',
            background: 'rgba(245,248,245,0.94)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            borderBottom: `1px solid ${border}`,
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            scrollbarWidth: 'none',
          }}
        >
          {excelMasteryData.map((section, index) => {
            const isActive = activeSection === index;
            return (
              <button
                key={section.section}
                type="button"
                aria-current={isActive ? 'location' : undefined}
                onClick={() => scrollToSection(index)}
                style={{
                  flexShrink: 0,
                  border: `1px solid ${isActive ? green : border}`,
                  borderRadius: 10,
                  background: isActive ? green : '#ffffff',
                  color: isActive ? '#ffffff' : '#456052',
                  padding: '9px 11px',
                  cursor: 'pointer',
                  fontFamily: pageFont,
                  fontSize: 12,
                  fontWeight: isActive ? 700 : 600,
                  textAlign: 'left',
                  transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease',
                }}
              >
                <span style={{ opacity: 0.72, marginRight: 6 }}>{String(index + 1).padStart(2, '0')}</span>
                {section.section}
              </button>
            );
          })}
        </nav>

        <main>
          {excelMasteryData.map((section, sectionIndex) => (
            <section
              key={section.section}
              id={`section-${sectionIndex}`}
              data-section-index={sectionIndex}
              ref={(node) => { sectionRefs.current[sectionIndex] = node; }}
              style={{ marginBottom: 74, scrollMarginTop: 78 }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, borderBottom: `1px solid ${border}`, paddingBottom: 18, marginBottom: 18 }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ color: green, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', paddingTop: 8 }}>{String(sectionIndex + 1).padStart(2, '0')}</span>
                  <div>
                    <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.06, letterSpacing: '-0.04em', fontWeight: 600, margin: 0, color: ink }}>
                      {section.section}
                    </h2>
                    <p style={{ maxWidth: 700, margin: '10px 0 0', color: muted, fontSize: 16, lineHeight: 1.55 }}>{section.description}</p>
                  </div>
                </div>
                <span style={{ flexShrink: 0, color: muted, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{section.items.length} lessons</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 390px), 1fr))', gap: 14 }}>
                {section.items.map((item, itemIndex) => (
                  <article key={item.id} style={{ background: '#ffffff', border: `1px solid ${border}`, borderRadius: 16, padding: '22px 22px 20px', boxShadow: '0 8px 24px rgba(25, 58, 36, 0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                      <span style={{ color: '#86a28e', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em' }}>{String(itemIndex + 1).padStart(2, '0')}</span>
                      <h3 style={{ fontFamily: displayFont, fontSize: 22, lineHeight: 1.12, letterSpacing: '-0.025em', fontWeight: 650, margin: 0, color: ink }}>{item.name}</h3>
                    </div>
                    <p style={{ margin: 0, color: '#3f5146', fontSize: 15, lineHeight: 1.58 }}>{item.description}</p>
                    <div style={{ marginTop: 18, padding: '13px 14px', borderLeft: `3px solid ${green}`, background: '#f2f7f2', borderRadius: '0 10px 10px 0' }}>
                      <div style={{ color: green, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>In the model</div>
                      <p style={{ margin: 0, color: ink, fontSize: 14, lineHeight: 1.52 }}>{item.usage}</p>
                    </div>
                    {item.watchOut && (
                      <div style={{ marginTop: 12, padding: '11px 13px', border: '1px solid #ead9a8', background: '#fffaf0', borderRadius: 10, color: '#6c561e', fontSize: 13, lineHeight: 1.5 }}>
                        <strong style={{ fontWeight: 800 }}>Watch out: </strong>{item.watchOut}
                      </div>
                    )}
                    <FormulaBox formula={item.formula} />
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
