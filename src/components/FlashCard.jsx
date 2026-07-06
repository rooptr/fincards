import { useState, useEffect } from 'react';
import LearnMore from './LearnMore';
import { saveUserNote, toggleStarStatus } from '../db/progressDB';

export default function FlashCard({ card, onReview, stats, onNoteUpdated }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(stats?.note || '');

  useEffect(() => {
    setNoteText(stats?.note || '');
  }, [stats?.note]);

  const handleSaveNote = async (e) => {
    e.stopPropagation();
    await saveUserNote(card.id, noteText);
    setIsEditingNote(false);
    if (onNoteUpdated) {
      onNoteUpdated(card.id, noteText);
    }
  };

  if (!card) return null;

  return (
    <div 
      className={`relative w-full max-w-3xl mx-auto h-full max-h-[65vh] md:max-h-[500px] min-h-[350px] cursor-pointer group perspective-1000 card-container ${isFlipped ? 'flipped' : ''}`}
      onClick={() => {
        if (!isEditingNote) setIsFlipped(!isFlipped);
      }}
    >
      <div className="card-inner w-full h-full relative transform-style-3d">
        
        {/* FRONT OF CARD (White / Dark Gray) */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#ffffff] dark:bg-[#1c1c1e] rounded-[28px] md:rounded-[36px] apple-shadow flex flex-col items-center justify-center p-6 md:p-16 text-center backface-hidden"
        >
          {/* Top Left Category */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 text-[11px] md:text-[12px] font-semibold tracking-wide text-[#86868b] uppercase">
            {card.subcategory || card.category}
          </div>

          {/* Top Right Star */}
          <button 
            onClick={async (e) => { 
              e.stopPropagation(); 
              const newStatus = await toggleStarStatus(card.id);
              if (onNoteUpdated) onNoteUpdated(card.id, noteText, newStatus);
            }}
            className={`absolute top-5 right-5 md:top-7 md:right-7 transition-colors focus:outline-none p-1 ${stats?.starred ? 'text-[#f5a623]' : 'text-[#d2d2d7] dark:text-[#555] hover:text-[#f5a623] dark:hover:text-[#f5a623]'}`}
          >
            {stats?.starred ? (
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            ) : (
              <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg>
            )}
          </button>
          
          <h2 className="text-2xl md:text-4xl font-semibold leading-tight md:leading-snug mt-2 text-[#1d1d1f] dark:text-[#f5f5f7] overflow-y-auto no-scrollbar max-h-[80%] pb-2 w-full px-4">
            {card.question}
          </h2>
          
          <div className="absolute bottom-6 md:bottom-8 text-[13px] text-[#0066cc] dark:text-[#2997ff] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            Tap to reveal
          </div>
        </div>

        {/* BACK OF CARD (Apple Blue theme) */}
        <div 
          className="absolute inset-0 w-full h-full bg-[#0066cc] dark:bg-[#0055aa] rounded-[28px] md:rounded-[36px] apple-shadow flex flex-col p-6 md:p-12 text-left backface-hidden rotate-y-180"
        >
          <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-1.5 text-[11px] md:text-[12px] font-semibold tracking-wide text-white/70 uppercase">
            Answer
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); setIsEditingNote(true); }}
            className="absolute top-5 right-5 md:top-7 md:right-7 text-[12px] font-medium text-white hover:text-white/80 transition-colors px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full"
          >
            Edit Note
          </button>
          
          <div className="flex-grow flex flex-col justify-start mt-12 overflow-y-auto pr-2 no-scrollbar">
            <p className="text-lg md:text-2xl font-medium leading-relaxed text-white mb-6">
              {card.answer}
            </p>
            
            <div className="text-white/90">
              <LearnMore explanation={card.explanation} />
            </div>

            {/* USER NOTE SECTION */}
            {(noteText || isEditingNote) && (
              <div 
                className="mt-6 p-5 rounded-2xl bg-white/10 backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); }}
              >
                <div className="text-[11px] font-semibold text-white/70 tracking-wide mb-2 uppercase">My Notes</div>
                {isEditingNote ? (
                  <div className="flex flex-col gap-3">
                    <textarea 
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full h-24 p-3 rounded-xl bg-white text-[#1d1d1f] font-mono text-[13px] border border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"
                      placeholder="Type your personal STAR story or mnemonic here..."
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsEditingNote(false); }}
                        className="px-4 py-1.5 text-[13px] font-medium text-white bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveNote}
                        className="px-4 py-1.5 text-[13px] font-medium text-[#0066cc] bg-white hover:bg-gray-100 rounded-full transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-[14px] leading-relaxed text-white whitespace-pre-wrap">{noteText}</div>
                )}
              </div>
            )}
          </div>

          {/* REVIEW BUTTONS */}
          <div className="flex-shrink-0 mt-6 pt-4 border-t border-white/20">
            {onReview && !isEditingNote && (
              <div className="flex gap-3">
                <button 
                  onClick={(e) => { e.stopPropagation(); onReview('hard'); }}
                  className="flex-1 py-3 text-[13px] font-medium rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Hard
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onReview('good'); }}
                  className="flex-1 py-3 text-[13px] font-medium rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  Good
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onReview('easy'); }}
                  className="flex-1 py-3 text-[13px] font-medium rounded-2xl bg-white text-[#0066cc] hover:bg-gray-100 transition-colors shadow-sm"
                >
                  Easy
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
