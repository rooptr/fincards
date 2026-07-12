import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import journeyData from '../data/securitizationJourney.json';
import topicsData from '../data/extractedTopics.json';

// ─── Stage config ──────────────────────────────────────────────────────────────
const STAGE_CONFIG = {
  concept:     { label: 'Concept',     bg: '#EEF3FD', border: '#4A80D4', text: '#1C3A6E', dot: '#4A80D4' },
  source:      { label: 'Source',      bg: '#EBF5EC', border: '#3A8F4A', text: '#1A4022', dot: '#3A8F4A' },
  preparation: { label: 'Preparation', bg: '#EBF5EC', border: '#3A8F4A', text: '#1A4022', dot: '#3A8F4A' },
  mechanism:   { label: 'Mechanism',   bg: '#FEF5E8', border: '#D07A20', text: '#6B3C0A', dot: '#D07A20' },
  validation:  { label: 'Validation',  bg: '#FEF5E8', border: '#D07A20', text: '#6B3C0A', dot: '#D07A20' },
  application: { label: 'Application', bg: '#F3EFFD', border: '#7C5CBF', text: '#3A1D7A', dot: '#7C5CBF' },
  advanced:    { label: 'Advanced',    bg: '#FDEDEE', border: '#C0404A', text: '#6B0F15', dot: '#C0404A' },
};

