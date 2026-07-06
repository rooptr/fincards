import { useState, useEffect } from 'react';
import FlashCard from './components/FlashCard';
import CramCard from './components/CramCard';
import cardsData from './data/cards.json';
import { getAllProgress, saveCardProgress } from './db/progressDB';
import { calculateNextReview } from './utils/srsAlgorithm';

export default function App() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [progressData, setProgressData] = useState({}); // { cardId: stats }
  
  const [activeDeck, setActiveDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('focus'); // 'focus' | 'list'
  const [returnToList, setReturnToList] = useState(false);
  const [flippedCardId, setFlippedCardId] = useState(null); // track flipped card in Cram Mode
  const [searchQuery, setSearchQuery] = useState(''); // search query

  // Load progress and cards on mount
  useEffect(() => {
    const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyerLC0EU-OiK_nncqf9IHWGJk0yaU47XlTO9_nuZ_5qRFqiyxrrvpqPx4ay8Clhilc/exec";
    
    // Fetch live cards from Google Sheets, fallback to local JSON if it fails
    const fetchCards = fetch(WEBHOOK_URL)
      .then(res => res.json())
      .catch(() => cardsData);

    const fetchProgress = getAllProgress();

    Promise.all([fetchCards, fetchProgress]).then(([liveCards, progressArr]) => {
      // Merge local master deck with any live additions from Google Sheets
      const combinedDeck = [...cardsData];
      if (liveCards && Array.isArray(liveCards)) {
        const validLiveCards = liveCards.filter(c => c.id && c.question);
        combinedDeck.push(...validLiveCards);
      }
      setActiveDeck(combinedDeck);
      
      const progressMap = {};
      progressArr.forEach(item => {
        progressMap[item.cardId] = item;
      });
      setProgressData(progressMap);
      setLoading(false);
    });
  }, []);

  // Filter deck based on search query
  const filteredDeck = activeDeck.filter(card => {
    const query = searchQuery.toLowerCase();
    return (
      card.question.toLowerCase().includes(query) ||
      (card.answer && card.answer.toLowerCase().includes(query)) ||
      (card.category && card.category.toLowerCase().includes(query))
    );
  });

  const handleNext = () => {
    setReturnToList(false);
    if (currentCardIndex < activeDeck.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setReturnToList(false);
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const handleReview = async (cardId, rating) => {
    const previousStats = progressData[cardId] || null;
    const newStats = calculateNextReview(rating, previousStats);
    
    // Save to IndexedDB
    await saveCardProgress(cardId, newStats);
    
    // Update local state
    setProgressData(prev => ({
      ...prev,
      [cardId]: newStats
    }));

    // Auto-advance or return to list
    if (returnToList) {
      setViewMode('list');
      setReturnToList(false);
    } else {
      handleNext();
    }
  };

  const handleNoteUpdated = (cardId, noteText) => {
    setProgressData(prev => ({
      ...prev,
      [cardId]: {
        ...(prev[cardId] || {}),
        note: noteText
      }
    }));
  };

  // Swipe gesture handlers
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  if (loading) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center bg-[#e5e5e5] text-black font-bold text-xl uppercase tracking-widest">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 bg-[#ff5000] border-2 border-black rounded-full animate-ping"></div>
          [ SYNCING SHEETS ]
        </div>
      </div>
    );
  }

  if (activeDeck.length === 0) {
    return (
      <div className="h-[100dvh] w-full flex items-center justify-center bg-[#e5e5e5] text-black font-bold text-xl uppercase tracking-widest text-center p-8">
        [ NO CARDS FOUND IN DATABASE. GO ADD SOME FROM THE NEWSPAPER APP! ]
      </div>
    );
  }

  return (
    <div 
      className="h-[100dvh] w-full flex flex-col bg-[#e5e5e5] text-black overflow-hidden selection:bg-black selection:text-[#e5e5e5]"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* Brutalist Header */}
      <header className="flex-none flex items-stretch border-b-2 border-black bg-[#e5e5e5]">
        <div className="p-4 border-r-2 border-black flex-1 flex items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase flex items-center gap-3">
            <div className="w-4 h-4 bg-[#ff5000] border-2 border-black rounded-full shadow-[2px_2px_0_0_rgba(0,0,0,1)] animate-pulse"></div>
            FINANCE_CARD.OP
          </h1>
          <button 
            onClick={() => setViewMode(prev => prev === 'focus' ? 'list' : 'focus')}
            className="ml-4 px-3 py-1 text-sm font-bold border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
          >
            {viewMode === 'focus' ? '[ CRAM MODE ]' : '[ FOCUS MODE ]'}
          </button>
        </div>
        <div className="p-4 flex items-center justify-center min-w-[80px] md:min-w-[100px] bg-black text-white font-bold text-sm md:text-lg border-l-2 border-black">
          {viewMode === 'focus' ? `${String(currentCardIndex + 1).padStart(2, '0')}/${String(activeDeck.length).padStart(2, '0')}` : 'ALL'}
        </div>
      </header>

      {/* Main Content Area */}
      {viewMode === 'focus' ? (
        <>
          <main className="flex-1 min-h-0 w-full p-4 md:p-8 flex flex-col items-center justify-center">
            <FlashCard 
              key={currentCardIndex} 
              card={activeDeck[currentCardIndex]} 
              onReview={(rating) => handleReview(activeDeck[currentCardIndex].id, rating)}
              stats={progressData[activeDeck[currentCardIndex].id]}
              onNoteUpdated={handleNoteUpdated}
            />
          </main>

          {/* Footer Controls (Hidden on mobile where swipe is natural, visible on desktop) */}
          <footer className="flex-none p-4 md:p-8 w-full border-t-2 border-black bg-[#e5e5e5] flex flex-col items-center gap-2">
            <div className="w-full flex gap-4 max-w-lg mx-auto">
              <button
                onClick={handlePrev}
                disabled={currentCardIndex === 0}
                className={`flex-1 py-4 uppercase font-bold text-lg border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all ${
                  currentCardIndex === 0 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-x-[2px] translate-y-[2px]' 
                    : 'bg-white hover:bg-black hover:text-white'
                }`}
              >
                [ PREV ]
              </button>
              <button
                onClick={handleNext}
                disabled={currentCardIndex === activeDeck.length - 1}
                className={`flex-1 py-4 uppercase font-bold text-lg border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all ${
                  currentCardIndex === activeDeck.length - 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none translate-x-[2px] translate-y-[2px]'
                    : 'bg-[#ff5000] text-white hover:bg-black'
                }`}
              >
                [ NEXT ]
              </button>
            </div>
            <span className="text-xs font-bold text-black/50 uppercase tracking-widest mt-2 hidden sm:block md:hidden">
              &lt; SWIPE TO NAVIGATE &gt;
            </span>
          </footer>
        </>
      ) : (
        <>
          <div className="flex-none p-4 md:px-8 pt-4 md:pt-8 max-w-3xl mx-auto w-full">
            <input 
              type="text" 
              placeholder="SEARCH QUESTIONS, ANSWERS, CATEGORIES..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border-4 border-black bg-white font-mono font-bold text-xs md:text-sm uppercase tracking-wider placeholder-gray-400 focus:outline-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
            />
          </div>
          <main className="flex-1 overflow-y-auto w-full p-4 md:p-8 pt-2 md:pt-4 space-y-4 max-w-3xl mx-auto">
            {filteredDeck.length === 0 ? (
              <div className="text-center font-bold text-gray-400 py-8 uppercase tracking-widest">[ NO MATCHING CARDS FOUND ]</div>
            ) : (
              filteredDeck.map((card, index) => {
                const stat = progressData[card.id];
                // find actual index in activeDeck for card state tracking
                const activeIndex = activeDeck.findIndex(c => c.id === card.id);
                return (
                  <CramCard 
                    key={card.id} 
                    card={card} 
                    stat={stat} 
                    isFlipped={flippedCardId === card.id}
                    onFlip={() => setFlippedCardId(flippedCardId === card.id ? null : card.id)}
                    onReview={(rating) => {
                       setCurrentCardIndex(activeIndex);
                       handleReview(card.id, rating);
                    }} 
                    onNoteUpdated={handleNoteUpdated}
                  />
                );
              })
            )}
          </main>
        </>
      )}
      
    </div>
  );
}
