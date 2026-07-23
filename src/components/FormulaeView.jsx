import { useEffect, useMemo, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { formulaeData } from '../data/formulaeData';
import { normalizeFormulaSource } from '../utils/excelFormula.js';

const pageFont = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", sans-serif';
const displayFont = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif';
const ink = '#1d1d1f';
const muted = '#6e6e73';
const accent = '#5e5ce6';
const border = '#e3e3e8';

function FormulaBox({ formula }) {
  const renderedFormula = useMemo(() => {
    if (!formula) return { value: null, isHtml: false };

    const cleanFormula = normalizeFormulaSource(formula);
    try {
      return {
        value: katex.renderToString(cleanFormula, { throwOnError: false, displayMode: true }),
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
        padding: '16px 18px',
        borderRadius: 14,
        border: '1px solid #dedee5',
        background: '#f7f7f9',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ color: '#8d8d96', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 750, marginBottom: 10 }}>
        Formula
      </div>
      {renderedFormula.isHtml ? (
        <div style={{ color: ink, fontSize: 'clamp(15px, 2.3vw, 23px)', minHeight: 28 }} dangerouslySetInnerHTML={{ __html: renderedFormula.value }} />
      ) : (
        <div style={{ color: ink, fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace', fontSize: 14, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
          {renderedFormula.value}
        </div>
      )}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      <strong style={{ color: ink, fontSize: 22, lineHeight: 1, fontWeight: 650 }}>{value}</strong>
      <span style={{ color: muted, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

export default function FormulaeView({ onBack }) {
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const [query, setQuery] = useState('');

  const formulaCount = formulaeData.reduce((total, section) => total + section.items.length, 0);
  const filteredSections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return formulaeData;

    return formulaeData
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => `${section.section} ${item.name} ${item.description} ${item.usage} ${item.watchOut ?? ''}`.toLowerCase().includes(normalizedQuery)),
      }))
      .filter((section) => section.items.length > 0);
  }, [query]);

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
  }, [query, filteredSections.length]);

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
        background: '#f7f7f8',
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
          style={{ border: 0, background: 'transparent', color: muted, padding: '8px 0', marginBottom: 30, cursor: 'pointer', fontFamily: pageFont, fontSize: 14, fontWeight: 600 }}
        >
          ← Back to categories
        </button>

        <header style={{ background: '#ffffff', border: `1px solid ${border}`, borderRadius: 24, padding: 'clamp(24px, 5vw, 46px)', marginBottom: 20, boxShadow: '0 12px 40px rgba(30, 30, 50, 0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ maxWidth: 760 }}>
              <div style={{ color: accent, fontSize: 12, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>
                Finance · Accounting · Markets
              </div>
              <h1 style={{ fontFamily: displayFont, fontSize: 'clamp(44px, 8vw, 78px)', lineHeight: 0.98, letterSpacing: '-0.06em', fontWeight: 600, margin: 0, color: ink }}>
                Formula Atlas
              </h1>
              <p style={{ color: '#5b5b63', fontSize: 'clamp(17px, 2.4vw, 22px)', lineHeight: 1.45, maxWidth: 700, margin: '20px 0 0' }}>
                The formulas behind valuation, accounting, credit, fixed income, risk, derivatives, and transaction work.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', paddingTop: 4 }}>
              <Stat value={formulaeData.length} label="sections" />
              <Stat value={formulaCount} label="formulas" />
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: 10, maxWidth: 620, marginTop: 28, padding: '12px 14px', border: `1px solid ${border}`, borderRadius: 13, background: '#fbfbfc' }}>
            <span aria-hidden="true" style={{ color: accent, fontSize: 20, lineHeight: 1 }}>⌕</span>
            <span className="sr-only">Search formulas</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search formulas, concepts, or use cases"
              aria-label="Search formulas, concepts, or use cases"
              style={{ width: '100%', border: 0, outline: 0, background: 'transparent', color: ink, fontFamily: pageFont, fontSize: 15 }}
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear formula search" style={{ border: 0, background: 'transparent', color: muted, cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>
                ×
              </button>
            )}
          </label>
        </header>

        <nav
          aria-label="Formula Atlas sections"
          style={{ position: 'sticky', top: 0, zIndex: 20, margin: '0 -1px 34px', padding: '12px 10px', background: 'rgba(247,247,248,0.94)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', borderBottom: `1px solid ${border}`, display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none' }}
        >
          {formulaeData.map((section, index) => {
            const isActive = activeSection === index;
            const isVisible = filteredSections.some((visibleSection) => visibleSection.section === section.section);
            return (
              <button
                key={section.section}
                type="button"
                disabled={!isVisible}
                aria-current={isActive ? 'location' : undefined}
                onClick={() => scrollToSection(index)}
                style={{ flexShrink: 0, border: `1px solid ${isActive ? accent : border}`, borderRadius: 10, background: isActive ? accent : '#ffffff', color: isActive ? '#ffffff' : isVisible ? '#55555d' : '#b8b8c0', padding: '9px 11px', cursor: isVisible ? 'pointer' : 'default', opacity: isVisible ? 1 : 0.55, fontFamily: pageFont, fontSize: 12, fontWeight: isActive ? 700 : 600, textAlign: 'left', transition: 'background 160ms ease, color 160ms ease, border-color 160ms ease' }}
              >
                <span style={{ opacity: 0.72, marginRight: 6 }}>{String(index + 1).padStart(2, '0')}</span>
                {section.section}
              </button>
            );
          })}
        </nav>

        {filteredSections.length === 0 ? (
          <div style={{ background: '#ffffff', border: `1px solid ${border}`, borderRadius: 18, padding: '48px 24px', textAlign: 'center', color: muted }}>
            <div style={{ color: ink, fontSize: 22, fontWeight: 650, marginBottom: 8 }}>No formulas found</div>
            <div>Try a broader search such as WACC, debt, cash flow, or duration.</div>
          </div>
        ) : (
          <main>
            {filteredSections.map((section) => {
              const sectionIndex = formulaeData.findIndex((entry) => entry.section === section.section);
              return (
                <section
                  key={section.section}
                  id={`formula-section-${sectionIndex}`}
                  data-section-index={sectionIndex}
                  ref={(node) => { sectionRefs.current[sectionIndex] = node; }}
                  style={{ marginBottom: 74, scrollMarginTop: 78 }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 18, borderBottom: `1px solid ${border}`, paddingBottom: 18, marginBottom: 18 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span style={{ color: accent, fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', paddingTop: 8 }}>{String(sectionIndex + 1).padStart(2, '0')}</span>
                      <div>
                        <h2 style={{ fontFamily: displayFont, fontSize: 'clamp(26px, 4vw, 42px)', lineHeight: 1.06, letterSpacing: '-0.04em', fontWeight: 600, margin: 0, color: ink }}>{section.section}</h2>
                        <p style={{ maxWidth: 740, margin: '10px 0 0', color: muted, fontSize: 16, lineHeight: 1.55 }}>{section.description}</p>
                      </div>
                    </div>
                    <span style={{ flexShrink: 0, color: muted, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap' }}>{section.items.length} formulas</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 390px), 1fr))', gap: 14 }}>
                    {section.items.map((item, itemIndex) => (
                      <article key={item.id} style={{ background: '#ffffff', border: `1px solid ${border}`, borderRadius: 16, padding: '22px 22px 20px', boxShadow: '0 8px 24px rgba(30, 30, 50, 0.04)' }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
                          <span style={{ color: '#a0a0ab', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em' }}>{String(itemIndex + 1).padStart(2, '0')}</span>
                          <h3 style={{ fontFamily: displayFont, fontSize: 22, lineHeight: 1.12, letterSpacing: '-0.025em', fontWeight: 650, margin: 0, color: ink }}>{item.name}</h3>
                        </div>
                        <p style={{ margin: 0, color: '#4d4d55', fontSize: 15, lineHeight: 1.58 }}>{item.description}</p>
                        <div style={{ marginTop: 18, padding: '13px 14px', borderLeft: `3px solid ${accent}`, background: '#f5f4ff', borderRadius: '0 10px 10px 0' }}>
                          <div style={{ color: accent, fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Use it for</div>
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
              );
            })}
          </main>
        )}
      </div>
    </div>
  );
}
