import { useState, useEffect, useMemo, useRef } from 'react';
import FlashCard from './components/FlashCard';
import CramCard from './components/CramCard';
import ShortcutView from './components/ShortcutView';
import SecuritizationView from './components/SecuritizationView';
import KnowledgeGraphView from './components/KnowledgeGraphView';
import MobileKnowledgeGraph from './components/MobileKnowledgeGraph';
import LearningMapView from './components/LearningMapView';
import DeepDiveReader from './components/DeepDiveReader.jsx';
import PodcastLauncher from './components/podcast/PodcastLauncher.jsx';
import cardsData from './data/cards.json';
import { accountingCoreCards } from './data/accountingCoreCards';
import { accountingAptitudeCards } from './data/accountingAptitudeCards';
import { accountingAdvancedCards } from './data/accountingAdvancedCards';
import conceptsData from './data/concepts.json';
import { getAllProgress, saveCardProgress } from './db/progressDB';
import { calculateNextReview } from './utils/srsAlgorithm';

const conceptsById = new Map(conceptsData.map((concept) => [concept.id, concept]));
const normalizeTopicText = (value = '') => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

function resolveTopicCards(deck, topic) {
  if (!topic) return { cards: [], usedFallback: false };

  const linkedCardIds = new Set([
    ...(topic.primaryFlashcards || []),
    ...(topic.supportingFlashcards || []),
  ]);
  const linkedCards = deck.filter((card) => linkedCardIds.has(card.id));
  if (linkedCards.length > 0) return { cards: linkedCards, usedFallback: false };

  const searchTerms = [topic.canonicalName, topic.normalizedName, ...(topic.aliases || [])]
    .map(normalizeTopicText)
    .filter((term) => term.length >= 3);
  const cards = deck.filter((card) => {
    const text = normalizeTopicText(`${card.question} ${card.answer} ${card.explanation || ''}`);
    return searchTerms.some((term) => text.includes(term));
  });
  return { cards, usedFallback: true };
}

