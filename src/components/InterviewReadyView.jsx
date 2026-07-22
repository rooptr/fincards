import { useState, useMemo, useRef, useEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const SUBCATEGORY_ORDER = [
  'Credit & Underwriting',
  'Corporate Finance & Valuation',
  'Structured Finance & Private Credit',
  'Financial Due Diligence',
  'M&A Tax & Structuring',
  'Fixed Income & Derivatives',
  'SQL & Excel',
  'Written Assessment',
  'Formulas & Ratios',
  'Behavioral & Situational',
  'Logical Puzzles',
];

function TagBadge({ tag }) {
  const labels = {
    archive: { label: 'Archive', color: '#8e8e93' },
    related: { label: 'Related', color: '#8e8e93' },
    gen: { label: 'Generated', color: '#8e8e93' },
  };
  const t = labels[tag];
  if (!t) return null;
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '13px',
      fontWeight: 400,
      color: t.color,
      flexShrink: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
    }}>
      {t.label}
    </span>
  );
}

function FirmBadge({ firm }) {
  if (!firm) return null;
  return (
    <span style={{
      display: 'inline-block',
      fontSize: '13px',
      fontWeight: 400,
      color: '#8e8e93',
      flexShrink: 0,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
    }}>
      {firm}
    </span>
  );
}

function FormatAnswer({ text }) {
  if (!text) return null;

  const formatted = text
    .replace(/(Step \d+:)/ig, '\n\n$1')
    .replace(/(\(\d+\)\s)/g, '\n\n$1')
    .replace(/(Example:)/ig, '\n\n$1')
    .replace(/(Strategy:)/ig, '\n\n$1')
    .replace(/(Possible causes:)/ig, '\n\n$1')
    .replace(/(Context needed:)/ig, '\n\n$1')
    .trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {formatted.split('\n\n').map((para, i) => {
        if (!para.trim()) return null;

        const isBoldStart = /^(Step \d+:|\(\d+\)\s|Example:|Strategy:|Possible causes:|Context needed:)/i.test(para);

        if (isBoldStart) {
          const colonMatch = para.match(/^(.*?:\s)(.*)/s);
          if (colonMatch) {
            return (
              <p key={i} style={{ margin: 0 }}>
                <strong style={{ fontWeight: 600, color: '#1d1d1f' }}>{colonMatch[1]}</strong>
                {colonMatch[2]}
              </p>
            );
          }
        }

        return <p key={i} style={{ margin: 0 }}>{para.trim()}</p>;
      })}
    </div>
  );
}

