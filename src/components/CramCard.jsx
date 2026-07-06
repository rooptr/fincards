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
      className="relative w-full cursor-pointer group [perspective:1200px] min-h-[200px]"
      onClick={() => {
        if (!isEditingNote) onFlip();
      }}
    >
      <div 
        className={`w-full transition-transform duration-500 ease-out relative ${
          isFlipped ? '[transform:rotateX(180deg)]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Front Face */}
        <div 
          className={`w-full p-4 md:p-6 border-4 border-black bg-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-2 ${isFlipped ? 'absolute inset-0' : 'relative'}`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex justify-between items-center w-full border-b-2 border-gray-200 pb-2 mb-2">
            <span className="text-xs font-bold tracking-widest text-[#ff5000] uppercase truncate pr-2 flex-1">
              {card.subcategory || card.category}
            </span>
            <button 
              onClick={async (e) => { 
                e.stopPropagation(); 
                const newStatus = await toggleStarStatus(card.id);
                if (onNoteUpdated) onNoteUpdated(card.id, noteText, newStatus);
              }}
              className="text-lg font-bold hover:bg-gray-200 px-2 transition-colors flex items-center justify-center"
            >
              {stat?.starred ? '★' : '☆'}
            </button>
          </div>
          <div className="font-bold text-lg md:text-xl leading-snug pb-8">
            Q. {card.question}
          </div>
          <div className="absolute bottom-4 left-4 text-sm font-bold text-gray-400 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full group-hover:bg-[#ff5000] transition-colors"></span>
            TAP TO REVEAL
          </div>
        </div>

        {/* Back Face */}
        <div 
          className={`w-full p-4 md:p-6 border-4 border-black bg-[#111111] text-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex flex-col gap-2 ${!isFlipped ? 'absolute inset-0' : 'relative'}`}
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateX(180deg)' 
          }}
        >
          <div className="flex justify-between items-center w-full border-b-2 border-white/20 pb-2 mb-2" onClick={(e) => e.stopPropagation()}>
            <span className="text-xs font-bold tracking-widest text-[#00ff00] uppercase">
              ANSWER
            </span>
            <div className="flex gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsEditingNote(true); }}
                className="text-xs font-bold tracking-widest text-[#ffdd00] px-2 py-1 uppercase hover:bg-white hover:text-black transition-colors"
              >
                [ EDIT NOTE ]
              </button>
              <button 
                  onClick={(e) => { e.stopPropagation(); onFlip(); }}
                  className="text-xs font-bold tracking-widest bg-white text-black px-2 py-1 uppercase hover:bg-gray-300 active:translate-y-[1px]"
              >
                CLOSE
              </button>
            </div>
          </div>
          <div className="font-bold text-base md:text-lg leading-snug mb-4">
            {card.answer}
          </div>
          
          <div className="mt-2" onClick={e => e.stopPropagation()}>
            <LearnMore explanation={card.explanation} source={card.source} />
            
            {/* USER NOTE SECTION */}
            {(noteText || isEditingNote) && (
              <div 
                className="mt-4 p-3 border-2 border-[#ffdd00] bg-[#1a1a1a]"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
              >
                <div className="text-xs font-bold text-[#ffdd00] tracking-widest mb-2 uppercase">[ MY NOTES ]</div>
                {isEditingNote ? (
                  <div className="flex flex-col gap-2">
                    <textarea 
                      value={noteText}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full h-20 p-2 bg-black text-white font-mono text-xs border-2 border-[#ffdd00] focus:outline-none focus:bg-[#222]"
                      placeholder="Type your personal STAR story or mnemonic here..."
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsEditingNote(false); }}
                        className="px-2 py-1 text-xs font-bold border-2 border-white bg-black text-white hover:bg-white hover:text-black"
                      >
                        [ CANCEL ]
                      </button>
                      <button 
                        onClick={handleSaveNote}
                        className="px-2 py-1 text-xs font-bold border-2 border-[#ffdd00] bg-[#ffdd00] text-black hover:bg-white hover:border-white"
                      >
                        [ SAVE ]
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-mono whitespace-pre-wrap">{noteText}</div>
                )}
              </div>
            )}

            {onReview && !isEditingNote && (
              <div className="flex gap-2 mt-4 pt-4 border-t-2 border-white/20">
                <button 
                  onClick={() => onReview('hard')}
                  className="flex-1 py-2 text-xs font-bold tracking-widest bg-black text-white border-2 border-white hover:bg-white hover:text-black transition-all"
                >
                  HARD
                </button>
                <button 
                  onClick={() => onReview('good')}
                  className="flex-1 py-2 text-xs font-bold tracking-widest bg-white text-black border-2 border-white hover:bg-gray-200 transition-all"
                >
                  GOOD
                </button>
                <button 
                  onClick={() => onReview('easy')}
                  className="flex-1 py-2 text-xs font-bold tracking-widest bg-gray-300 text-black border-2 border-white hover:bg-gray-400 transition-all"
                >
                  EASY
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
