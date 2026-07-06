import React from 'react';

export default function ShortcutView({ deck }) {
  // deck contains all cards of type 'shortcut' for the Aptitude category

  return (
    <div className="w-full min-h-full overflow-y-auto bg-[#f5f5f7] dark:bg-black pb-24 rounded-t-3xl md:rounded-t-none">
      {/* Hero Section */}
      <div className="px-6 py-12 md:py-20 max-w-4xl mx-auto text-center">
        <h2 className="text-[12px] md:text-[14px] font-semibold tracking-widest uppercase text-[#86868b] mb-3">
          Quantitative Aptitude
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
          Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#3399ff]">Shortcuts.</span>
        </h1>
        <p className="text-lg md:text-xl font-medium text-[#86868b] max-w-2xl mx-auto leading-relaxed">
          Essential tricks to solve quantitative problems quickly and accurately.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="px-4 md:px-8 max-w-4xl mx-auto space-y-8 md:space-y-12">
        {deck.map((card, index) => (
          <article 
            key={card.id}
            className="group relative bg-white dark:bg-[#1c1c1e] rounded-[32px] p-6 md:p-10 apple-shadow hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
            {/* Subtle Gradient Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066cc]/20 to-[#3399ff]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="flex flex-col md:flex-row gap-6 md:gap-10">
              
              {/* Left Column: Title & Formula */}
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f5f5f7] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] text-[12px] font-semibold tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-[#0066cc]"></span>
                  Trick {String(index + 1).padStart(2, '0')}
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-tight">
                  {card.question}
                </h3>
                
                <div className="pt-2">
                  <p className="text-lg md:text-xl font-semibold text-[#0066cc] dark:text-[#2997ff]">
                    {card.answer}
                  </p>
                </div>
              </div>

              {/* Right Column: Detailed Explanation (The "How-To") */}
              <div className="flex-1 bg-[#f5f5f7] dark:bg-black/20 rounded-[20px] p-5 md:p-6 border border-black/5 dark:border-white/5">
                <h4 className="text-[13px] font-semibold tracking-wide uppercase text-[#86868b] mb-3">
                  How it works
                </h4>
                <div className="text-[14px] md:text-[15px] leading-relaxed font-medium text-[#1d1d1f] dark:text-[#a1a1a6] whitespace-pre-wrap">
                  {card.explanation}
                </div>
              </div>

            </div>
          </article>
        ))}
        
        {deck.length === 0 && (
          <div className="text-center text-[#86868b] font-medium py-12">
            No shortcuts available in this deck.
          </div>
        )}
      </div>
    </div>
  );
}