function FormulaBox({ formula }) {
  const htmlContent = useMemo(() => {
    if (!formula) return null;

    let cleanFormula = formula.replace(/^formula:\s*/i, '').trim();

    // 1. Escape special KaTeX characters
    cleanFormula = cleanFormula.replace(/&/g, '\\&').replace(/%/g, '\\%').replace(/\$/g, '\\$');

    // 2. Format typical math symbols
    cleanFormula = cleanFormula.replace(/Ã—/g, '\\times ');

    // 3. Smart wrap multi-letter words in \text{} so they aren't italicized.
    // We use a replacer function to ignore LaTeX commands (starting with \) and single variables (like E, V)
    cleanFormula = cleanFormula.replace(/\\?[A-Za-z]+/g, (match) => {
      if (match.startsWith('\\') || match.length === 1) {
        return match;
      }
      return `\\text{${match}}`;
    });

    // 4. Preserve spaces because KaTeX math mode ignores normal spaces
    cleanFormula = cleanFormula.replace(/ /g, '\\ ');

    try {
      // Use inline mode (displayMode: false) to prevent left-side clipping on overflow
      return katex.renderToString(cleanFormula, { throwOnError: true, displayMode: false });
    } catch {
      return cleanFormula;
    }
  }, [formula]);

  if (!formula) return null;

  return (
    <div style={{
      marginTop: '24px',
      padding: '16px',
      borderRadius: '16px',
      background: 'rgba(142,142,147,0.12)', // System Gray 6
      overflowX: 'auto',
      overflowY: 'hidden',
      WebkitOverflowScrolling: 'touch',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box',
    }}>
      <div
        style={{
          width: 'max-content',
          minWidth: '100%',
          fontSize: 'clamp(14px, 3vw, 17px)',
          color: '#1d1d1f',
          whiteSpace: 'nowrap',
        }}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
}

function InterviewAccordionItem({ card, isOpen, onToggle }) {
  const contentRef = useRef(null);

  return (
    <div style={{
      padding: '40px 0',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
    }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '13px', fontWeight: 500, color: '#007AFF', letterSpacing: '0.2px' }}>
          {card.subcategory}
        </span>
        <span style={{ color: '#d1d1d6', fontSize: '12px' }}>|</span>
        <FirmBadge firm={card.firm} />
        <span style={{ color: '#d1d1d6', fontSize: '12px' }}>|</span>
        <TagBadge tag={card.tag} />
      </div>

      <h3 style={{
        fontSize: 'clamp(24px, 4vw, 32px)',
        fontWeight: 400,
        lineHeight: '1.25',
        margin: '0 0 24px',
        color: 'var(--text-primary, #1d1d1f)',
        letterSpacing: '-0.5px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        wordBreak: 'break-word',
      }}>
        {card.question}
      </h3>

      <button
        onClick={onToggle}
        style={{
          background: 'transparent',
          border: 'none',
          padding: '0',
          color: '#007AFF',
          fontSize: '17px',
          fontWeight: 400,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
          outline: 'none',
        }}
      >
        {isOpen ? 'Hide solution' : 'View solution'}
        <svg
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.4s cubic-bezier(0.32,0.72,0,1)'
          }}
          width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: isOpen ? '2000px' : '0',
          opacity: isOpen ? 1 : 0,
          transition: 'all 0.6s cubic-bezier(0.32,0.72,0,1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ paddingTop: '32px' }}>
          <div style={{
            fontSize: '19px',
            lineHeight: '1.6',
            color: 'var(--text-secondary, #3a3a3c)',
            fontWeight: 300,
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
          }}>
            <FormatAnswer text={card.answer} />
          </div>
          <FormulaBox formula={card.formula} />
        </div>
      </div>
    </div>
  );
}

