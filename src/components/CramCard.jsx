import { useState, useEffect } from 'react';
import LearnMore from './LearnMore';
import { saveUserNote, toggleStarStatus } from '../db/progressDB';

export default function CramCard({ card, stat, onReview, isFlipped, onFlip, onNoteUpdated }) {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(stat?.note || '');

  useEffect(() => {
    setNoteText(stat?.note || '');
  }, [stat?.note]);

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
      className="relative w-full cursor-pointer group perspective-1000 min-h-[220px] card-container"
      onClick={() => {
        if (!isEditingNote) onFlip();
      }}
    >
      <div 
        className="w-full h-full min-h-[220px] transition-transform duration-500 ease-out relative transform-style-3d"
        style={{ transform: isFlipped ? 'rotateX(180deg)' : 'rotateX(0deg)' }}
      >
        
        {/* FRONT FACE */}
        <div 
          className={`w-full min-h-[220px] p-6 rounded-[24px] bg-[#ffffff] dark:bg-[#1c1c1e] apple-shadow flex flex-col gap-3 ${isFlipped ? 'absolute inset-0' : 'relative'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-center w-full pb-2">
            <span className="text-[11px] font-semibold tracking-wide text-[#86868b] uppercase truncate pr-2 flex-1">
              {card.subcategory || card.category}
            </span>
            <button 
              onClick={async (e) => { 
                e.stopPropagation(); 
                const newStatus = await toggleStarStatus(card.id);
                if (onNoteUpdated) onNoteUpdated(card.id, noteText, newStatus);
              }}
              className={`text-lg p-1 transition-colors ${stat?.starred ? 'text-[#f5a623]' : 'text-[#d2d2d7] dark:text-[#555] hover:text-[#f5a623] dark:hover:text-[#f5a623]'}`}
            >
              {stat?.starred ? '★' : '☆'}
            </button>
          </div>
          <div className="font-semibold text-lg md:text-xl leading-snug pb-8 text-[#1d1d1f] dark:text-[#f5f5f7]">
            {card.question}
          </div>
          <div className="absolute bottom-5 left-5 text-[12px] font-medium text-[#0066cc] dark:text-[#2997ff] mt-2 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
            Tap to reveal
          </div>
        </div>

        {/* BACK FACE (Apple Blue) */}
        <div 
          className={`w-full min-h-[220px] p-6 rounded-[24px] bg-[#0066cc] dark:bg-[#0055aa] text-white apple-shadow flex flex-col gap-3 ${!isFlipped ? 'absolute inset-0' : 'relative'}`}
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateX(180deg)' 
          }}
        >
          <div className="flex justify-between items-center w-full pb-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-[11px] font-semibold tracking-wide text-white/70 uppercase flex items-center gap-1.5">
              Answer
            </span>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsEditingNote(true); }}
                className="text-[11px] font-medium text-white hover:text-white/80 transition-colors px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full"
              >
                Edit Note
              </button>
            </div>
          </div>
          <div className="font-medium text-base md:text-lg leading-snug mb-4 text-white">
            {card.answer}
          </div>
          
          <div className="mt-2 text-white/90" onClick={e => e.stopPropagation()}>
            <LearnMore explanation={card.explanation} />
            
            {/* USER NOTE SECTION */}
            {(noteText || isEditingNote) && (
              <div 
                className="mt-4 p-4 rounded-xl bg-white/10 backdrop-blur-sm"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
              >
                <div className="text-[11px] font-semibold text-white/70 tracking-wide mb-2 uppercase">My Notes</div>
                {isEditingNote ? (
                  <div className="flex flex-col gap-2">
                    <textarea 
                      value={noteText}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full h-20 p-2 rounded-lg bg-white text-[#1d1d1f] font-mono text-[12px] border border-transparent focus:outline-none focus:ring-2 focus:ring-white transition-all resize-none"
                      placeholder="Type your personal STAR story or mnemonic here..."
                    />
                    <div className="flex justify-end gap-2 mt-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsEditingNote(false); }}
                        className="px-3 py-1 text-[12px] font-medium text-white bg-white/20 hover:bg-white/30 rounded-full transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveNote}
                        className="px-3 py-1 text-[12px] font-medium text-[#0066cc] bg-white hover:bg-gray-100 rounded-full transition-colors"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-[13px] leading-relaxed whitespace-pre-wrap">{noteText}</div>
                )}
              </div>
            )}

            {onReview && !isEditingNote && (
              <div className="flex gap-2 mt-5 pt-4 border-t border-white/20">
                <button 
                  onClick={() => onReview('hard')}
                  className="flex-1 py-2 text-[12px] font-medium rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Hard
                </button>
                <button 
                  onClick={() => onReview('good')}
                  className="flex-1 py-2 text-[12px] font-medium rounded-xl bg-white/20 text-white hover:bg-white/30 transition-colors"
                >
                  Good
                </button>
                <button 
                  onClick={() => onReview('easy')}
                  className="flex-1 py-2 text-[12px] font-medium rounded-xl bg-white text-[#0066cc] hover:bg-gray-100 transition-colors shadow-sm"
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
