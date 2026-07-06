import { useState, useEffect, useMemo, useRef } from 'react';
import FlashCard from './components/FlashCard';
import CramCard from './components/CramCard';
import cardsData from './data/cards.json';
import { getAllProgress, saveCardProgress } from './db/progressDB';
import { calculateNextReview } from './utils/srsAlgorithm';

export default function App() {
  const [progressData, setProgressData] = useState({});
  const [masterDeck, setMasterDeck] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation State
  const [globalMode, setGlobalMode] = useState('focus'); // 'focus' | 'list'
  const [activeCategory, setActiveCategory] = useState(null); // null means dashboard
  
  const scrollPositionRef = useRef(0);
  const dashboardRef = useRef(null);
  
  // Focus Mode State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // List (Cram) Mode State
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(20);

  // PWA Install State
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  // Load progress and cards on mount
  useEffect(() => {
    const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyerLC0EU-OiK_nncqf9IHWGJk0yaU47XlTO9_nuZ_5qRFqiyxrrvpqPx4ay8Clhilc/exec";
    
    const fetchCards = fetch(WEBHOOK_URL)
      .then(res => res.json())
      .catch(() => []);

    const fetchProgress = getAllProgress();

    Promise.all([fetchCards, fetchProgress]).then(([liveCards, progressArr]) => {
      const combinedDeck = [...cardsData];
      if (liveCards && Array.isArray(liveCards)) {
        const validLiveCards = liveCards.filter(c => c.id && c.question);
        combinedDeck.push(...validLiveCards);
      }
      setMasterDeck(combinedDeck);
      
      const progressMap = {};
      progressArr.forEach(item => {
        progressMap[item.cardId] = item;
      });
      setProgressData(progressMap);
      setLoading(false);
    });
  }, []);

  // Restore dashboard scroll position
  useEffect(() => {
    if (!activeCategory && dashboardRef.current) {
      dashboardRef.current.scrollTop = scrollPositionRef.current;
    }
  }, [activeCategory, globalMode]);

  // Compute Categories for Dashboard
  const categoryStats = useMemo(() => {
    const stats = {};
    let starredCount = 0;
    
    masterDeck.forEach(card => {
      const cat = card.category;
      if (!stats[cat]) stats[cat] = 0;
      stats[cat]++;
      
      if (progressData[card.id]?.starred) {
        starredCount++;
      }
    });

    const categories = Object.keys(stats).map(name => ({
      name,
      count: stats[name]
    })).sort((a, b) => a.name.localeCompare(b.name));

    if (starredCount > 0) {
      categories.unshift({ name: '★ STARRED', count: starredCount, isSpecial: true });
    }
    
    categories.unshift({ name: 'ALL CARDS', count: masterDeck.length, isSpecial: true });

    return categories;
  }, [masterDeck, progressData]);

  // Compute Active Deck based on activeCategory
  const activeDeck = useMemo(() => {
    if (!activeCategory) return [];
    
    let deck = [];
    if (activeCategory === 'ALL CARDS') {
      deck = [...masterDeck];
    } else if (activeCategory === '★ STARRED') {
      deck = masterDeck.filter(card => progressData[card.id]?.starred);
    } else {
      deck = masterDeck.filter(card => card.category === activeCategory);
    }

    // If focus mode, shuffle the deck using Fisher-Yates
    if (globalMode === 'focus') {
      const shuffled = [...deck];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    return deck;
  }, [masterDeck, activeCategory, globalMode, progressData]);

  // Cram Mode filtering
  const filteredDeck = useMemo(() => {
    if (globalMode !== 'list') return [];
    const query = searchQuery.toLowerCase();
    return activeDeck.filter(card => (
      card.question.toLowerCase().includes(query) ||
      (card.answer && card.answer.toLowerCase().includes(query)) ||
      (card.category && card.category.toLowerCase().includes(query)) ||
      (card.subcategory && card.subcategory.toLowerCase().includes(query))
    ));
  }, [activeDeck, searchQuery, globalMode]);

  const handleNext = () => {
    if (currentCardIndex < activeDeck.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const handleReview = async (cardId, rating) => {
    const previousStats = progressData[cardId] || null;
    const newStats = calculateNextReview(rating, previousStats);
    
    await saveCardProgress(cardId, newStats);
    
    setProgressData(prev => ({
      ...prev,
      [cardId]: newStats
    }));

    if (globalMode === 'focus') {
      handleNext();
    }
  };

  const handleNoteUpdated = (cardId, noteText, starredStatus = undefined) => {
    setProgressData(prev => {
      const existing = prev[cardId] || {};
      const updated = { ...existing, note: noteText };
      if (starredStatus !== undefined) {
        updated.starred = starredStatus;
      }
      return { ...prev, [cardId]: updated };
    });
  };

  const openCategory = (category) => {
    setActiveCategory(category);
    setCurrentCardIndex(0);
    setSearchQuery('');
    setVisibleCount(20);
    setFlippedCardId(null);
  };

  const goBack = () => {
    setActiveCategory(null);
  };

  const handleDashboardScroll = (e) => {
    scrollPositionRef.current = e.target.scrollTop;
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
    if (!touchStart || !touchEnd || !activeCategory || globalMode !== 'focus') return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  const handleCramScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 400;
    if (bottom && visibleCount < filteredDeck.length) {
      setVisibleCount(prev => prev + 20);
    }
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
          {!activeCategory ? (
            <h1 className="text-xl md:text-2xl font-bold tracking-tight uppercase flex items-center gap-3">
              <div className="w-4 h-4 bg-[#ff5000] border-2 border-black rounded-full shadow-[2px_2px_0_0_rgba(0,0,0,1)] animate-pulse"></div>
              <div>
                <span style={{ fontFamily: 'TheSignature' }} className="lowercase text-3xl leading-none">fin</span>
                <span className="uppercase">CARDS</span>
              </div>
            </h1>
          ) : (
            <button 
              onClick={goBack}
              className="px-3 py-1 text-sm font-bold border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              [ ← GO BACK ]
            </button>
          )}
          
          {!activeCategory && (
            <button 
              onClick={() => setGlobalMode(prev => prev === 'focus' ? 'list' : 'focus')}
              className="ml-4 px-3 py-1 text-sm font-bold border-2 border-black bg-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px]"
            >
              {globalMode === 'focus' ? '[ CRAM MODE ]' : '[ FOCUS MODE ]'}
            </button>
          )}
        </div>
        
        {activeCategory && globalMode === 'focus' && (
          <div className="p-4 flex items-center justify-center min-w-[80px] md:min-w-[100px] bg-black text-white font-bold text-sm md:text-lg border-l-2 border-black">
            {String(currentCardIndex + 1).padStart(2, '0')}/{String(activeDeck.length).padStart(2, '0')}
          </div>
        )}
      </header>

      {/* DASHBOARD MODE */}
      {!activeCategory && (
        <main 
          ref={dashboardRef}
          onScroll={handleDashboardScroll}
          className="flex-1 overflow-y-auto w-full p-4 md:p-8 max-w-4xl mx-auto space-y-4"
        >
          <div className="text-xl font-bold uppercase tracking-widest mb-6">
            [ SELECT CATEGORY TO {globalMode === 'focus' ? 'FOCUS' : 'CRAM'} ]
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryStats.map(cat => (
              <div 
                key={cat.name}
                onClick={() => openCategory(cat.name)}
                className={`p-4 border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] flex items-center justify-between cursor-pointer active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all ${cat.isSpecial ? 'bg-[#ffdd00]' : 'bg-white hover:bg-gray-100'}`}
              >
                <span className="font-bold text-lg uppercase truncate pr-2">{cat.name}</span>
                <span className="font-bold text-sm bg-black text-white px-2 py-1 shrink-0">{cat.count}</span>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* STUDY MODES */}
      {activeCategory && (
        <>
          {globalMode === 'focus' && (
            <>
              <main className="flex-1 min-h-0 w-full p-4 md:p-8 flex flex-col items-center justify-center">
                {activeDeck.length === 0 ? (
                  <div className="font-bold text-gray-500">[ NO CARDS IN THIS CATEGORY ]</div>
                ) : (
                  <FlashCard 
                    key={currentCardIndex} 
                    card={activeDeck[currentCardIndex]} 
                    onReview={(rating) => handleReview(activeDeck[currentCardIndex].id, rating)}
                    stats={progressData[activeDeck[currentCardIndex].id]}
                    onNoteUpdated={handleNoteUpdated}
                  />
                )}
              </main>

              {activeDeck.length > 0 && (
                <footer className="flex-none p-4 md:p-8 w-full border-t-2 border-black bg-[#e5e5e5] flex flex-col items-center gap-2">
                  <div className="hidden md:flex w-full gap-4 max-w-lg mx-auto">
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
                  <span className="text-xs font-bold text-black/50 uppercase tracking-widest mt-2 md:hidden">
                    &lt; SWIPE TO NAVIGATE &gt;
                  </span>
                </footer>
              )}
            </>
          )}

          {globalMode === 'list' && (
            <>
              <div className="flex-none p-4 md:px-8 pt-4 md:pt-8 max-w-3xl mx-auto w-full">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="SEARCH QUESTIONS, ANSWERS..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-4 border-black bg-white font-mono font-bold text-xs md:text-sm uppercase tracking-wider placeholder-gray-400 focus:outline-none shadow-[4px_4px_0_0_rgba(0,0,0,1)] focus:shadow-[2px_2px_0_0_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all"
                  />
                  {deferredPrompt && (
                    <button
                      onClick={handleInstallClick}
                      className="whitespace-nowrap px-4 py-3 border-4 border-black bg-[#ffdd00] font-bold text-xs md:text-sm uppercase shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
                    >
                      [ INSTALL ]
                    </button>
                  )}
                </div>
              </div>
              <main 
                className="flex-1 overflow-y-auto w-full p-4 md:p-8 pt-2 md:pt-4 space-y-4 max-w-3xl mx-auto"
                onScroll={handleCramScroll}
              >
                {filteredDeck.length === 0 ? (
                  <div className="text-center font-bold text-gray-400 py-8 uppercase tracking-widest">[ NO MATCHING CARDS FOUND ]</div>
                ) : (
                  filteredDeck.slice(0, visibleCount).map((card) => {
                    const stat = progressData[card.id];
                    return (
                      <CramCard 
                        key={card.id} 
                        card={card} 
                        stat={stat} 
                        isFlipped={flippedCardId === card.id}
                        onFlip={() => setFlippedCardId(flippedCardId === card.id ? null : card.id)}
                        onReview={(rating) => {
                          handleReview(card.id, rating);
                        }} 
                        onNoteUpdated={handleNoteUpdated}
                      />
                    );
                  })
                )}
                {visibleCount < filteredDeck.length && (
                  <div className="text-center py-4 text-xs font-bold text-gray-500 animate-pulse uppercase tracking-widest">
                    [ SCROLL FOR MORE ]
                  </div>
                )}
              </main>
            </>
          )}
        </>
      )}
    </div>
  );
}