export default function InterviewReadyView({ cards }) {
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [openCardId, setOpenCardId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(20);

  const [showTopics, setShowTopics] = useState(false);
  const [showFormulae, setShowFormulae] = useState(false);

  const scrollContainerRef = useRef(null);
  const topAnchorRef = useRef(null);

  const filteredCards = useMemo(() => {
    let deck = [...cards];
    if (activeSubcategory) {
      deck = deck.filter(c => c.subcategory === activeSubcategory);
    }
    return deck;
  }, [cards, activeSubcategory]);

  const allFormulae = useMemo(() => {
    return cards.filter(c => c.formula).map(c => ({
      id: c.id,
      question: c.question,
      formula: c.formula,
      subcategory: c.subcategory
    }));
  }, [cards]);

  const handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 800;
    if (bottom && visibleCount < filteredCards.length) {
      setVisibleCount(prev => prev + 20);
    }
  };

  useEffect(() => {
    setVisibleCount(20);
  }, [activeSubcategory]);

  const toggleTopics = () => {
    const nextState = !showTopics;
    setShowTopics(nextState);
    if (nextState) {
      setShowFormulae(false);
      setTimeout(() => topAnchorRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  const toggleFormulae = () => {
    const nextState = !showFormulae;
    setShowFormulae(nextState);
    if (nextState) {
      setShowTopics(false);
      setTimeout(() => topAnchorRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      style={{
        height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch',
        background: '#ffffff',
        width: '100%',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px 120px' }}>

        <header style={{ padding: '120px 0 60px' }}>
          <h1 style={{
            fontSize: 'clamp(56px, 10vw, 84px)',
            fontWeight: 400, // Lighter, editorial weight
            letterSpacing: '-0.03em',
            lineHeight: 1,
            color: '#1d1d1f',
            margin: '0 0 24px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Interview Ready.
          </h1>
          <p style={{
            fontSize: 'clamp(21px, 4vw, 28px)',
            fontWeight: 300,
            color: '#8e8e93',
            margin: 0,
            maxWidth: '700px',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          }}>
            Master the technicals, crush the behaviorals, and secure the offer.
          </p>
        </header>

        <div ref={topAnchorRef} style={{ scrollMarginTop: '120px' }} />

        {/* Sticky Nav Area - Minimalist */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
          margin: '0 -24px',
          padding: '24px 24px 16px',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px'
        }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            {/* Apple Store Style Action Pills */}
            <div style={{ display: 'flex', gap: '12px', flex: 1, minWidth: '240px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <button
                onClick={toggleTopics}
                style={{
                  padding: '12px 24px',
                  borderRadius: '100px', // Pill shape
                  border: 'none',
                  background: showTopics ? '#007AFF' : 'rgba(142,142,147,0.12)',
                  color: showTopics ? '#fff' : '#1d1d1f',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              >
                Topics to Cover
              </button>
              <button
                onClick={toggleFormulae}
                style={{
                  padding: '12px 24px',
                  borderRadius: '100px',
                  border: 'none',
                  background: showFormulae ? '#007AFF' : 'rgba(142,142,147,0.12)',
                  color: showFormulae ? '#fff' : '#1d1d1f',
                  fontSize: '15px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s cubic-bezier(0.32,0.72,0,1)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif'
                }}
              >
                Formulae
              </button>
            </div>
          </div>

          {/* Subcategory Chips */}
          <div style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '4px'
          }}>
            <button
              onClick={() => setActiveSubcategory(null)}
              style={{
                flexShrink: 0,
                padding: '8px 0',
                border: 'none',
                background: 'transparent',
                color: !activeSubcategory ? '#1d1d1f' : '#8e8e93',
                fontSize: '15px',
                fontWeight: !activeSubcategory ? 600 : 400,
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                marginRight: '12px'
              }}
            >
              All
            </button>
            {SUBCATEGORY_ORDER.map(sub => {
              const count = cards.filter(c => c.subcategory === sub).length;
              if (count === 0) return null;
              const isActive = activeSubcategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => setActiveSubcategory(isActive ? null : sub)}
                  style={{
                    flexShrink: 0,
                    padding: '8px 0',
                    border: 'none',
                    background: 'transparent',
                    color: isActive ? '#1d1d1f' : '#8e8e93',
                    fontSize: '15px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'color 0.3s ease',
                    marginRight: '12px'
                  }}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>

        {/* Expandable Sections */}
        <div style={{
          overflow: 'hidden',
          transition: 'all 0.6s cubic-bezier(0.32,0.72,0,1)',
          maxHeight: (showTopics || showFormulae) ? '5000px' : '0',
          opacity: (showTopics || showFormulae) ? 1 : 0,
          marginTop: (showTopics || showFormulae) ? '60px' : '0',
          borderBottom: (showTopics || showFormulae) ? '1px solid rgba(0,0,0,0.06)' : 'none',
          paddingBottom: (showTopics || showFormulae) ? '60px' : '0',
        }}>
          {showTopics && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#1d1d1f', marginBottom: '32px', letterSpacing: '-0.5px' }}>
                Core Topics
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                {SUBCATEGORY_ORDER.map(sub => {
                  const items = cards.filter(c => c.subcategory === sub);
                  if (items.length === 0) return null;
                  return (
                    <div key={sub}>
                      <h3 style={{ fontSize: '21px', fontWeight: 400, color: '#1d1d1f', margin: '0 0 8px' }}>
                        {sub}
                      </h3>
                      <p style={{ fontSize: '15px', color: '#8e8e93', margin: 0 }}>
                        {items.length} Questions
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {showFormulae && (
            <div>
              <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#1d1d1f', marginBottom: '40px', letterSpacing: '-0.5px' }}>
                Formula Master List
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '40px' }}>
                {allFormulae.map(f => (
                  <div key={f.id}>
                    <div style={{ fontSize: '13px', fontWeight: 500, color: '#007AFF', marginBottom: '8px' }}>{f.subcategory}</div>
                    <div style={{ fontSize: '21px', fontWeight: 400, color: '#1d1d1f', marginBottom: '16px' }}>{f.question}</div>
                    <FormulaBox formula={f.formula} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Editorial List */}
        <div style={{ marginTop: '24px' }}>
          {filteredCards.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '120px 0', color: '#8e8e93', fontSize: '17px', fontWeight: 300 }}>
              No matching questions found.
            </div>
          ) : (
            filteredCards.slice(0, visibleCount).map(card => (
              <InterviewAccordionItem
                key={card.id}
                card={card}
                isOpen={openCardId === card.id}
                onToggle={() => setOpenCardId(openCardId === card.id ? null : card.id)}
              />
            ))
          )}
          {visibleCount < filteredCards.length && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#8e8e93', fontSize: '15px', fontWeight: 400 }}>
              Scroll to load more
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
