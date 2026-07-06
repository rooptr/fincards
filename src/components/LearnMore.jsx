import { useState } from 'react';

export default function LearnMore({ explanation, source }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pt-4 mt-auto">
      <button 
        onClick={(e) => {
          e.stopPropagation(); // prevent flip
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 text-[13px] font-medium text-white/80 hover:text-white transition-colors focus:outline-none"
      >
        <span>Learn more</span>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm text-white text-[13px] md:text-[14px] font-medium shadow-sm border border-transparent">
            <p className="leading-relaxed">{explanation}</p>
            {source && (
              <div className="mt-3 pt-3 border-t border-white/20 text-[11px] font-medium text-white/70 uppercase tracking-wide flex items-center gap-1.5">
                <span>Source: {source}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
