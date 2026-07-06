import { useState } from 'react';

export default function LearnMore({ explanation, source }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-t-2 border-white pt-4 mt-auto">
      <button 
        onClick={(e) => {
          e.stopPropagation(); // prevent flip
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between text-sm md:text-base font-bold tracking-widest uppercase text-[#ff5000] hover:text-white transition-colors focus:outline-none"
      >
        <span>{isOpen ? '[ CLOSE LOG ]' : '[ ACCESS LOG ]'}</span>
        <div className={`p-1 border-2 border-transparent transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden">
          <div className="p-4 bg-white text-black border-2 border-white text-sm md:text-base font-medium shadow-[4px_4px_0_0_#ff5000]">
            <p className="leading-relaxed font-bold">{explanation}</p>
            {source && (
              <div className="mt-4 pt-4 border-t-2 border-black/20 text-xs font-bold text-black/50 uppercase tracking-widest flex items-center gap-2">
                <span>SRC: {source}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
