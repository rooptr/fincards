import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import kgData from '../data/knowledgeGraph.json';

export default function MobileKnowledgeGraph({ onClose, onStudyNow }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLineId, setActiveLineId] = useState(null);
  const [activeStationId, setActiveStationId] = useState(null);
  const [expandedStationId, setExpandedStationId] = useState(null);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return Object.values(kgData.nodes).filter(n =>
      n.title.toLowerCase().includes(q) ||
      (n.aliases && n.aliases.some(a => a.toLowerCase().includes(q)))
    ).slice(0, 5);
  }, [searchQuery]);

  const loadTopic = useCallback((id) => {
    setSearchQuery('');
    const station = kgData.nodes[id];
    if (!station) return;
    const defaultLine = station.lines?.[0];
    if (defaultLine) {
      setActiveLineId(defaultLine);
      setActiveStationId(id);
      setExpandedStationId(id);
    }
  }, []);

  const activeLine = activeLineId ? kgData.lines[activeLineId] : null;
  const stations = activeLine ? activeLine.stations.map(id => kgData.nodes[id]) : [];

  return (
    <div className="flex flex-col h-full bg-[#f5f5f7] dark:bg-[#1c1c1e] relative">
      {/* Header */}
      <div className="flex-none z-20 flex flex-col px-4 pt-4 pb-2 bg-white/80 dark:bg-[#1c1c1e]/80 backdrop-blur-xl border-b border-black/5">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-sm font-bold tracking-widest uppercase text-gray-900">Finance Tracks</h1>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200">
            <svg className="w-4 h-4 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-full bg-gray-100/80 border-none text-[14px] font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl overflow-hidden z-30">
              {searchResults.map(res => (
                <button
                  key={res.id}
                  onClick={() => loadTopic(res.id)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <div className="text-[14px] font-bold text-gray-900">{res.title}</div>
                  {res.aliases && res.aliases.length > 0 && (
                    <div className="text-[11px] font-semibold text-gray-500 mt-0.5 uppercase tracking-wider">{res.aliases.slice(0, 2).join(', ')}</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 relative">
        {!activeLine ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-gray-500">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Knowledge Transit Explorer</h2>
            <p className="text-sm">Search for a finance concept to navigate its learning route.</p>
          </div>
        ) : (
          <div className="relative border-l-4 ml-6" style={{ borderColor: activeLine.color }}>
            {stations.map((station, index) => {
              const isExpanded = expandedStationId === station.id;
              const isTarget = activeStationId === station.id;
              // Other lines this station belongs to (interchange)
              const otherLines = station.lines.filter(l => l !== activeLineId);
              
              return (
                <div key={station.id} className="relative pl-6 pb-8 last:pb-2">
                  {/* Station Marker */}
                  <div 
                    className="absolute -left-[14px] top-1 w-6 h-6 rounded-full border-4 bg-white z-10 transition-transform"
                    style={{ borderColor: activeLine.color, transform: isExpanded ? 'scale(1.2)' : 'scale(1)' }}
                  />
                  
                  {/* Station Header */}
                  <div 
                    className="cursor-pointer select-none"
                    onClick={() => setExpandedStationId(isExpanded ? null : station.id)}
                  >
                    <h3 className={`text-lg font-bold transition-colors ${isTarget ? 'text-gray-900' : 'text-gray-700'}`}>
                      {station.title}
                    </h3>
                    {station.subtitle && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">{station.subtitle}</p>
                    )}
                  </div>

                  {/* Accordion Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm border border-gray-100">
                          {station.short_summary && (
                            <p className="text-sm text-gray-600 mb-3 leading-relaxed">{station.short_summary}</p>
                          )}
                          
                          {station.formula && (
                            <div className="bg-gray-50 rounded-lg p-3 mb-3 border border-gray-100">
                              <code className="text-xs font-mono text-gray-800 break-words">{station.formula}</code>
                            </div>
                          )}
                          
                          {station.leads_to_ids && station.leads_to_ids.length > 0 && (
                            <div className="mb-4">
                              <p className="text-[10px] font-bold text-gray-400 mb-2 uppercase tracking-wider">Leads to</p>
                              <div className="flex flex-wrap gap-1.5">
                                {station.leads_to_ids.map(lt => (
                                  <span key={lt} className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-gray-100 text-gray-600">
                                    {lt}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          <button
                            onClick={() => { if (onStudyNow) onStudyNow(station); }}
                            className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-transform active:scale-95"
                            style={{ backgroundColor: activeLine.color }}
                          >
                            Start Study
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Interchange Tracks */}
                  {otherLines.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="text-[10px] font-bold text-gray-400 self-center uppercase tracking-wider">Also on:</span>
                      {otherLines.map(lId => {
                        const lInfo = kgData.lines[lId];
                        if (!lInfo) return null;
                        return (
                          <button
                            key={lId}
                            onClick={() => {
                              setActiveLineId(lId);
                              setActiveStationId(station.id);
                              setExpandedStationId(station.id);
                            }}
                            className="px-2 py-1 rounded-md text-[10px] font-bold text-white transition-transform active:scale-95"
                            style={{ backgroundColor: lInfo.color }}
                          >
                            {lInfo.name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