export default function App() {
  const [progressData, setProgressData] = useState({});
  const [masterDeck, setMasterDeck] = useState(cardsData);
  const [loading, setLoading] = useState(false);
  const [customCards, setCustomCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem('deepti_custom_cards') || '[]'); }
    catch { return []; }
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [formQ, setFormQ] = useState('');
  const [formA, setFormA] = useState('');
  const [formCat, setFormCat] = useState('');
  const [formSaved, setFormSaved] = useState(false);
  
  // Navigation State
  const initialRouteParams = new URLSearchParams(window.location.search);
  const initialCategory = initialRouteParams.get('category');
  const initialTopicId = initialRouteParams.get('topic');
  const initialTopic = conceptsById.get(initialTopicId);
  const [globalMode, setGlobalMode] = useState(window.location.pathname.includes('/deep-dive') ? 'lesson' : 'focus'); // 'focus' | 'list' | 'graph'
  const [activeCategory, setActiveCategory] = useState(initialTopic ? 'All Cards' : initialCategory || null); // null means dashboard
  const [selectedTopicId, setSelectedTopicId] = useState(initialTopic?.id || null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [theme, setTheme] = useState('light');
  const [showSecuritizationNotes, setShowSecuritizationNotes] = useState(true);
  const [graphDeck, setGraphDeck] = useState(null); // null = not in graph study mode
  const [graphDeckTitle, setGraphDeckTitle] = useState('');
  const [graphDeckFallback, setGraphDeckFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
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
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Sync dark mode class
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Update theme-color meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#000000' : '#f5f5f7');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Load progress and cards on mount
  useEffect(() => {
    const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyerLC0EU-OiK_nncqf9IHWGJk0yaU47XlTO9_nuZ_5qRFqiyxrrvpqPx4ay8Clhilc/exec?t=" + Date.now();
    const localDeck = [...cardsData, ...accountingCoreCards, ...accountingAptitudeCards, ...accountingAdvancedCards];

    const fetchCards = fetch(WEBHOOK_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.text();
      })
      .then(text => {
        try { return JSON.parse(text); }
        catch { throw new Error("Invalid JSON from Sheets. Are you logged in or is it deployed to 'Anyone'?"); }
      })
      .catch(err => {
        setFetchError(err.message || 'Fetch failed');
        return [];
      });

    const fetchProgress = getAllProgress().catch(err => {
      console.error("IndexedDB progress fetch failed:", err);
      return [];
    });

    Promise.all([fetchCards, fetchProgress]).then(([liveCards, progressArr]) => {
      const combinedDeck = [...localDeck];
      if (Array.isArray(liveCards)) {
        combinedDeck.push(...liveCards.filter(c => c.id && c.question));
      }

      // Dynamic mapping & scrubbing
      const scrubbedDeck = combinedDeck.map(card => {
        let category = String(card.category || '');
        const catLower = category.toLowerCase();
        
        if (catLower === 'from news app' || catLower === 'aptitude quiz' || catLower === 'apti quiz') {
          category = 'From News App';
        }

        let answer = String(card.answer || '');
        if (answer.toLowerCase().includes('indiabix')) {
          answer = answer.replace(/in\s+indiabix/gi, '').replace(/from\s+indiabix/gi, '').replace(/indiabix/gi, '').replace(/\s+/g, ' ').trim();
        }

        let explanation = String(card.explanation || '');
        if (explanation.toLowerCase().includes('indiabix')) {
          explanation = explanation.replace(/in\s+indiabix/gi, '').replace(/from\s+indiabix/gi, '').replace(/indiabix/gi, '').replace(/\s+/g, ' ').trim();
        }

        let source = String(card.source || '');
        if (source.toLowerCase().includes('indiabix')) {
          source = source.replace(/indiabix/gi, 'From News App').trim();
        }

        let subcategory = card.subcategory;
        if (category === 'Aptitude' && !subcategory) {
          subcategory = 'Quantitative'; // Fallback so they don't disappear in the UI menu
        }

        return { ...card, category, subcategory, answer, explanation, source };
      });

      const savedCustom = (() => {
        try { return JSON.parse(localStorage.getItem('deepti_custom_cards') || '[]'); }
        catch { return []; }
      })();
      setMasterDeck([...scrubbedDeck, ...savedCustom]);
      setLoading(false);
      const progressMap = {};
      if (Array.isArray(progressArr)) {
        progressArr.forEach(item => { progressMap[item.cardId] = item; });
      }
      setProgressData(progressMap);
    }).catch(err => {
      console.error("Initialization error:", err);
      setFetchError(err.message || 'Initialization failed');
      setMasterDeck([...localDeck, ...customCards]);
      setProgressData({});
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
      categories.unshift({ name: 'Starred', count: starredCount, isSpecial: true, subtitle: 'Favorites' });
    }
    
    categories.unshift({ name: 'All Cards', count: masterDeck.length, isSpecial: true, subtitle: 'Library' });

    return categories;
  }, [masterDeck, progressData]);

  const selectedTopic = selectedTopicId ? conceptsById.get(selectedTopicId) : null;
  const topicDeck = useMemo(
    () => resolveTopicCards(masterDeck, selectedTopic),
    [masterDeck, selectedTopic],
  );

  // Compute Active Deck based on activeCategory
  const activeDeck = useMemo(() => {
    if (!activeCategory) return [];
    
    // Graph Study mode: use pre-assembled custom deck
    if (graphDeck) return graphDeck;

    let deck = [];
    if (selectedTopic) {
      deck = topicDeck.cards;
    } else if (activeCategory === 'All Cards') {
      deck = [...masterDeck];
    } else if (activeCategory === 'Starred') {
      deck = masterDeck.filter(card => progressData[card.id]?.starred);
    } else {
      deck = masterDeck.filter(card => card.category === activeCategory);
    }

    // Filter by subcategory if activeCategory is Aptitude and activeSubcategory is set
    if (activeCategory === 'Aptitude' && activeSubcategory && activeSubcategory !== 'All') {
      if (activeSubcategory === 'Shortcuts') {
        deck = deck.filter(card => 
          (card.explanation && card.explanation.toLowerCase().includes('shortcut')) || 
          (card.answer && card.answer.toLowerCase().includes('shortcut')) ||
          card.card_type === 'shortcut'
        );
      } else {
        deck = deck.filter(card => {
          let cleanSub = (card.subcategory || '').replace('Aptitude: ', '').trim();
          if (cleanSub === 'Quant/Formula-Based') cleanSub = 'Quantitative';
          return cleanSub === activeSubcategory;
        });
      }
    }

    if (globalMode === 'focus') {
      const shuffled = [...deck];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    return deck;
  }, [masterDeck, activeCategory, activeSubcategory, globalMode, progressData, selectedTopic, topicDeck]);

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

  const isSecuritizationCategory = (cat) => cat && cat.toLowerCase().includes('securitization');

  const openCategory = (category) => {
    setSelectedTopicId(null);
    setActiveCategory(category);
    setActiveSubcategory(null);
    setCurrentCardIndex(0);
    setSearchQuery('');
    setVisibleCount(20);
    setFlippedCardId(null);
    setShowSecuritizationNotes(isSecuritizationCategory(category));
  };

  const goBack = () => {
    if (selectedTopic) {
      setSelectedTopicId(null);
      setActiveCategory(null);
      setActiveSubcategory(null);
    } else if (activeCategory === '__graph__') {
      // Return to knowledge graph
      setActiveCategory(null);
      setActiveSubcategory(null);
      setGraphDeck(null);
      setGraphDeckTitle('');
      setGraphDeckFallback(false);
      setGlobalMode('graph');
    } else if (isSecuritizationCategory(activeCategory) && !showSecuritizationNotes) {
      setShowSecuritizationNotes(true);
    } else if (activeCategory === 'Aptitude' && activeSubcategory) {
      setActiveSubcategory(null);
    } else {
      setActiveCategory(null);
      setActiveSubcategory(null);
    }
  };

  const handleDashboardScroll = (e) => {
    scrollPositionRef.current = e.target.scrollTop;
  };

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
      <div className="h-[100dvh] w-full flex items-center justify-center bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] font-medium text-lg transition-colors duration-300">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-t-[#0066cc] border-r-[#0066cc] border-b-transparent border-l-transparent animate-spin"></div>
          Syncing Cards...
        </div>
      </div>
    );
  }

  const handleStudyNow = (node) => {
    if (!node) return;
    const title = node.label || node.title;

    let matched = masterDeck.filter(card => {
      const haystack = `${card.question} ${card.answer} ${card.category} ${card.subcategory || ''}`.toLowerCase();
      return haystack.includes(title.toLowerCase());
    });

    const isFallback = matched.length < 3;
    if (isFallback) {
      // If still not enough, just match Securitization cards
      matched = masterDeck.filter(card => card.category?.toLowerCase().includes('securitization'));
    }
    if (isFallback && node.flashcardTopicId) {
      matched = masterDeck.filter(card => card.category === node.flashcardTopicId);
    }

    if (matched.length === 0) return;

    const shuffled = [...matched];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    setGraphDeck(shuffled);
    setGraphDeckTitle(title);
    setGraphDeckFallback(isFallback);
    setActiveCategory('__graph__');
    setGlobalMode('focus');
  };

  return (
    <div 
      className={`${globalMode === 'lesson' ? 'min-h-[100dvh]' : 'h-[100dvh] overflow-hidden'} w-full flex flex-col bg-[#f5f5f7] dark:bg-black text-[#1d1d1f] dark:text-[#f5f5f7] selection:bg-[#0066cc] selection:text-white transition-colors duration-300`}
      onTouchStart={globalMode === 'lesson' ? undefined : onTouchStart}
      onTouchMove={globalMode === 'lesson' ? undefined : onTouchMove}
      onTouchEnd={globalMode === 'lesson' ? undefined : onTouchEnd}
    >
      
      {/* Apple-style Header */}
      <header className={`flex-none flex items-center justify-between px-4 md:px-6 py-3 glass-header border-b border-black/5 dark:border-white/10 z-20 sticky top-0 transition-colors ${globalMode === 'lesson' ? 'deep-dive-header' : ''}`}>
        
        {/* Title or Back */}
        {!activeCategory ? (
          <h1
            className={`flex items-center gap-1.5 ${globalMode !== 'dashboard' ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={() => {
              if (globalMode !== 'dashboard') {
                setGlobalMode('dashboard');
                setActiveCategory(null);
                setSelectedTopicId(null);
                setActiveSubcategory(null);
                setGraphDeck(null);
              }
            }}
          >
            <div className="flex items-baseline text-[#1d1d1f] dark:text-[#f5f5f7]">
              <span style={{ fontFamily: 'TheSignature' }} className="lowercase text-4xl md:text-5xl leading-[0.4] -mr-0.5">fin</span>
              <span className="uppercase font-semibold tracking-tight text-lg">CARDS</span>
            </div>
          </h1>
        ) : (
          <button 
            onClick={goBack}
            className="flex items-center gap-0.5 text-[#0066cc] dark:text-[#2997ff] hover:opacity-80 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
            <span className="text-[14px] font-medium">
              {activeCategory === '__graph__'
                ? 'Learning Map'
                : selectedTopic
                  ? selectedTopic.canonicalName
                : activeCategory === 'Aptitude' && activeSubcategory
                  ? 'Aptitude'
                  : isSecuritizationCategory(activeCategory) && !showSecuritizationNotes
                    ? activeCategory
                    : 'Library'}
            </span>
          </button>
        )}
        
        {/* Right side controls */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-[#f5f5f7] transition-colors">
            {theme === 'light' ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            )}
          </button>

          {!activeCategory && (
            <div className="flex gap-2">
              <PodcastLauncher />
              {globalMode !== 'graph' && globalMode !== 'lesson' && (
                <button 
                  onClick={() => setGlobalMode(prev => prev === 'focus' ? 'list' : 'focus')}
                  className="whitespace-nowrap px-3 py-1.5 text-[12px] font-medium rounded-full bg-[#e8e8ed] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#3a3a3c] transition-colors"
                >
                  {globalMode === 'focus' ? 'Cram Mode' : 'Focus Mode'}
                </button>
              )}
            </div>
          )}

          {/* Securitization: Notes/Flashcards + Cram/Focus toggle */}
          {activeCategory && isSecuritizationCategory(activeCategory) && !showSecuritizationNotes && (
            <>
              <PodcastLauncher />
              <button
                onClick={() => setShowSecuritizationNotes(true)}
                className="whitespace-nowrap px-3 py-1.5 text-[12px] font-medium rounded-full bg-[#e8e8ed] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#3a3a3c] transition-colors"
              >
                ← Notes
              </button>
              <button 
                onClick={() => setGlobalMode(prev => prev === 'focus' ? 'list' : 'focus')}
                className="whitespace-nowrap px-3 py-1.5 text-[12px] font-medium rounded-full bg-[#e8e8ed] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#3a3a3c] transition-colors"
              >
                {globalMode === 'focus' ? 'Cram Mode' : 'Focus Mode'}
              </button>
            </>
          )}

          {/* Other categories: Cram/Focus toggle in header when active */}
          {activeCategory && !isSecuritizationCategory(activeCategory) && !(!activeSubcategory && activeCategory === 'Aptitude') && (
            <button 
              onClick={() => setGlobalMode(prev => prev === 'focus' ? 'list' : 'focus')}
              className="whitespace-nowrap px-3 py-1.5 text-[12px] font-medium rounded-full bg-[#e8e8ed] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#3a3a3c] transition-colors"
            >
              {globalMode === 'focus' ? 'Cram Mode' : 'Focus Mode'}
            </button>
          )}
        </div>
      </header>

      {/* DASHBOARD MODE */}
      {!activeCategory && (
        globalMode === 'lesson' ? (
          <div className="deep-dive-shell">
            <DeepDiveReader />
          </div>
        ) : globalMode === 'graph' ? (
          <LearningMapView 
            onClose={() => setGlobalMode('focus')}
            onStudyNow={handleStudyNow}
          />
        ) : (
          <main 
            ref={dashboardRef}
            onScroll={handleDashboardScroll}
            className="flex-1 overflow-y-auto w-full px-4 py-6 md:px-12 md:py-10 max-w-4xl mx-auto space-y-6"
          >
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-1 text-[#1d1d1f] dark:text-[#f5f5f7]">
              Hey deepti, <span className="text-[#86868b]">pick a deck.</span>
            </h2>
          </div>

          {fetchError && (
            <div className="p-4 rounded-xl bg-red-100 text-red-800 border border-red-200 text-[13px] font-medium">
              ⚠️ Google Sheets Sync Failed: {fetchError}
            </div>
          )}

          {/* Make Your Own Card Section */}
          <div className="rounded-[24px] bg-gradient-to-br from-[#0066cc]/10 to-[#5ac8fa]/10 dark:from-[#0066cc]/20 dark:to-[#5ac8fa]/5 border border-[#0066cc]/20 dark:border-[#2997ff]/20 overflow-hidden">
            <button
              onClick={() => { setShowAddForm(f => !f); setFormSaved(false); }}
              className="w-full flex items-center justify-between px-5 py-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#0066cc] flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                </div>
                <div className="text-left">
                  <div className="text-[13px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">Make your own card</div>
                  <div className="text-[11px] text-[#86868b]">Saved to Deepti's Cards deck</div>
                </div>
              </div>
              <svg className={`w-4 h-4 text-[#86868b] transition-transform duration-300 ${showAddForm ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${showAddForm ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="px-5 pb-5 space-y-3">
                  <div className="h-px bg-[#0066cc]/10 dark:bg-[#2997ff]/10 mb-1" />
                  <textarea
                    placeholder="Question *"
                    value={formQ}
                    onChange={e => setFormQ(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-[14px] bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/10 text-[14px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0066cc] resize-none transition-all"
                  />
                  <textarea
                    placeholder="Answer *"
                    value={formA}
                    onChange={e => setFormA(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-3 rounded-[14px] bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/10 text-[14px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0066cc] resize-none transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Category (optional — defaults to Deepti's Cards)"
                    value={formCat}
                    onChange={e => setFormCat(e.target.value)}
                    className="w-full px-4 py-3 rounded-[14px] bg-white dark:bg-[#1c1c1e] border border-black/8 dark:border-white/10 text-[14px] text-[#1d1d1f] dark:text-[#f5f5f7] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0066cc] transition-all"
                  />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        if (!formQ.trim() || !formA.trim()) return;
                        const newCard = {
                          id: `deepti_${Date.now()}`,
                          category: formCat.trim() || "Deepti's Cards",
                          question: formQ.trim(),
                          answer: formA.trim(),
                          difficulty: 'Medium',
                          source: "Deepti's Cards"
                        };
                        const updated = [...customCards, newCard];
                        setCustomCards(updated);
                        localStorage.setItem('deepti_custom_cards', JSON.stringify(updated));
                        setMasterDeck(prev => [...prev, newCard]);
                        setFormQ(''); setFormA(''); setFormCat('');
                        setFormSaved(true);
                        setTimeout(() => setFormSaved(false), 2500);
                      }}
                      className="flex-1 py-3 rounded-[14px] bg-[#0066cc] text-white font-semibold text-[14px] hover:bg-[#2997ff] transition-all active:scale-95"
                    >
                      {formSaved ? '✓ Saved!' : 'Add Card'}
                    </button>
                    {customCards.length > 0 && (
                      <button
                        onClick={() => openCategory("Deepti's Cards")}
                        className="px-4 py-3 rounded-[14px] bg-white dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] font-medium text-[13px] border border-black/8 dark:border-white/10 hover:bg-[#f5f5f7] dark:hover:bg-[#3a3a3c] transition-all"
                      >
                        View ({customCards.length})
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 md:gap-4 mt-2">
            <button
              onClick={() => setGlobalMode(prev => prev === 'lesson' ? 'focus' : 'lesson')}
              className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5 p-3 md:py-4 rounded-[16px] md:rounded-[20px] bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold text-[13px] md:text-[15px] border border-black/5 dark:border-white/5 apple-shadow apple-shadow-hover transition-all"
            >
              <svg className="w-5 h-5 text-[#0066cc]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              Deep Dive
            </button>
            <button
              onClick={() => window.location.assign(`${import.meta.env.BASE_URL}explorer`)}
              className="flex-1 flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2.5 p-3 md:py-4 rounded-[16px] md:rounded-[20px] bg-white dark:bg-[#1c1c1e] text-[#1d1d1f] dark:text-[#f5f5f7] font-semibold text-[13px] md:text-[15px] border border-black/5 dark:border-white/5 apple-shadow apple-shadow-hover transition-all"
            >
              <svg className="w-5 h-5 text-[#34c759]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Explore Topics
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
            {categoryStats.map(cat => {
              const isDarkAccent = cat.name === 'Starred';
              const isDeepti = cat.name === "Deepti's Cards";
              const bgClass = isDeepti ? 'bg-gradient-to-br from-[#0066cc] to-[#5ac8fa]' : isDarkAccent ? 'bg-[#1d1d1f] dark:bg-[#ffffff]' : 'bg-[#ffffff] dark:bg-[#1c1c1e]';
              const textClass = isDeepti ? 'text-white' : isDarkAccent ? 'text-white dark:text-[#1d1d1f]' : 'text-[#1d1d1f] dark:text-[#f5f5f7]';
              const subTextClass = isDeepti ? 'text-white/70' : isDarkAccent ? 'text-[#a1a1a6] dark:text-[#555555]' : 'text-[#86868b]';

              return (
                <div 
                  key={cat.name}
                  onClick={() => openCategory(cat.name)}
                  className={`p-4 md:p-6 rounded-[20px] apple-shadow apple-shadow-hover transition-all cursor-pointer flex flex-col justify-between min-h-[110px] md:min-h-[140px] ${bgClass}`}
                >
                  <div>
                    <div className={`text-[10px] md:text-[11px] font-semibold tracking-wide uppercase mb-0.5 ${subTextClass}`}>
                      {cat.subtitle || 'Deck'}
                    </div>
                    <h3 className={`text-base md:text-xl font-semibold leading-tight ${textClass}`}>
                      {cat.name}
                    </h3>
                  </div>
                  <div className={`mt-4 text-[12px] md:text-[13px] font-medium ${subTextClass}`}>
                    {cat.count} cards
                  </div>
                </div>
              );
            })}
          </div>
        </main>
        )
      )}

      {/* STUDY / SUBCATEGORY MODES */}
      {activeCategory && (
        <>
          {/* Aptitude Subcategory Picker */}
          {/* Securitization Notes View */}
          {isSecuritizationCategory(activeCategory) && showSecuritizationNotes ? (
            <SecuritizationView
              globalMode={globalMode}
              onToggleMode={() => setGlobalMode(prev => prev === 'focus' ? 'list' : 'focus')}
              onOpenFlashcards={() => setShowSecuritizationNotes(false)}
            />
          ) : activeCategory === 'Aptitude' && !activeSubcategory ? (
            <main className="flex-1 overflow-y-auto w-full px-4 py-6 md:px-12 md:py-10 max-w-4xl mx-auto space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-1 text-[#1d1d1f] dark:text-[#f5f5f7]">
                  Aptitude. <span className="text-[#86868b]">Select a topic.</span>
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
                {['Quantitative', 'Logical Reasoning', 'Shortcuts'].map(topic => {
                  let count = 0;
                  if (topic === 'Shortcuts') {
                    count = masterDeck.filter(c => c.category === 'Aptitude' && (
                      (c.explanation && c.explanation.toLowerCase().includes('shortcut')) ||
                      (c.answer && c.answer.toLowerCase().includes('shortcut')) ||
                      c.card_type === 'shortcut'
                    )).length;
                  } else {
                    count = masterDeck.filter(c => {
                      if (c.category !== 'Aptitude') return false;
                      let cleanSub = (c.subcategory || '').replace('Aptitude: ', '').trim();
                      if (cleanSub === 'Quant/Formula-Based') cleanSub = 'Quantitative';
                      return cleanSub === topic;
                    }).length;
                  }

                  return (
                    <div 
                      key={topic}
                      onClick={() => setActiveSubcategory(topic)}
                      className="p-5 md:p-6 rounded-[20px] bg-[#ffffff] dark:bg-[#1c1c1e] apple-shadow apple-shadow-hover transition-all cursor-pointer flex flex-col justify-between min-h-[90px] md:min-h-[110px]"
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f] dark:text-[#f5f5f7]">
                        {topic}
                      </h3>
                      <div className="text-[12px] md:text-[13px] font-medium text-[#86868b] mt-2">
                        {count} cards
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          ) : activeSubcategory === 'Shortcuts' ? (
            <ShortcutView deck={activeDeck} />
          ) : (
            <>
              {globalMode === 'focus' && (
                <main className="flex-1 flex flex-col relative w-full overflow-hidden">
                  {selectedTopic && (
                    <div className="flex-none px-4 pt-3 pb-0">
                      <div className={`rounded-2xl px-4 py-2.5 flex items-center gap-3 ${topicDeck.usedFallback ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40' : 'bg-[#0066cc]/8 dark:bg-[#2997ff]/8 border border-[#0066cc]/15 dark:border-[#2997ff]/15'}`}>
                        <p className={`text-[12px] font-semibold ${topicDeck.usedFallback ? 'text-amber-700 dark:text-amber-400' : 'text-[#0066cc] dark:text-[#2997ff]'}`}>
                          {topicDeck.usedFallback
                            ? `Matching cards for ${selectedTopic.canonicalName} — exact card links are not available for this topic yet.`
                            : `${selectedTopic.canonicalName} — ${activeDeck.length} linked flashcards`
                          }
                        </p>
                      </div>
                    </div>
                  )}
                  {/* Graph Study Mode Banner */}
                  {activeCategory === '__graph__' && (
                    <div className="flex-none px-4 pt-3 pb-0">
                      <div className={`rounded-2xl px-4 py-2.5 flex items-center gap-3 ${graphDeckFallback ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40' : 'bg-[#0066cc]/8 dark:bg-[#2997ff]/8 border border-[#0066cc]/15 dark:border-[#2997ff]/15'}`}>
                        <div className="flex-1">
                          <p className={`text-[12px] font-semibold ${graphDeckFallback ? 'text-amber-700 dark:text-amber-400' : 'text-[#0066cc] dark:text-[#2997ff]'}`}>
                            {graphDeckFallback
                              ? `Showing closest available deck for "${graphDeckTitle}". Topic-specific cards will be added soon.`
                              : `Studying: ${graphDeckTitle} — ${activeDeck.length} cards`
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 w-full px-4 py-6 md:p-12 flex flex-col items-center justify-center relative perspective-1000">
                    {activeDeck.length === 0 ? (
                      <div className="font-medium text-[#86868b]">No cards available.</div>
                    ) : (
                      <FlashCard 
                        key={currentCardIndex} 
                        card={activeDeck[currentCardIndex]} 
                        onReview={(rating) => handleReview(activeDeck[currentCardIndex].id, rating)}
                        stats={progressData[activeDeck[currentCardIndex].id]}
                        onNoteUpdated={handleNoteUpdated}
                      />
                    )}
                  </div>

                  {activeDeck.length > 0 && (
                    <>
                      {/* Desktop Navigation */}
                      <div className="hidden md:flex flex-none w-full pb-8 pt-2 justify-center gap-4 bg-transparent">
                        <button 
                          onClick={handlePrev}
                          disabled={currentCardIndex === 0}
                          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${currentCardIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'bg-[#e8e8ed] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#3a3a3c]'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button 
                          onClick={handleNext}
                          disabled={currentCardIndex === activeDeck.length - 1}
                          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ${currentCardIndex === activeDeck.length - 1 ? 'opacity-30 cursor-not-allowed' : 'bg-[#e8e8ed] dark:bg-[#2c2c2e] text-[#1d1d1f] dark:text-[#f5f5f7] hover:bg-[#d2d2d7] dark:hover:bg-[#3a3a3c]'}`}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                      </div>

                      {/* Mobile Navigation Hints */}
                      <div className="md:hidden flex-none w-full pb-8 flex justify-center bg-transparent">
                        <span className="text-[12px] font-medium text-[#86868b]">
                          Swipe left or right
                        </span>
                      </div>
                    </>
                  )}
                </main>
              )}

              {globalMode === 'list' && (
                <>
                  <div className="flex-none px-4 pt-4 md:px-8 md:pt-6 max-w-3xl mx-auto w-full">
                    <div className="flex gap-2">
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <svg className="h-4 w-4 text-[#86868b]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input 
                          type="text" 
                          placeholder="Search questions & answers..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-[16px] bg-[#ffffff] dark:bg-[#1c1c1e] border border-black/5 dark:border-white/10 text-[14px] placeholder-[#86868b] focus:outline-none focus:ring-2 focus:ring-[#0066cc] apple-shadow transition-all text-[#1d1d1f] dark:text-[#f5f5f7]"
                        />
                      </div>
                      {deferredPrompt && (
                        <button
                          onClick={handleInstallClick}
                          className="whitespace-nowrap px-4 py-3 rounded-[16px] bg-[#0066cc] text-white font-medium text-[14px] shadow-sm hover:bg-[#2997ff] transition-all"
                        >
                          Install App
                        </button>
                      )}
                    </div>
                  </div>
                  <main 
                    className="flex-1 overflow-y-auto w-full p-4 md:p-8 pt-4 md:pt-6 space-y-4 max-w-3xl mx-auto"
                    onScroll={handleCramScroll}
                  >
                    {filteredDeck.length === 0 ? (
                      <div className="text-center font-medium text-[#86868b] py-8 text-[14px]">
                        No matching cards found.
                      </div>
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
                      <div className="text-center py-4 text-[13px] font-medium text-[#86868b] opacity-50">
                        Scroll for more
                      </div>
                    )}
                  </main>
                </>
              )}
            </>
          )}
        </>
      )}


    </div>
  );
}
