
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { GameState, TypingStats, Lesson, LessonCategory, HistoryResult } from './types';
import { INITIAL_LESSONS } from './constants';
import Keyboard from './components/Keyboard';
import Stats from './components/Stats';
import Dashboard from './components/Dashboard';

const CATEGORIES: LessonCategory[] = ['Standard', 'Coding', 'Literature'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const STORAGE_KEY = 'typeflow_history_v1';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<LessonCategory>('Standard');
  const [activeDifficulty, setActiveDifficulty] = useState<string>('All');
  const [currentLesson, setCurrentLesson] = useState<Lesson>(INITIAL_LESSONS[0]);
  const [userInput, setUserInput] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    rawWpm: 0,
    accuracy: 100,
    errors: 0,
    charsTyped: 0,
    timeElapsed: 0,
  });
  
  const [history, setHistory] = useState<HistoryResult[]>([]);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [showDashboard, setShowDashboard] = useState(false);
  
  const missedCharsRef = useRef<Record<string, number>>({});
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const filteredLessons = useMemo(() => {
    let lessons = INITIAL_LESSONS.filter(l => l.category === activeCategory);
    if (activeDifficulty !== 'All') {
      lessons = lessons.filter(l => l.difficulty === activeDifficulty);
    }
    return lessons;
  }, [activeCategory, activeDifficulty]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: HistoryResult[] = JSON.parse(saved);
        const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const pruned = parsed.filter(item => item.timestamp > oneWeekAgo);
        setHistory(pruned);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pruned));
      } catch (e) { console.error(e); }
    }
  }, []);

  const resetGame = useCallback((lesson: Lesson) => {
    setCurrentLesson(lesson);
    setUserInput('');
    setGameState(GameState.IDLE);
    missedCharsRef.current = {};
    setStats({ wpm: 0, rawWpm: 0, accuracy: 100, errors: 0, charsTyped: 0, timeElapsed: 0 });
    if (timerRef.current) clearInterval(timerRef.current);
    startTimeRef.current = null;
  }, []);

  const saveResult = (finalStats: TypingStats) => {
    const newResult: HistoryResult = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      wpm: Math.round(finalStats.wpm),
      accuracy: Math.round(finalStats.accuracy),
      rawWpm: Math.round(finalStats.rawWpm),
      category: activeCategory,
      missedChars: { ...missedCharsRef.current }
    };
    const updatedHistory = [...history, newResult];
    setHistory(updatedHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const calculateStats = useCallback((input: string, elapsed: number) => {
    if (input.length === 0 || elapsed === 0) return;
    const target = currentLesson.text;
    let correctChars = 0;
    
    const lastIndex = input.length - 1;
    if (lastIndex >= 0 && input[lastIndex] !== target[lastIndex]) {
      const missed = target[lastIndex];
      missedCharsRef.current[missed] = (missedCharsRef.current[missed] || 0) + 1;
    }

    for (let i = 0; i < input.length; i++) {
      if (input[i] === target[i]) correctChars++;
    }

    const accuracy = (correctChars / input.length) * 100;
    const minutes = elapsed / 60;
    const wpm = (correctChars / 5) / minutes;
    const rawWpm = (input.length / 5) / minutes;

    setStats(prev => ({
      ...prev,
      wpm: Math.max(0, wpm),
      rawWpm: Math.max(0, rawWpm),
      accuracy,
      charsTyped: input.length,
      timeElapsed: elapsed
    }));

    if (input.length >= target.length) {
      setGameState(GameState.FINISHED);
      if (timerRef.current) clearInterval(timerRef.current);
      saveResult({ wpm: Math.max(0, wpm), rawWpm: Math.max(0, rawWpm), accuracy, errors: 0, charsTyped: input.length, timeElapsed: elapsed });
    }
  }, [currentLesson.text, activeCategory, history]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Tab') { e.preventDefault(); resetGame(currentLesson); return; }
    if (gameState === GameState.FINISHED || showDashboard) return;

    if (gameState === GameState.IDLE && e.key.length === 1) {
      setGameState(GameState.TYPING);
      startTimeRef.current = Date.now();
      timerRef.current = window.setInterval(() => {
        if (startTimeRef.current) {
          const elapsed = (Date.now() - startTimeRef.current) / 1000;
          setStats(prev => ({ ...prev, timeElapsed: elapsed }));
        }
      }, 100); 
    }

    if (e.key === 'Backspace') {
      setUserInput(prev => prev.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      setUserInput(prev => prev + e.key);
    }
  }, [gameState, currentLesson, resetGame, showDashboard]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (gameState === GameState.TYPING && startTimeRef.current) {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      calculateStats(userInput, elapsed);
    }
  }, [userInput, gameState]);

  const nextChar = currentLesson.text[userInput.length] || '';

  const renderText = () => {
    const fullText = currentLesson.text;
    const input = userInput;
    const words = fullText.split(' ');
    let globalCharIndex = 0;

    return words.map((word, wordIdx) => {
      const letters = word.split('').map((char, charIdx) => {
        const absoluteIndex = globalCharIndex + charIdx;
        let className = "letter untyped";
        if (absoluteIndex < input.length) {
          className = input[absoluteIndex] === char ? "letter correct" : "letter incorrect";
        }
        const isCaret = absoluteIndex === input.length;
        return (
          <span key={charIdx} className={className} style={{ position: 'relative' }}>
            {isCaret && <span className="caret"></span>}
            {char}
          </span>
        );
      });

      const spaceIndex = globalCharIndex + word.length;
      const isSpaceCaret = spaceIndex === input.length;
      let spaceClassName = "letter untyped";
      if (spaceIndex < input.length) {
        spaceClassName = input[spaceIndex] === ' ' ? "letter correct" : "letter incorrect";
      }

      const wordElement = (
        <div key={wordIdx} className="word">
          {letters}
          {wordIdx < words.length - 1 && (
            <span className={spaceClassName} style={{ position: 'relative' }}>
              {isSpaceCaret && <span className="caret"></span>}
              &nbsp;
            </span>
          )}
        </div>
      );
      globalCharIndex += word.length + 1;
      return wordElement;
    });
  };

  return (
    <div className="h-screen flex flex-col max-w-[1600px] mx-auto px-6 py-4 transition-all overflow-hidden bg-[#323437]">
      {/* Bento Header */}
      <header className="grid grid-cols-12 gap-4 mb-4 h-14 shrink-0">
        <div className="col-span-3 bg-[#2c2e31] rounded-2xl flex items-center px-6 border border-white/5">
            <h1 className="text-[#e2b714] text-lg font-black tracking-tighter">TYPEFLOW.</h1>
        </div>
        <div className="col-span-6 bg-[#2c2e31] rounded-2xl flex items-center justify-center gap-4 px-6 border border-white/5">
            <div className="flex gap-4 text-[#646669] text-[9px] font-bold uppercase tracking-widest">
                {CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => { setActiveCategory(cat); const first = INITIAL_LESSONS.find(l => l.category === cat); if (first) resetGame(first); }} className={`hover:text-[#d1d0c5] transition-colors ${activeCategory === cat ? 'text-[#e2b714]' : ''}`}>{cat}</button>
                ))}
            </div>
            <div className="w-px h-3 bg-white/10 mx-2" />
            <div className="flex gap-4 text-[#646669] text-[9px] font-bold uppercase tracking-widest">
                {DIFFICULTIES.map(diff => (
                    <button key={diff} onClick={() => setActiveDifficulty(diff)} className={`hover:text-[#d1d0c5] transition-colors ${activeDifficulty === diff ? 'text-[#e2b714]' : ''}`}>{diff}</button>
                ))}
            </div>
        </div>
        <div className="col-span-3 bg-[#2c2e31] rounded-2xl flex items-center justify-end px-6 gap-6 border border-white/5">
            <button onClick={() => setShowDashboard(true)} className="text-[#646669] hover:text-[#e2b714] transition-colors flex items-center gap-2 text-[9px] font-black uppercase tracking-widest">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                Stats
            </button>
            <button onClick={() => setShowKeyboard(!showKeyboard)} className={`text-[#646669] hover:text-[#d1d0c5] ${showKeyboard ? 'text-[#e2b714]' : ''}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20,5H4C2.89,5 2,5.89 2,7V17C2,18.11 2.89,19 4,19H20C21.11,19 22,18.11 22,17V7C22,5.89 21.11,5 20,5M20,17H4V7H20V17M10,10H8V12H10V10M7,10H5V12H7V10M13,10H11V12H13V10M16,10H14V12H16V10M19,10H17V12H19V10M10,13H8V15H10V13M7,13H5V15H7V13M13,13H11V15H13V13M16,13H14V15H16V13M19,13H17V15H19V13Z"/></svg>
            </button>
        </div>
      </header>

      {/* Main Bento Grid */}
      <main className="grid grid-cols-12 grid-rows-10 gap-4 flex-grow overflow-hidden">
        
        {/* Left Side Stats */}
        <div className="col-span-3 row-span-3 bg-[#2c2e31] rounded-3xl p-6 border border-white/5 flex flex-col justify-around">
            <div className="flex flex-col">
                <span className="text-[#646669] text-[9px] font-black uppercase tracking-widest mb-1">Live Speed</span>
                <span className="text-[#e2b714] text-5xl font-black">{Math.round(stats.wpm)} <span className="text-lg opacity-40">WPM</span></span>
            </div>
            <div className="flex flex-col">
                <span className="text-[#646669] text-[9px] font-black uppercase tracking-widest mb-1">Accuracy</span>
                <span className="text-[#d1d0c5] text-4xl font-black">{Math.round(stats.accuracy)}<span className="text-lg opacity-40">%</span></span>
            </div>
            <div className="flex gap-6">
                <div>
                    <span className="text-[#646669] text-[8px] font-black uppercase tracking-widest block">Raw</span>
                    <span className="text-[#d1d0c5] text-lg font-bold">{Math.round(stats.rawWpm)}</span>
                </div>
                <div>
                    <span className="text-[#646669] text-[8px] font-black uppercase tracking-widest block">Time</span>
                    <span className="text-[#d1d0c5] text-lg font-bold">{Math.round(stats.timeElapsed)}s</span>
                </div>
            </div>
        </div>

        {/* Typing Area */}
        <div className="col-span-9 row-span-3 bg-[#2c2e31]/40 rounded-3xl p-8 border border-white/5 flex items-center relative overflow-hidden">
            <div className="w-full text-xl md:text-2xl leading-relaxed relative z-10 max-h-full overflow-y-auto custom-scrollbar">
                <div className="flex flex-wrap select-none text-justify">{renderText()}</div>
                {gameState === GameState.IDLE && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                        <p className="text-xs font-bold uppercase tracking-[0.4em] animate-pulse">Start typing to begin practice</p>
                    </div>
                )}
            </div>
        </div>

        {/* Library Only - Replaces Library & AI */}
        <div className="col-span-3 row-span-7 flex flex-col gap-4 overflow-hidden">
            <div className="flex-grow bg-[#2c2e31] rounded-3xl p-5 border border-white/5 flex flex-col overflow-hidden">
                <h3 className="text-[#646669] text-[9px] font-black uppercase tracking-widest mb-3">Lesson Library ({filteredLessons.length})</h3>
                <div className="flex flex-col gap-1.5 overflow-y-auto custom-scrollbar pr-1 flex-grow">
                    {filteredLessons.map(lesson => (
                        <button key={lesson.id} onClick={() => resetGame(lesson)} className={`text-left px-3 py-2 rounded-xl text-[10px] transition-all border ${currentLesson.id === lesson.id ? 'bg-[#e2b714]/10 border-[#e2b714]/40 text-[#e2b714]' : 'bg-[#323437] border-transparent text-[#646669] hover:text-[#d1d0c5] hover:bg-[#3d4043]'}`}>
                            <div className="font-bold flex justify-between items-center mb-0.5">
                                <span className="truncate">{lesson.title}</span>
                                <span className="bg-white/5 px-1.5 py-0.5 rounded-[4px] text-[7px] opacity-60 uppercase">{lesson.difficulty[0]}</span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* Keyboard Area */}
        <div className={`col-span-9 row-span-7 bg-[#2c2e31]/60 rounded-3xl p-6 border border-white/5 transition-all duration-500 overflow-hidden ${showKeyboard ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <Keyboard activeKey={nextChar} />
        </div>

      </main>

      {showDashboard && <Dashboard history={history} onClose={() => setShowDashboard(false)} />}
      
      {gameState === GameState.FINISHED && (
        <div className="fixed inset-0 bg-[#323437]/98 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="max-w-xl w-full text-center animate-in zoom-in duration-300">
                <h2 className="text-[#646669] text-xs font-black uppercase tracking-[0.5em] mb-12">Session Complete</h2>
                <div className="grid grid-cols-2 gap-8 mb-16">
                    <div className="bg-[#2c2e31] p-10 rounded-[3rem] border border-white/5">
                        <span className="text-[#646669] text-sm font-bold block mb-2">Net Speed</span>
                        <span className="text-[#e2b714] text-7xl font-black">{Math.round(stats.wpm)}</span>
                        <span className="text-[#646669] text-xl font-bold ml-2">WPM</span>
                    </div>
                    <div className="bg-[#2c2e31] p-10 rounded-[3rem] border border-white/5">
                        <span className="text-[#646669] text-sm font-bold block mb-2">Accuracy</span>
                        <span className="text-[#e2b714] text-7xl font-black">{Math.round(stats.accuracy)}</span>
                        <span className="text-[#646669] text-xl font-bold ml-2">%</span>
                    </div>
                </div>
                <div className="flex gap-6 justify-center">
                    <button onClick={() => resetGame(currentLesson)} className="bg-[#e2b714] text-[#323437] font-black px-12 py-4 rounded-2xl hover:bg-yellow-400 shadow-2xl">Repeat Exercise</button>
                    <button onClick={() => { setShowDashboard(true); setGameState(GameState.IDLE); }} className="bg-[#2c2e31] text-[#646669] font-bold px-10 py-4 rounded-2xl border border-white/10">Detailed Metrics</button>
                </div>
            </div>
        </div>
      )}

      <footer className="h-6 shrink-0 flex justify-between items-center text-[#646669] text-[8px] font-black uppercase tracking-widest px-2 mt-2">
        <div className="flex gap-6 opacity-40">
            <a href="#" className="hover:text-[#d1d0c5]">GitHub</a>
            <a href="#" className="hover:text-[#d1d0c5]">Docs</a>
        </div>
        <div className="opacity-40">DESIGNED FOR COMPETITIVE PERFORMANCE • V1.4.0 BENTO EDITION</div>
      </footer>
    </div>
  );
};

export default App;
