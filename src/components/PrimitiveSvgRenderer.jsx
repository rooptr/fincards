import { motion } from 'motion/react';

// Color interpolation helper for timeline value decay
function interpolateColor(color1, color2, factor) {
  const c1 = parseInt(color1.substring(1), 16);
  const c2 = parseInt(color2.substring(1), 16);
  
  const r1 = (c1 >> 16) & 255, g1 = (c1 >> 8) & 255, b1 = c1 & 255;
  const r2 = (c2 >> 16) & 255, g2 = (c2 >> 8) & 255, b2 = c2 & 255;
  
  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);
  
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Concept-driven, fully content-aware SVG renderer.
 * Maps metadata and variable states directly to physical metaphors without hardcoding.
 */
export default function PrimitiveSvgRenderer({ packageData, dynamicOutputs = {} }) {
  if (!packageData || !packageData.primitive_type) return null;

  const { primitive_type, bound_variables = [] } = packageData;
  
  const getValue = (idx) => {
    if (!bound_variables[idx]) return 0;
    const varId = bound_variables[idx].variable_id;
    return dynamicOutputs[varId] !== undefined ? dynamicOutputs[varId] : 0;
  };

  const getVarLabel = (idx) => {
    if (!bound_variables[idx]) return '';
    return bound_variables[idx].variable_id.replace(/_/g, ' ').toUpperCase();
  };

  switch (primitive_type) {
    case 'note_stack': {
      // Determine if this is a Tax Shield (deduction) or Value Decay stack
      const isShield = bound_variables.some(bv => bv.variable_id.toLowerCase().includes('tax') || bv.variable_id.toLowerCase().includes('shield'));
      
      if (isShield) {
        // Find interest_rate and tax_rate dynamically from bound variables
        const taxRateIdx = bound_variables.findIndex(bv => bv.variable_id.toLowerCase().includes('tax'));
        const interestRateIdx = bound_variables.findIndex(bv => !bv.variable_id.toLowerCase().includes('tax'));
        
        const taxRate = getValue(taxRateIdx !== -1 ? taxRateIdx : 0);
        const rateLabel = getVarLabel(interestRateIdx !== -1 ? interestRateIdx : 1);
        const rateVal = getValue(interestRateIdx !== -1 ? interestRateIdx : 1);

        const domeRadius = 40 + (taxRate * 2.4);
        const notes = Array.from({ length: 5 });

        return (
          <div className="flex flex-col items-center justify-center w-full h-[220px] bg-white rounded-3xl border border-[#e5e5ea] p-4 relative overflow-hidden shadow-inner select-none">
            <svg width="100%" height="100%" viewBox="0 0 400 220" className="overflow-visible">
              <defs>
                <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Tax Shield Dome */}
              <motion.path 
                animate={{
                  d: `M ${200 - domeRadius},190 A ${domeRadius},${domeRadius} 0 0,1 ${200 + domeRadius},190 Z`
                }}
                transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                fill="url(#shieldGrad)"
                stroke="#14b8a6"
                strokeWidth="2.5"
                strokeDasharray="4,4"
              />

              {/* Dome Label */}
              <motion.text 
                animate={{ y: 180 - domeRadius }}
                transition={{ type: 'spring', stiffness: 80 }}
                x="200" 
                textAnchor="middle" 
                className="text-[11px] font-bold fill-[#0d9488] font-sans tracking-wide uppercase"
              >
                Shielded Area ({taxRate}%)
              </motion.text>

              {/* Note Stack */}
              {notes.map((_, i) => {
                const yOffset = 160 - (i * 12);
                const isShielded = (i * 10) < taxRate;
                
                return (
                  <motion.g 
                    key={i}
                    animate={{ 
                      scale: isShielded ? 1.05 : 1,
                      filter: isShielded ? "drop-shadow(0px 0px 8px rgba(20, 184, 166, 0.5))" : "drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
                    }}
                    transform={`translate(140, ${yOffset}) rotate(-4)`}
                    className="origin-center"
                  >
                    {/* Banknote */}
                    <rect 
                      width="120" 
                      height="60" 
                      rx="4" 
                      fill={isShielded ? "#ccfbf1" : "#d9f99d"} 
                      stroke={isShielded ? "#0d9488" : "#4d7c0f"} 
                      strokeWidth="2" 
                    />
                    <circle cx="60" cy="30" r="16" fill="none" stroke={isShielded ? "#0d9488" : "#4d7c0f"} strokeWidth="1.5" strokeOpacity="0.3" />
                    <text x="60" y="34" textAnchor="middle" className={`text-[10px] font-bold ${isShielded ? "fill-[#0d9488]" : "fill-[#4d7c0f]"} font-mono`}>
                      {rateLabel}: {rateVal}%
                    </text>
                    <rect x="6" y="6" width="108" height="48" rx="2" fill="none" stroke={isShielded ? "#0d9488" : "#4d7c0f"} strokeWidth="1" strokeOpacity="0.2" />
                  </motion.g>
                );
              })}

              <line x1="40" y1="190" x2="360" y2="190" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>
        );
      } else {
        // Value Decay stack
        const decayRate = getValue(0);
        const decayLabel = getVarLabel(0);
        
        const maxNotes = 8;
        const notesCount = Math.max(1, Math.round(maxNotes - (decayRate / 2.5)));
        
        return (
          <div className="flex flex-col items-center justify-center w-full h-[220px] bg-white rounded-3xl border border-[#e5e5ea] p-4 relative overflow-hidden shadow-inner select-none">
            <svg width="100%" height="100%" viewBox="0 0 400 220" className="overflow-visible">
              <defs>
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
              </defs>

              {/* Base stack guide */}
              {Array.from({ length: maxNotes }).map((_, i) => {
                const yOffset = 170 - (i * 12);
                const isLost = i >= notesCount;
                
                return (
                  <g 
                    key={i}
                    transform={`translate(140, ${yOffset}) rotate(3)`}
                    opacity={isLost ? 0.05 : 1}
                    className="transition-all duration-500"
                  >
                    <rect 
                      width="120" 
                      height="60" 
                      rx="4" 
                      fill={isLost ? "#e5e5ea" : "url(#goldGrad)"} 
                      stroke={isLost ? "#d1d1d6" : "#a16207"} 
                      strokeWidth="2" 
                    />
                    <circle cx="60" cy="30" r="14" fill="none" stroke="#a16207" strokeWidth="1" strokeOpacity="0.2" />
                    <text x="60" y="34" textAnchor="middle" className="text-[10px] font-bold fill-[#854d0e] font-mono">
                      Asset Value
                    </text>
                  </g>
                );
              })}

              <line x1="40" y1="200" x2="360" y2="200" stroke="#1d1d1f" strokeWidth="3" strokeLinecap="round" />
              <text x="200" y="215" textAnchor="middle" className="text-[10px] font-bold fill-[#8e8e93] font-sans uppercase tracking-wider">
                {decayLabel}: {decayRate}%
              </text>
            </svg>
          </div>
        );
      }
    }

    case 'scale': {
      const leftVal = getValue(0) || 1.0;
      const leftLabel = getVarLabel(0);
      
      const rightVal = getValue(1) || leftVal * 1.5;
      const rightLabel = getVarLabel(1) || 'REQUIRED RETURN';

      // Beta 1.0 is center. Tilts left when risk increases.
      const rotation = Math.max(-25, Math.min(25, (leftVal - 1.0) * 15));
      const angleRad = (rotation * Math.PI) / 180;
      
      const pivotLength = 110;
      const leftX = 200 - pivotLength * Math.cos(angleRad);
      const leftY = 75 - pivotLength * Math.sin(angleRad);
      
      const rightX = 200 + pivotLength * Math.cos(angleRad);
      const rightY = 75 + pivotLength * Math.sin(angleRad);

      const betaSize = 25 + (leftVal * 10);

      return (
        <div className="flex flex-col items-center justify-center w-full h-[220px] bg-white rounded-3xl border border-[#e5e5ea] p-4 relative overflow-hidden shadow-inner select-none">
          <svg width="100%" height="100%" viewBox="0 0 400 220" className="overflow-visible">
            {/* Base stand */}
            <rect x="185" y="200" width="30" height="8" rx="2" fill="#1d1d1f" />
            <line x1="200" y1="200" x2="200" y2="75" stroke="#1d1d1f" strokeWidth="5" />
            <circle cx="200" cy="75" r="6" fill="#0066cc" stroke="#1d1d1f" strokeWidth="1" />

            {/* Crossbar */}
            <motion.line 
              animate={{ x1: 200 - pivotLength * Math.cos(angleRad), y1: 75 - pivotLength * Math.sin(angleRad), x2: 200 + pivotLength * Math.cos(angleRad), y2: 75 + pivotLength * Math.sin(angleRad) }}
              transition={{ type: 'spring', stiffness: 90, damping: 12 }}
              stroke="#1d1d1f" 
              strokeWidth="4" 
            />

            {/* Left Hanging Pan */}
            <motion.g 
              animate={{ x: leftX - 80, y: leftY - 70 }}
              transition={{ type: 'spring', stiffness: 90, damping: 12 }}
            >
              <path d="M 80,70 L 50,140 L 110,140 Z" fill="none" stroke="#8e8e93" strokeWidth="1.5" />
              <line x1="45" y1="140" x2="115" y2="140" stroke="#1d1d1f" strokeWidth="3" />
              <rect 
                x={80 - betaSize / 2} 
                y={140 - betaSize} 
                width={betaSize} 
                height={betaSize} 
                fill="#ff3b30" 
                rx="4" 
              />
              <text x="80" y={145 - betaSize/2} textAnchor="middle" className="text-[8px] font-extrabold fill-white font-sans">
                {leftLabel}
              </text>
            </motion.g>

            {/* Right Hanging Pan */}
            <motion.g 
              animate={{ x: rightX - 320, y: rightY - 70 }}
              transition={{ type: 'spring', stiffness: 90, damping: 12 }}
            >
              <path d="M 320,70 L 290,140 L 350,140 Z" fill="none" stroke="#8e8e93" strokeWidth="1.5" />
              <line x1="285" y1="140" x2="355" y2="140" stroke="#1d1d1f" strokeWidth="3" />
              
              {/* Return vector arrows */}
              <motion.path 
                animate={{
                  d: `M 320,140 L 320,${140 - (10 + leftVal * 18)} M 312,${140 - (leftVal * 18)} L 320,${140 - (10 + leftVal * 18)} L 328,${140 - (leftVal * 18)}`
                }}
                transition={{ type: 'spring', stiffness: 90, damping: 12 }}
                stroke="#0066cc" 
                strokeWidth="4.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
              <text x="320" y="152" textAnchor="middle" className="text-[8px] font-extrabold fill-[#0066cc] font-sans">
                {rightLabel}
              </text>
            </motion.g>
          </svg>
        </div>
      );
    }

    case 'timeline': {
      const timeVal = getValue(0) || 1;
      const timeLabel = getVarLabel(0);
      const maxTime = 10;
      const progress = Math.max(0, Math.min(timeVal / maxTime, 1));
      
      const noteColorStart = interpolateColor("#fde047", "#cbd5e1", progress);
      const noteColorEnd = interpolateColor("#ca8a04", "#64748b", progress);
      const noteScale = Math.max(0.45, 1.1 - (progress * 0.5));

      return (
        <div className="flex flex-col items-center justify-center w-full h-[220px] bg-white rounded-3xl border border-[#e5e5ea] p-4 relative overflow-hidden shadow-inner select-none">
          <svg width="100%" height="100%" viewBox="0 0 400 220" className="overflow-visible">
            <defs>
              <linearGradient id="decayGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={noteColorStart} />
                <stop offset="100%" stopColor={noteColorEnd} />
              </linearGradient>
            </defs>

            {/* Time Axis Line */}
            <line x1="40" y1="110" x2="360" y2="110" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
            
            {/* Axis Tick Markers */}
            {Array.from({ length: maxTime + 1 }).map((_, i) => {
              const xTick = 40 + i * 32;
              return (
                <g key={i}>
                  <circle cx={xTick} cy="110" r="4" fill={i === timeVal ? "#0066cc" : "#94a3b8"} />
                  <text x={xTick} y="130" textAnchor="middle" className="text-[9px] font-bold fill-[#64748b] font-sans">
                    {timeLabel.split(' ')[0]} {i}
                  </text>
                </g>
              );
            })}

            {/* Sliding & Shrinking Asset */}
            <motion.g 
              animate={{ 
                x: 40 + (timeVal * 32),
                scale: noteScale
              }}
              transition={{ type: 'spring', stiffness: 90, damping: 14 }}
              className="origin-center"
            >
              <rect x="-35" y="-60" width="70" height="36" rx="4" fill="url(#decayGrad)" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="0" cy="-42" r="10" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.3" />
              <text x="0" y="-39" textAnchor="middle" className="text-[8px] font-bold fill-white font-mono">
                Asset
              </text>
              <line x1="0" y1="-24" x2="0" y2="0" stroke="#0066cc" strokeWidth="2.5" strokeDasharray="3,3" />
            </motion.g>
          </svg>
        </div>
      );
    }

    case 'stacked_bars': {
      const val1 = getValue(0);
      const val1Label = getVarLabel(0);
      const val2 = getValue(1);
      const val2Label = getVarLabel(1);
      
      const hasTwoCylinders = bound_variables.length >= 2;

      if (hasTwoCylinders) {
        const total = val1 + val2 || 1;
        const pct1 = (val1 / total) * 100;
        const pct2 = (val2 / total) * 100;

        return (
          <div className="flex flex-col items-center justify-center w-full h-[220px] bg-white rounded-3xl border border-[#e5e5ea] p-4 relative overflow-hidden shadow-inner select-none">
            <div className="flex gap-16 justify-center items-end h-[160px] w-full">
              {/* Variable A Cylinder */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-[120px] bg-[#f1f5f9] rounded-2xl relative overflow-hidden border border-[#cbd5e1] shadow-inner">
                  {/* Wave liquid */}
                  <motion.div 
                    animate={{ height: `${pct1}%` }}
                    transition={{ type: 'spring', stiffness: 70 }}
                    className="absolute bottom-0 left-0 right-0 bg-[#0066cc]/85 rounded-b-xl flex items-center justify-center text-white text-[10px] font-bold"
                  />
                  <div className="absolute top-2 left-2 w-1.5 h-[100px] bg-white/30 rounded-full" />
                </div>
                <span className="text-[9px] font-bold text-[#0066cc] uppercase tracking-wide truncate max-w-[80px]">{val1Label} ({pct1.toFixed(0)}%)</span>
              </div>

              {/* Variable B Cylinder */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-[120px] bg-[#f1f5f9] rounded-2xl relative overflow-hidden border border-[#cbd5e1] shadow-inner">
                  {/* Wave liquid */}
                  <motion.div 
                    animate={{ height: `${pct2}%` }}
                    transition={{ type: 'spring', stiffness: 70 }}
                    className="absolute bottom-0 left-0 right-0 bg-[#ff9500]/85 rounded-b-xl flex items-center justify-center text-white text-[10px] font-bold"
                  />
                  <div className="absolute top-2 left-2 w-1.5 h-[100px] bg-white/30 rounded-full" />
                </div>
                <span className="text-[9px] font-bold text-[#ff9500] uppercase tracking-wide truncate max-w-[80px]">{val2Label} ({pct2.toFixed(0)}%)</span>
              </div>
            </div>
          </div>
        );
      } else {
        // Single blended level cylinder
        const maxLevel = 25;
        const levelPct = Math.min(100, Math.max(10, (val1 / maxLevel) * 100));

        return (
          <div className="flex flex-col items-center justify-center w-full h-[220px] bg-white rounded-3xl border border-[#e5e5ea] p-4 relative overflow-hidden shadow-inner select-none">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-[130px] bg-[#f1f5f9] rounded-3xl relative overflow-hidden border border-[#cbd5e1] shadow-inner">
                <motion.div 
                  animate={{ height: `${levelPct}%` }}
                  transition={{ type: 'spring', stiffness: 70 }}
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0066cc]/90 to-[#2997ff]/80 rounded-b-2xl"
                />
                <div className="absolute top-3 left-3 w-2.5 h-[100px] bg-white/25 rounded-full" />
              </div>
              <span className="text-[10px] font-bold text-[#1d1d1f] uppercase tracking-wide text-center">{val1Label} ({Number(val1).toFixed(1)}%)</span>
            </div>
          </div>
        );
      }
    }

    default:
      return null;
  }
}
