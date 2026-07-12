import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import kgData from '../data/knowledgeGraph.json';

const NODE_COLORS = {
  concept: '#FF6B6B',     // Coral
  mechanism: '#45B7D1',   // Sky Blue
  instance: '#96CEB4',    // Sage
  advanced: '#DDA15E'     // Amber
};

export default function KnowledgeGraphView({ onClose, onStudyNow }) {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const timelineRef = useRef(null);

  const [activeTrackId, setActiveTrackId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const [expandedNodeId, setExpandedNodeId] = useState(null);
  const [search, setSearch] = useState('');

  // Auto-scroll panning state
  const scrollContainerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const panLoopRef = useRef(null);

  const activeTrack = activeTrackId ? kgData.lines[activeTrackId] : null;
  const hoveredStation = hoveredId ? kgData.nodes[hoveredId] : null;

  // Derive search results
  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    
    // Look up tracks (journeys) first
    const matchedTracks = Object.values(kgData.lines).filter(l => 
      l.name.toLowerCase().includes(q)
    );
    if (matchedTracks.length > 0) {
      return matchedTracks.map(t => ({
        id: t.id,
        type: 'track',
        title: t.name,
        subtitle: 'Journey'
      }));
    }

    // Look up stations
    return Object.values(kgData.nodes)
      .filter(n => n.tier !== 1.5 && (n.title.toLowerCase().includes(q) || n.aliases.some(a => a.toLowerCase().includes(q))))
      .slice(0, 8)
      .map(n => ({ ...n, type: 'station' }));
  }, [search]);

  // Main nodes of the active track
  const mainNodes = useMemo(() => {
    if (!activeTrack) return [];
    return activeTrack.stations.map(id => kgData.nodes[id]).filter(Boolean);
  }, [activeTrack]);

  // Leaves (Instances like RMBS/CMBS/ABS)
  const leafNodes = useMemo(() => {
    if (!activeTrackId) return [];
    return Object.values(kgData.nodes).filter(n => 
      n.stage_group === 'canopy_leaves' && n.prerequisite_ids.includes('securitization')
    );
  }, [activeTrackId]);

  // Sapling nodes (Leads-to / Advanced)
  const saplingNodes = useMemo(() => {
    if (!activeTrackId) return [];
    return Object.values(kgData.nodes).filter(n => 
      n.tier === 4 && n.prerequisite_ids.includes('securitization')
    );
  }, [activeTrackId]);

  // Sub-root nodes (when a main node is expanded)
  const subRootNodes = useMemo(() => {
    if (!expandedNodeId) return [];
    // Currently hardcoded sub-roots for SPV as per spec
    if (expandedNodeId === 'spv') {
      return [
        { ...kgData.nodes.trust_law, sx: 500, sy: 450, ex: 500 - 120, ey: 450 + 100 },
        { ...kgData.nodes.true_sale, sx: 500, sy: 450, ex: 500, ey: 450 + 130 },
        { ...kgData.nodes.bankruptcy_remoteness, sx: 500, sy: 450, ex: 500 + 120, ey: 450 + 100 }
      ];
    }
    return [];
  }, [expandedNodeId]);

  // Trigger time-lapse growth animation
  useEffect(() => {
    if (!activeTrackId || mainNodes.length === 0) return;

    // Reset styles before playing timeline
    gsap.set('.growth-segment, .node-marker, .leaf-segment, .sapling-segment', { opacity: 0 });
    gsap.set('.growth-segment, .leaf-segment, .sapling-segment', { strokeDashoffset: (i, el) => el.getTotalLength() });

    if (timelineRef.current) timelineRef.current.kill();
    
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // 1. Grow Roots: Loan origination (400,580) -> Pooling (600,580)
    tl.to('#segment-loan_origination-pooling', {
      opacity: 1, strokeDashoffset: 0, duration: 0.3, ease: 'power1.inOut'
    })
    .to('#node-loan_origination, #node-pooling', {
      opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.5)', stagger: 0.05
    })
    
    // 2. Grow Trunk: Pooling -> SPV -> Credit Enhancement -> Tranche Structuring -> Securitization
    .to('#segment-pooling-spv', { opacity: 1, strokeDashoffset: 0, duration: 0.25, ease: 'power1.inOut' })
    .to('#node-spv', { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.5)' })

    .to('#segment-spv-credit_enhancement', { opacity: 1, strokeDashoffset: 0, duration: 0.25, ease: 'power1.inOut' })
    .to('#node-credit_enhancement', { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.5)' })

    .to('#segment-credit_enhancement-tranche_structuring', { opacity: 1, strokeDashoffset: 0, duration: 0.25, ease: 'power1.inOut' })
    .to('#node-tranche_structuring', { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.5)' })

    .to('#segment-tranche_structuring-securitization', { opacity: 1, strokeDashoffset: 0, duration: 0.25, ease: 'power1.inOut' })
    .to('#node-securitization', { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.5)' })

    // 3. Bloom Canopy (leaves / instances)
    .to('.leaf-segment', {
      opacity: 1, strokeDashoffset: 0, duration: 0.3, ease: 'power2.out', stagger: 0.05
    }, '-=0.1')
    .to('.node-leaf', {
      opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.2)', stagger: 0.05
    }, '-=0.2')

    // 4. Sprout Saplings (leads-to / advanced)
    .to('.sapling-segment', {
      opacity: 1, strokeDashoffset: 0, duration: 0.3, ease: 'power2.out', stagger: 0.05
    }, '-=0.1')
    .to('.node-sapling', {
      opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.2)', stagger: 0.05
    }, '-=0.2');

  }, [activeTrackId, mainNodes]);

  // Sub-root inline growth animation
  useEffect(() => {
    if (!expandedNodeId) return;

    // Small delay to allow element registration
    const timer = setTimeout(() => {
      gsap.set('.sub-segment, .node-sub', { opacity: 0 });
      gsap.set('.sub-segment', { strokeDashoffset: (i, el) => el.getTotalLength() });

      gsap.timeline()
        .to('.sub-segment', {
          opacity: 1, strokeDashoffset: 0, duration: 0.3, ease: 'power2.out', stagger: 0.05
        })
        .to('.node-sub', {
          opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.2)', stagger: 0.05
        }, '-=0.25');
    }, 50);

    return () => clearTimeout(timer);
  }, [expandedNodeId]);

  // Edge-scrolling logic (Figma-style)
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const panLoop = () => {
      const el = scrollContainerRef.current;
      if (el) {
        const { left, right, width } = el.getBoundingClientRect();
        const mouseX = mousePos.current.x;
        const edgeThreshold = 100; // px from edge to start scroll
        
        let speed = 0;
        if (mouseX > right - edgeThreshold && mouseX < right + 50) {
          const proximity = (mouseX - (right - edgeThreshold)) / edgeThreshold;
          speed = proximity * 10; // Scroll speed scaling
        } else if (mouseX < left + edgeThreshold && mouseX > left - 50) {
          const proximity = ((left + edgeThreshold) - mouseX) / edgeThreshold;
          speed = -proximity * 10;
        }

        if (speed !== 0) {
          el.scrollLeft += speed;
        }
      }
      panLoopRef.current = requestAnimationFrame(panLoop);
    };
    panLoopRef.current = requestAnimationFrame(panLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(panLoopRef.current);
    };
  }, []);

  const handleSearchSelect = (res) => {
    if (res.type === 'track') {
      setActiveTrackId(res.id);
    } else {
      const targetTrackId = res.lines.length > 0 ? res.lines[0] : null;
      if (targetTrackId) {
        setActiveTrackId(targetTrackId);
      }
    }
    setSearch('');
    setHoveredId(null);
    setExpandedNodeId(null);
  };

  const handleNodeClick = (nodeId) => {
    // Toggle expand/collapse
    if (expandedNodeId === nodeId) {
      // Collapse animation
      gsap.to('.sub-segment, .node-sub', {
        opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: () => setExpandedNodeId(null)
      });
    } else {
      setExpandedNodeId(nodeId);
    }
  };

  // Rendering paths with exact Y constraints & Apple aesthetics
  return (
    <div ref={containerRef} className="relative w-full h-full" style={{ background: '#FBFBFD', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>
      
      {/* Header Guard (Top 72px) */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-8 py-4"
        style={{ height: 72, background: 'rgba(251, 251, 253, 0.8)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        
        {/* Logo / Title */}
        <div className="flex items-center gap-3">
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.03)', border: 'none', cursor: 'pointer' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <span style={{ fontSize: 17, fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.01em' }}>FinCards Tree</span>
        </div>

        {/* Search Input */}
        <div className="relative" style={{ width: 380 }}>
          <svg className="absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input type="text" placeholder="Search structured topic..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 16px 10px 40px', borderRadius: 999, border: 'none', outline: 'none', background: 'rgba(0,0,0,0.04)', fontSize: 14, fontWeight: 500, color: '#1D1D1F' }}
          />
          {searchResults.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: 8, background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.08)', zIndex: 40, border: '1px solid rgba(0,0,0,0.05)' }}>
              {searchResults.map(res => (
                <button key={`${res.type}-${res.id}`} onClick={() => handleSearchSelect(res)} className="block w-full text-left hover:bg-gray-50" style={{ padding: '12px 18px', border: 'none', background: 'none', borderBottom: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer' }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1D1D1F' }}>{res.title}</div>
                  <div style={{ fontSize: 11, fontWeight: 500, color: '#86868B', marginTop: 1, textTransform: 'uppercase' }}>{res.subtitle}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Small space balance */}
        <div style={{ width: 40 }} />
      </div>

      {/* Onboarding text */}
      {!activeTrackId && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10" style={{ paddingBottom: 100 }}>
          <p style={{ fontSize: 19, fontWeight: 600, color: '#1D1D1F', letterSpacing: '-0.015em' }}>Search a journey to begin</p>
          <p style={{ fontSize: 14, color: '#86868B', marginTop: 4 }}>Intuitive Root-to-Canopy visualization</p>
        </div>
      )}

      {/* Main Canvas Scroll Area (Clamped below top 96px) */}
      <div ref={scrollContainerRef} className="absolute left-0 right-0 bottom-0" style={{ top: 96, overflowX: 'auto', overflowY: 'auto' }}>
        <svg ref={svgRef} style={{ width: '100%', height: expandedNodeId ? 800 : 700, minWidth: 1000, display: activeTrackId ? 'block' : 'none' }}>
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.04"/>
            </filter>
            {/* Arrows pointing up */}
            <marker id="arrow-up" markerWidth="6" markerHeight="4" refX="15" refY="2" orient="auto">
              <polygon points="0 4, 3 0, 6 4" fill="#86868B" opacity="0.6"/>
            </marker>
          </defs>

          {/* Root-to-Canopy lines & nodes rendering */}
          {activeTrackId && (
            <g>
              {/* 1. Trunk connections & segments */}
              {/* Root Segment: Loan -> Pooling */}
              <path id="segment-loan_origination-pooling" d="M400,580 L600,580" stroke="#E5E5EA" strokeWidth={5} fill="none" strokeLinecap="round" className="growth-segment" />
              {/* Segment: Pooling -> SPV */}
              <path id="segment-pooling-spv" d="M600,580 C580,520 520,500 500,450" stroke="#E5E5EA" strokeWidth={5} fill="none" strokeLinecap="round" markerEnd="url(#arrow-up)" className="growth-segment" />
              {/* Segment: SPV -> Credit Enhancement */}
              <path id="segment-spv-credit_enhancement" d="M500,450 L500,350" stroke="#E5E5EA" strokeWidth={5} fill="none" strokeLinecap="round" markerEnd="url(#arrow-up)" className="growth-segment" />
              {/* Segment: Credit Enhancement -> Tranche Structuring */}
              <path id="segment-credit_enhancement-tranche_structuring" d="M500,350 L500,250" stroke="#E5E5EA" strokeWidth={5} fill="none" strokeLinecap="round" markerEnd="url(#arrow-up)" className="growth-segment" />
              {/* Segment: Tranche Structuring -> Securitization (Canopy) */}
              <path id="segment-tranche_structuring-securitization" d="M500,250 L500,150" stroke="#E5E5EA" strokeWidth={5} fill="none" strokeLinecap="round" markerEnd="url(#arrow-up)" className="growth-segment" />

              {/* 2. Canopy leaves connections (RMBS/CMBS/ABS) */}
              {leafNodes.map(leaf => (
                <path key={`segment-securitization-${leaf.id}`}
                  className="leaf-segment"
                  d={`M500,150 C480,140 ${leaf.x},140 ${leaf.x},${leaf.y}`}
                  stroke="#E5E5EA" strokeWidth={3} fill="none" strokeLinecap="round"
                />
              ))}

              {/* 3. Sapling connections (CDO) */}
              {saplingNodes.map(sap => (
                <path key={`segment-securitization-${sap.id}`}
                  className="sapling-segment"
                  d={`M500,150 L${sap.x},${sap.y}`}
                  stroke="#E5E5EA" strokeWidth={2} strokeDasharray="4 4" fill="none" strokeLinecap="round"
                />
              ))}

              {/* 4. Click Expand sub-roots (Downward) */}
              {expandedNodeId && subRootNodes.map(sub => (
                <path key={`segment-sub-${sub.id}`}
                  className="sub-segment"
                  d={`M${sub.sx},${sub.sy} C${sub.sx},${sub.sy + 30} ${sub.ex},${sub.ey - 30} ${sub.ex},${sub.ey}`}
                  stroke="#D1D1D6" strokeWidth={2.5} fill="none" strokeLinecap="round"
                />
              ))}

              {/* 5. Render Main Nodes */}
              {mainNodes.map(node => {
                const color = NODE_COLORS[node.node_type];
                const isHovered = hoveredId === node.id;
                
                return (
                  <g key={node.id} id={`node-${node.id}`} className="node-marker" style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredId(node.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => handleNodeClick(node.id)}
                  >
                    <motion.circle
                      cx={node.x} cy={node.y}
                      animate={{ r: isHovered ? 20 : 16 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      fill="white" stroke={color} strokeWidth={4}
                    />
                    <text x={node.x + 24} y={node.y + 5} textAnchor="start" fill="#1D1D1F" style={{ fontSize: 13, fontWeight: 600 }}>
                      {node.title}
                    </text>
                  </g>
                );
              })}

              {/* 6. Render Canopy Leaves */}
              {leafNodes.map(leaf => {
                const color = NODE_COLORS[leaf.node_type];
                const isHovered = hoveredId === leaf.id;

                return (
                  <g key={leaf.id} className="node-leaf" style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredId(leaf.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.circle
                      cx={leaf.x} cy={leaf.y}
                      animate={{ r: isHovered ? 16 : 13 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      fill="white" stroke={color} strokeWidth={3.5}
                    />
                    <text x={leaf.x} y={leaf.y - 20} textAnchor="middle" fill="#515154" style={{ fontSize: 11, fontWeight: 600 }}>
                      {leaf.title}
                    </text>
                  </g>
                );
              })}

              {/* 7. Render Saplings (CDO) */}
              {saplingNodes.map(sap => {
                const color = NODE_COLORS[sap.node_type];
                const isHovered = hoveredId === sap.id;

                return (
                  <g key={sap.id} className="node-sapling" style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredId(sap.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.circle
                      cx={sap.x} cy={sap.y}
                      animate={{ r: isHovered ? 14 : 11 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      fill="white" stroke={color} strokeWidth={3}
                    />
                    <text x={sap.x + 18} y={sap.y + 4} textAnchor="start" fill="#86868B" style={{ fontSize: 11, fontWeight: 600 }}>
                      {sap.title}
                    </text>
                  </g>
                );
              })}

              {/* 8. Render Sub-roots */}
              {expandedNodeId && subRootNodes.map(sub => {
                const color = NODE_COLORS[sub.node_type];
                const isHovered = hoveredId === sub.id;

                return (
                  <g key={sub.id} className="node-sub" style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setHoveredId(sub.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <motion.circle
                      cx={sub.ex} cy={sub.ey}
                      animate={{ r: isHovered ? 14 : 11 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      fill="white" stroke={color} strokeWidth={3}
                    />
                    <text x={sub.ex} y={sub.ey + 22} textAnchor="middle" fill="#86868B" style={{ fontSize: 11, fontWeight: 600 }}>
                      {sub.title}
                    </text>
                  </g>
                );
              })}

            </g>
          )}
        </svg>
      </div>

      {/* Left Card (Hover Preview) */}
      <AnimatePresence>
        {hoveredId && hoveredStation && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="absolute z-20"
            style={{
              top: 96, left: 28, width: 340,
              background: 'white', borderRadius: 20, padding: '28px 24px',
              boxShadow: '0 8px 40px rgba(0, 0, 0, 0.04), 0 2px 8px rgba(0, 0, 0, 0.02)',
              border: '1px solid rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ width: 32, height: 4, borderRadius: 2, background: NODE_COLORS[hoveredStation.node_type], marginBottom: 16 }} />
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', margin: '0 0 4px', lineHeight: 1.2 }}>{hoveredStation.title}</h3>
            {hoveredStation.subtitle && <p style={{ fontSize: 12, fontWeight: 700, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '0 0 16px' }}>{hoveredStation.subtitle}</p>}
            <p style={{ fontSize: 14, color: '#515154', lineHeight: 1.55, margin: '0 0 20px' }}>{hoveredStation.short_summary}</p>
            {hoveredStation.formula && (
              <div style={{ padding: '12px 14px', borderRadius: 12, background: '#F5F5F7', border: '1px solid #E5E5EA', marginBottom: 20 }}>
                <code style={{ fontSize: 12, fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace", color: '#1D1D1F', wordBreak: 'break-all' }}>{hoveredStation.formula}</code>
              </div>
            )}
            <button onClick={() => onStudyNow?.(hoveredStation)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12, border: 'none',
                background: NODE_COLORS[hoveredStation.node_type] || '#1D1D1F', color: 'white',
                fontSize: 14, fontWeight: 600, cursor: 'pointer'
              }}
            >
              Start Study
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pinned Color Legend (Bottom Left Corner) */}
      <div className="absolute z-20 flex items-center gap-6 px-5 py-3"
        style={{ bottom: 24, left: 28, background: 'white', borderRadius: 12, border: '1px solid rgba(0,0,0,0.04)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
        {Object.entries(NODE_COLORS).map(([type, color]) => (
          <div key={type} className="flex items-center gap-2">
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#515154', textTransform: 'capitalize' }}>
              {type === 'advanced' ? 'sapling/leads-to' : type === 'instance' ? 'canopy/leaves' : type === 'mechanism' ? 'trunk/mechanism' : 'root/foundation'}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