// ─── Credit Enhancement Widget ────────────────────────────────────────────────
function CreditEnhancementWidget() {
  const [poolSize, setPoolSize] = useState(1000);
  const [seniorPct, setSeniorPct] = useState(80);
  const [mezzPct, setMezzPct] = useState(12);

  const equityPct = Math.max(0, 100 - seniorPct - mezzPct);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <div className="text-[12px] font-medium text-[#8e8e93] mb-1">Subordination Level</div>
          <div className="text-[36px] font-semibold tracking-tight text-[#1d1d1f] leading-none">{(100 - seniorPct).toFixed(1)}%</div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden flex" style={{ height: 24, borderRadius: '8px' }}>
        <div title={`Senior AAA`} style={{ width: `${seniorPct}%`, background: '#4A80D4', transition: 'width 0.3s' }} />
        <div title={`Mezzanine`} style={{ width: `${mezzPct}%`, background: '#D07A20', transition: 'width 0.3s' }} />
        <div title={`Equity`} style={{ width: `${equityPct}%`, background: '#C0404A', transition: 'width 0.3s' }} />
      </div>
      <div className="flex justify-between text-[11px] text-[#8e8e93] font-medium px-1 mt-1">
        <span>Senior {seniorPct}%</span>
        {mezzPct > 0 && <span>Mezz {mezzPct}%</span>}
        {equityPct > 0 && <span>Equity {equityPct.toFixed(1)}%</span>}
      </div>

      <div className="space-y-5 pt-2">
        <div className="group">
          <div className="flex justify-between text-[12px] mb-2">
            <span className="text-[#1d1d1f]">Total Pool Size</span>
            <span className="text-[#8e8e93]">${poolSize}M</span>
          </div>
          <input type="range" min="100" max="5000" step="100" value={poolSize}
            onChange={e => setPoolSize(+e.target.value)}
            className="w-full h-1 rounded-full appearance-none bg-[#e5e5ea] outline-none slider-thumb-apple" />
        </div>

        <div className="group">
          <div className="flex justify-between text-[12px] mb-2">
            <span className="text-[#1d1d1f]">Senior Tranche</span>
            <span className="text-[#8e8e93]">{seniorPct}%</span>
          </div>
          <input type="range" min="50" max="97" step="1" value={seniorPct}
            onChange={e => setSeniorPct(Math.min(+e.target.value, 100 - mezzPct - 1))}
            className="w-full h-1 rounded-full appearance-none bg-[#e5e5ea] outline-none slider-thumb-apple" />
        </div>

        <div className="group">
          <div className="flex justify-between text-[12px] mb-2">
            <span className="text-[#1d1d1f]">Mezzanine Tranche</span>
            <span className="text-[#8e8e93]">{mezzPct}%</span>
          </div>
          <input type="range" min="1" max="30" step="1" value={mezzPct}
            onChange={e => setMezzPct(Math.min(+e.target.value, 100 - seniorPct - 1))}
            className="w-full h-1 rounded-full appearance-none bg-[#e5e5ea] outline-none slider-thumb-apple" />
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .slider-thumb-apple::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #fff;
          border: 1px solid #d1d1d6;
          border-radius: 50%;
          box-shadow: 0 2px 5px rgba(0,0,0,0.15);
          cursor: pointer;
        }
      `}} />
    </div>
  );
}

// ─── Search ───────────────────────────────────────────────────────────────────
function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleInput(val) {
    setQuery(val);
    if (val.trim().length < 2) { setResults([]); setOpen(false); return; }
    const q = val.toLowerCase();
    const matched = topicsData
      .filter(t => t.title.toLowerCase().includes(q) || t.domain.toLowerCase().includes(q))
      .slice(0, 8);
    setResults(matched);
    setOpen(matched.length > 0);
  }

  return (
    <div ref={ref} className="relative w-64">
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: '#f5f5f7', border: '1px solid #e5e5ea' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          value={query}
          onChange={e => handleInput(e.target.value)}
          placeholder="Search topics…"
          className="bg-transparent outline-none text-[13px] text-[#1d1d1f] placeholder-[#8e8e93] w-full"
        />
        {query && (
          <button onClick={() => { setQuery(''); setResults([]); setOpen(false); }} className="text-[#8e8e93] hover:text-[#1d1d1f]">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-1.5 left-0 right-0 rounded-2xl overflow-hidden z-50"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5ea' }}
          >
            {results.map((t, i) => (
              <button key={t.id} onClick={() => { setQuery(t.title); setOpen(false); }}
                className="w-full text-left px-4 py-2.5 hover:bg-[#f5f5f7] transition-colors flex items-center justify-between gap-3"
                style={{ borderBottom: i < results.length - 1 ? '1px solid #f0f0f0' : 'none' }}
              >
                <span className="text-[13px] text-[#1d1d1f] font-medium truncate">{t.title}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Stage Node ───────────────────────────────────────────────────────────────
function StageNode({ node, focused, onClick }) {
  const cfg = STAGE_CONFIG[node.stage] || STAGE_CONFIG.concept;
  return (
    <motion.button
      whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      onClick={() => onClick(node)}
      className="w-full text-left rounded-2xl px-5 py-4 transition-shadow"
      style={{
        background: focused ? cfg.bg : '#fff',
        border: `1.5px solid ${focused ? cfg.border : '#e5e5ea'}`,
        boxShadow: focused ? `0 0 0 3px ${cfg.border}22, 0 4px 16px rgba(0,0,0,0.06)` : '0 1px 4px rgba(0,0,0,0.05)',
      }}
    >
      <div className="flex items-center gap-2.5 mb-1">
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: cfg.border + '22', color: cfg.border }}>
          {cfg.label}
        </span>
        {node.hasWidget && (
          <span className="text-[10px] font-semibold text-[#3A8F4A] flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 2v20M2 12h20"/></svg>
            Widget
          </span>
        )}
      </div>
      <div className="text-[15px] font-semibold text-[#1d1d1f] leading-tight">{node.label}</div>
      <div className="text-[12px] text-[#8e8e93] mt-1 leading-relaxed line-clamp-2">{node.desc}</div>
    </motion.button>
  );
}

// ─── Collapsed Mechanism Group ────────────────────────────────────────────────
function MechanismGroup({ nodes, focusedId, onFocus }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = STAGE_CONFIG.mechanism;
  const hasFocused = nodes.some(n => n.id === focusedId);

  return (
    <div>
      {/* Collapsed toggle */}
      <motion.button
        whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
        onClick={() => setExpanded(e => !e)}
        className="w-full text-left rounded-2xl px-5 py-4 transition-shadow"
        style={{
          background: hasFocused ? cfg.bg : '#fff',
          border: `1.5px solid ${hasFocused ? cfg.border : '#e5e5ea'}`,
          boxShadow: hasFocused ? `0 0 0 3px ${cfg.border}22, 0 4px 16px rgba(0,0,0,0.06)` : '0 1px 4px rgba(0,0,0,0.05)',
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: cfg.border + '22', color: cfg.border }}>
                Mechanisms
              </span>
              <span className="text-[11px] font-semibold text-[#8e8e93]">{nodes.length} steps</span>
            </div>
            <div className="text-[14px] font-semibold text-[#1d1d1f]">
              {nodes.map(n => n.label).join(' · ')}
            </div>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>
          </motion.div>
        </div>
      </motion.button>

      {/* Expanded sub-cards */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div className="flex gap-3 mt-3 overflow-x-auto pb-1 no-scrollbar">
              {nodes.map(node => (
                <motion.button
                  key={node.id}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => onFocus(node)}
                  className="shrink-0 w-52 text-left rounded-2xl p-4"
                  style={{
                    background: focusedId === node.id ? cfg.bg : '#fafafa',
                    border: `1.5px solid ${focusedId === node.id ? cfg.border : '#e5e5ea'}`,
                    boxShadow: focusedId === node.id ? `0 0 0 3px ${cfg.border}22` : '0 1px 4px rgba(0,0,0,0.05)',
                  }}
                >
                  <div className="text-[13px] font-semibold text-[#1d1d1f] mb-1 flex items-center gap-2">
                    {node.label}
                    {node.hasWidget && <span className="text-[9px] font-bold text-[#3A8F4A] bg-[#EBF5EC] px-1.5 py-0.5 rounded-full">Widget</span>}
                  </div>
                  <div className="text-[11px] text-[#8e8e93] leading-relaxed line-clamp-3">{node.desc}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Connector line ───────────────────────────────────────────────────────────
function Spine() {
  return (
    <div className="flex justify-center py-1">
      <div className="w-[2.5px] rounded-full bg-gradient-to-b from-[#e5e5ea] to-[#c7c7cc]" style={{ height: 28 }} />
    </div>
  );
}

// ─── Application Fork ─────────────────────────────────────────────────────────
function ApplicationFork({ nodes, focusedId, onFocus }) {
  const cfg = STAGE_CONFIG.application;
  return (
    <div>
      {/* Fork connector */}
      <div className="flex justify-center py-1">
        <div className="w-[2.5px] rounded-full bg-gradient-to-b from-[#e5e5ea] to-[#c7c7cc]" style={{ height: 20 }} />
      </div>
      <div className="relative flex justify-center mb-2">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2.5px] bg-[#c7c7cc]" style={{ height: 20 }} />
        <svg width={Math.min(nodes.length * 120, 360)} height="20" className="overflow-visible">
          {nodes.length > 1 && (
            <line x1="0%" y1="0" x2="100%" y2="0" stroke="#c7c7cc" strokeWidth="2.5" strokeLinecap="round" />
          )}
          {nodes.map((_, i) => (
            <line key={i}
              x1={`${(i / (nodes.length - 1)) * 100}%`} y1="0"
              x2={`${(i / (nodes.length - 1)) * 100}%`} y2="20"
              stroke="#c7c7cc" strokeWidth="2.5" strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <div className="flex gap-3 justify-center">
        {nodes.map(node => (
          <motion.button
            key={node.id}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => onFocus(node)}
            className="w-44 shrink-0 text-left rounded-2xl p-4 transition-shadow"
            style={{
              background: focusedId === node.id ? cfg.bg : '#fff',
              border: `1.5px solid ${focusedId === node.id ? cfg.border : '#e5e5ea'}`,
              boxShadow: focusedId === node.id ? `0 0 0 3px ${cfg.border}22, 0 4px 16px rgba(0,0,0,0.06)` : '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest block mb-1" style={{ color: cfg.border }}>
              {cfg.label}
            </span>
            <div className="text-[14px] font-semibold text-[#1d1d1f] mb-1">{node.label}</div>
            <div className="text-[11px] text-[#8e8e93] leading-relaxed line-clamp-3">{node.desc}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

// ─── Left Pane ────────────────────────────────────────────────────────────────
function StudyPane({ node, onStudyNow }) {
  if (!node) return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ background: '#f5f5f7' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
      </div>
      <p className="text-[13px] text-[#8e8e93]">Click any node to explore</p>
    </div>
  );

  const cfg = STAGE_CONFIG[node.stage] || STAGE_CONFIG.concept;

  return (
    <div className="flex flex-col h-full bg-[#fff]">
      <div className="p-6 flex-1 overflow-y-auto no-scrollbar" style={{ scrollbarWidth: 'none' }}>
        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full inline-block mb-3" style={{ background: cfg.border + '22', color: cfg.border }}>
          {cfg.label}
        </span>
        <h2 className="text-[22px] font-bold text-[#1d1d1f] leading-tight mb-5">{node.label}</h2>
        
        <div className="mb-6">
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8e8e93] mb-2.5">Interview Answer</div>
          <p className="text-[14px] text-[#3d3d3f] leading-relaxed">{node.desc}</p>
        </div>

        {node.eli5 && (
          <div className="mb-4">
            <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8e8e93] mb-2.5">ELI5 (MBA Edition)</div>
            <div className="p-4 rounded-[16px]" style={{ background: '#f5f5f7' }}>
              <p className="text-[13.5px] text-[#1d1d1f] leading-relaxed">{node.eli5}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-[#f0f0f0]">
        <button
          onClick={() => onStudyNow && onStudyNow(node)}
          className="w-full py-3.5 rounded-2xl text-[14px] font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98] shadow-sm"
          style={{ background: cfg.border }}
        >
          Study Cards
        </button>
      </div>
    </div>
  );
}

// ─── Right Pane ───────────────────────────────────────────────────────────────
function ReferencePane({ node }) {
  if (!node) return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6">
      <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center" style={{ background: '#f5f5f7' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>
      </div>
      <p className="text-[13px] text-[#8e8e93]">Select a node to see references</p>
    </div>
  );

  return (
    <div className="p-6 overflow-y-auto h-full space-y-6 no-scrollbar bg-[#fff]" style={{ scrollbarWidth: 'none' }}>
      {/* Questions */}
      {node.questions?.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8e8e93] mb-3">Key Questions</div>
          <div className="space-y-2.5">
            {node.questions.map((q, i) => (
              <div key={i} className="p-3.5 rounded-xl border border-[#e5e5ea] text-[13px] text-[#1d1d1f] leading-snug shadow-sm">
                {q}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leads to Advanced Concepts */}
      {node.leadsTo?.length > 0 && (
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8e8e93] mb-3">Leads to Advanced Concepts</div>
          <div className="flex flex-wrap gap-2">
            {node.leadsTo.map(l => (
              <span key={l} className="text-[13px] px-3.5 py-1.5 rounded-full font-medium shadow-sm" style={{ background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #e5e5ea' }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Widget */}
      {node.hasWidget && (
        <div className="border-t border-[#f0f0f0] pt-6">
          <CreditEnhancementWidget />
        </div>
      )}
    </div>
  );
}

// ─── CENTER: Journey Blueprint ─────────────────────────────────────────────────
function JourneyBlueprint({ data, focusedId, onFocus }) {
  // Group consecutive mechanism nodes
  const spineItems = useMemo(() => {
    const items = [];
    let mechBuffer = [];

    function flushMechBuffer() {
      if (mechBuffer.length === 0) return;
      if (mechBuffer.length === 1) items.push({ type: 'node', node: mechBuffer[0] });
      else items.push({ type: 'mechGroup', nodes: [...mechBuffer] });
      mechBuffer = [];
    }

    for (const node of data.narrative) {
      if (node.stage === 'mechanism') {
        mechBuffer.push(node);
      } else {
        flushMechBuffer();
        items.push({ type: 'node', node });
      }
    }
    flushMechBuffer();
    return items;
  }, [data]);

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="max-w-xl mx-auto space-y-0">
        {spineItems.map((item, idx) => (
          <div key={item.type === 'node' ? item.node.id : `mechGroup_${idx}`}>
            {idx > 0 && <Spine />}
            {item.type === 'node' ? (
              <StageNode node={item.node} focused={focusedId === item.node.id} onClick={onFocus} />
            ) : (
              <MechanismGroup nodes={item.nodes} focusedId={focusedId} onFocus={onFocus} />
            )}
          </div>
        ))}

        {/* Application fork */}
        {data.applications?.length > 0 && (
          <ApplicationFork nodes={data.applications} focusedId={focusedId} onFocus={onFocus} />
        )}

        {/* Advanced node(s) */}
        {data.narrative.filter(n => n.stage === 'advanced').length > 0 && (
          <>
            <Spine />
            {data.narrative.filter(n => n.stage === 'advanced').map(node => (
              <StageNode key={node.id} node={node} focused={focusedId === node.id} onClick={onFocus} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function LearningMapView({ onClose, onStudyNow }) {
  const [focusedNode, setFocusedNode] = useState(null);

  // Filter advanced from main journey (they appear separately)
  const filteredJourney = {
    ...journeyData,
    narrative: journeyData.narrative.filter(n => n.stage !== 'advanced'),
  };

  return (
    <div className="flex flex-col" style={{ height: 'calc(100dvh - 52px)', background: '#fafafa', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />


      {/* Sub-header: Journey title + search */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-[#e5e5ea]" style={{ background: '#fff' }}>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-widest text-[#8e8e93]">Learning Map</div>
          <div className="text-[18px] font-bold text-[#1d1d1f] leading-tight">{journeyData.title}</div>
        </div>
        <div className="flex items-center gap-3">
          <SearchBar />
          <span className="text-[12px] px-3 py-1.5 rounded-full font-medium" style={{ background: '#f5f5f7', color: '#8e8e93' }}>
            {journeyData.domain}
          </span>
        </div>
      </div>

      {/* 3-pane body */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT: Study Pane */}
        <div className="shrink-0 border-r border-[#e5e5ea] overflow-hidden" style={{ width: '25%', background: '#fff' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={focusedNode?.id ?? 'empty'}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="h-full"
            >
              <StudyPane node={focusedNode} onStudyNow={onStudyNow} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER: Journey Blueprint */}
        <div className="flex-1 overflow-hidden" style={{ background: '#fafafa' }}>
          <JourneyBlueprint
            data={filteredJourney}
            focusedId={focusedNode?.id}
            onFocus={setFocusedNode}
          />
        </div>

        {/* RIGHT: Reference Pane */}
        <div className="shrink-0 border-l border-[#e5e5ea] overflow-hidden" style={{ width: '25%', background: '#fff' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={focusedNode?.id ?? 'empty-ref'}
              initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="h-full"
            >
              <ReferencePane node={focusedNode} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
