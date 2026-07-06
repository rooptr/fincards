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
      className="relative w-full max-w-lg md:max-w-2xl mx-auto h-full max-h-[65vh] md:h-[450px] md:max-h-[450px] min-h-[320px] cursor-pointer group [perspective:1200px]"
      onClick={() => {
        if (!isEditingNote) setIsFlipped(!isFlipped);
      }}
    >
      <div 
        className={`w-full h-full transition-transform duration-500 ease-out relative ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* Front Face */}
        <div 
          className="absolute inset-0 w-full h-full p-6 md:p-10 flex flex-col 
                     bg-white border-4 border-black 
                     shadow-[8px_8px_0_0_rgba(0,0,0,1)]
                     overflow-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-0 left-0 w-full flex justify-between items-stretch border-b-2 border-black bg-[#f4f4f4] z-20">
            <div className="px-4 py-2 font-bold text-sm tracking-widest text-[#ff5000] uppercase truncate border-r-2 border-black flex-1">
              {card.subcategory || card.category}
            </div>
            <button 
              onClick={async (e) => { 
                e.stopPropagation(); 
                const newStatus = await toggleStarStatus(card.id);
                if (onNoteUpdated) onNoteUpdated(card.id, noteText, newStatus);
              }}
              className="px-4 py-2 font-bold text-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              {stats?.starred ? '★' : '☆'}
            </button>
          </div>

          
          <div className="flex-grow flex flex-col justify-start mt-16 overflow-y-auto pr-2 w-full no-scrollbar">
            <h2 className="text-xl md:text-2xl font-bold text-black leading-snug break-words">
              {card.question}
            </h2>
          </div>
          
          <div className="flex-shrink-0 mt-4 flex items-center gap-3 text-black font-bold uppercase text-sm border-2 border-black px-4 py-2 bg-[#ffdd00] shadow-[4px_4px_0_0_rgba(0,0,0,1)] group-hover:bg-black group-hover:text-white transition-colors w-max mx-auto md:mx-0">
            <span>[ FLIP TO REVEAL ]</span>
          </div>
        </div>

        {/* Back Face */}
        <div 
          className="absolute inset-0 w-full h-full p-6 md:p-10 flex flex-col 
                     bg-[#111111] text-white border-4 border-black 
                     shadow-[8px_8px_0_0_rgba(0,0,0,1)]"
          style={{ 
            backfaceVisibility: 'hidden', 
            transform: 'rotateY(180deg)' 
          }}
        >
          <div className="absolute top-0 left-0 w-full flex justify-between items-stretch border-b-2 border-white bg-black z-20">
            <div className="px-4 py-2 border-r-2 border-white font-bold text-sm tracking-widest text-white uppercase flex items-center gap-2">
              <span className="w-2 h-2 bg-[#00ff00] rounded-full"></span>
              ANSWER
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); e.preventDefault(); setIsEditingNote(true); }}
              className="px-4 py-2 font-bold text-sm tracking-widest text-[#ffdd00] uppercase hover:bg-white hover:text-black transition-colors"
            >
              [ EDIT NOTE ]
            </button>
          </div>
          
          <div className="flex-grow flex flex-col justify-start mt-16 overflow-y-auto pr-2 no-scrollbar">
            <p className="text-lg md:text-2xl font-bold leading-snug mb-6">
              {card.answer}
            </p>
            
            <LearnMore explanation={card.explanation} source={card.source} />

            {/* USER NOTE SECTION */}
            {(noteText || isEditingNote) && (
              <div 
                className="mt-6 p-4 border-2 border-[#ffdd00] bg-[#1a1a1a]"
                onClick={(e) => { e.stopPropagation(); e.preventDefault(); }}
              >
                <div className="text-xs font-bold text-[#ffdd00] tracking-widest mb-2 uppercase">[ MY NOTES ]</div>
                {isEditingNote ? (
                  <div className="flex flex-col gap-2">
                    <textarea 
                      value={noteText}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setNoteText(e.target.value)}
                      className="w-full h-24 p-2 bg-black text-white font-mono text-sm border-2 border-[#ffdd00] focus:outline-none focus:bg-[#222]"
                      placeholder="Type your personal STAR story or mnemonic here..."
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setIsEditingNote(false); }}
                        className="px-3 py-1 text-xs font-bold border-2 border-white bg-black text-white hover:bg-white hover:text-black"
                      >
                        [ CANCEL ]
                      </button>
                      <button 
                        onClick={handleSaveNote}
                        className="px-3 py-1 text-xs font-bold border-2 border-[#ffdd00] bg-[#ffdd00] text-black hover:bg-white hover:border-white"
                      >
                        [ SAVE ]
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm font-mono whitespace-pre-wrap">{noteText}</div>
                )}
              </div>
            )}
          </div>

          {/* REVIEW BUTTONS */}
          <div className="flex-shrink-0 mt-4">
            {onReview && !isEditingNote && (
              <div className="flex gap-2 pt-4 border-t-2 border-white/20">
                <button 
                  onClick={(e) => { e.stopPropagation(); onReview('hard'); }}
                  className="flex-1 py-3 text-xs md:text-sm font-bold tracking-widest bg-black text-white border-2 border-white shadow-[2px_2px_0_0_#fff] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-white hover:text-black transition-all"
                >
                  [ HARD ]
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onReview('good'); }}
                  className="flex-1 py-3 text-xs md:text-sm font-bold tracking-widest bg-white text-black border-2 border-white shadow-[2px_2px_0_0_#fff] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-gray-200 transition-all"
                >
                  [ GOOD ]
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onReview('easy'); }}
                  className="flex-1 py-3 text-xs md:text-sm font-bold tracking-widest bg-gray-300 text-black border-2 border-white shadow-[2px_2px_0_0_#fff] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] hover:bg-gray-400 transition-all"
                >
                  [ EASY ]
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
