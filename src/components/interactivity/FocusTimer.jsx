import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';

export const FocusTimer = () => {
  const addXP = useStore((state) => state.addXP);
  const theme = useTheme((state) => state.theme);

  const loadState = () => {
    try {
      const saved = localStorage.getItem('focusTimerState');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  };

  const [customMins, setCustomMins] = useState(() => {
    const s = loadState(); return s ? s.customMins : 60;
  });
  const [timeLeft, setTimeLeft] = useState(() => {
    const s = loadState(); return s ? s.timeLeft : 60 * 60;
  });
  const [focusSeconds, setFocusSeconds] = useState(() => {
    const s = loadState(); return s ? s.focusSeconds : 0;
  });
  const [earnedXp, setEarnedXp] = useState(() => {
    const s = loadState(); return s ? s.earnedXp : 0;
  });
  const [isRunning, setIsRunning] = useState(() => {
    const s = loadState(); return s ? s.isRunning : false;
  });

  const [isManualFloating, setIsManualFloating] = useState(false);
  const [isAutoFloating, setIsAutoFloating] = useState(false);
  const [confirmModal, setConfirmModal] = useState(null);
  const containerRef = useRef(null);

  const isFloating = isManualFloating || (isAutoFloating && isRunning);

  useEffect(() => {
    localStorage.setItem('focusTimerState', JSON.stringify({
      customMins, timeLeft, focusSeconds, earnedXp, isRunning
    }));
  }, [customMins, timeLeft, focusSeconds, earnedXp, isRunning]);

  // Constants
  const FOCUS_THRESHOLD = 600; // 10 minutes to reach Flow State
  const isFlowState = focusSeconds >= FOCUS_THRESHOLD;

  const stateRef = useRef({ timeLeft, focusSeconds, earnedXp });
  useEffect(() => {
    stateRef.current = { timeLeft, focusSeconds, earnedXp };
  }, [timeLeft, focusSeconds, earnedXp]);

  const lastTickRef = useRef(Date.now());

  useEffect(() => {
    let interval;
    if (isRunning) {
      lastTickRef.current = Date.now();
      
      interval = setInterval(() => {
        const now = Date.now();
        const deltaMs = now - lastTickRef.current;
        const deltaSeconds = Math.floor(deltaMs / 1000);

        if (deltaSeconds >= 1) {
          lastTickRef.current = now - (deltaMs % 1000);
          
          const current = stateRef.current;
          if (current.timeLeft <= 0) {
             setIsRunning(false);
             setTimeLeft(customMins * 60);
             setFocusSeconds(0);
             setEarnedXp(0);
             return;
          }

          const actualDelta = Math.min(deltaSeconds, current.timeLeft);
          let newF = current.focusSeconds;
          let addedXp = 0;
          let silentXpToAdd = 0;
          let newlyReachedFlow = false;

          for (let i = 0; i < actualDelta; i++) {
            newF += 1;
            if (newF === FOCUS_THRESHOLD) {
              newlyReachedFlow = true;
              silentXpToAdd += 1;
            } else if (newF > 0 && newF % 60 === 0) {
              silentXpToAdd += (newF > FOCUS_THRESHOLD ? 2 : 1);
            }
            addedXp += (newF > FOCUS_THRESHOLD ? (2 / 60) : (1 / 60));
          }

          if (newlyReachedFlow) {
            addXP(silentXpToAdd, '🎉 Congratulations! You have entered Flow State!');
          } else if (silentXpToAdd > 0) {
            addXP(silentXpToAdd, null);
          }

          const newTimeLeft = current.timeLeft - actualDelta;
          const newEarnedXp = current.earnedXp + addedXp;
          
          // Update ref synchronously for tests and fast interval executions
          stateRef.current = {
            timeLeft: newTimeLeft === 0 ? customMins * 60 : newTimeLeft,
            focusSeconds: newTimeLeft === 0 ? 0 : newF,
            earnedXp: newTimeLeft === 0 ? 0 : newEarnedXp
          };

          setTimeLeft(newTimeLeft);
          setFocusSeconds(newF);
          setEarnedXp(newEarnedXp);

          if (newTimeLeft === 0) {
             setIsRunning(false);
             setTimeLeft(customMins * 60);
             setFocusSeconds(0);
             setEarnedXp(0);
          }
        }
      }, 500);
    } else if (!isRunning && stateRef.current.timeLeft === 0) {
       // Just in case it's not running and time is 0
       setTimeLeft(customMins * 60);
       setFocusSeconds(0);
       setEarnedXp(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, customMins, addXP]);

  // Handle auto-floating when scrolling out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAutoFloating(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleTimer = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(customMins * 60);
      setFocusSeconds(0);
      setEarnedXp(0);
      setIsRunning(true);
    } else if (isRunning) {
      if (!isFlowState) {
        setConfirmModal({
          message: "Pausing now will reset your Flow State progress! Are you sure?",
          emoji: "⏸️",
          onConfirm: () => {
            setIsRunning(false);
            setFocusSeconds(0);
            setConfirmModal(null);
          }
        });
      } else {
        setIsRunning(false);
      }
    } else {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setConfirmModal({
      message: "Are you sure you want to reset the timer?",
      emoji: "🔄",
      onConfirm: () => {
        setIsRunning(false);
        setTimeLeft(customMins * 60);
        setFocusSeconds(0);
        setEarnedXp(0);
        setConfirmModal(null);
      }
    });
  };

  const handleDistracted = () => {
    setConfirmModal({
      message: "Checking your phone? This will reset your Flow State buildup!",
      emoji: "📱",
      onConfirm: () => {
        setFocusSeconds(0);
        setConfirmModal(null);
      }
    });
  };

  const handleMinsChange = (e) => {
    const val = parseInt(e.target.value) || 15;
    const clamped = Math.max(15, Math.min(180, val));
    setCustomMins(clamped);
    if (!isRunning) {
      setTimeLeft(clamped * 60);
      setFocusSeconds(0);
      setEarnedXp(0);
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const totalPct = 100 - ((timeLeft / (customMins * 60)) * 100);
  const flowPct = Math.min(100, (focusSeconds / FOCUS_THRESHOLD) * 100);

  const themeColor = theme === 'kawaii' ? (isFlowState ? '#7DDFC3' : '#F4B8C1') : (isFlowState ? '#3D5FC7' : '#F78660'); // blue-light vs coral
  const themeBg = theme === 'kawaii' ? (isFlowState ? '#E6FFF5' : '#FDE8E8') : (isFlowState ? '#E6EEFF' : '#FFF0EC'); // blue-pale vs coral-pale

  return (
    <>
    <Card title="🌊 Flow State Timer" sub="Survive 10 mins to enter Flow." className="h-full">
      <div ref={containerRef} className="flex flex-col items-center justify-start h-full gap-6 pt-6 pb-2">
        
        {/* Custom Duration Input */}
        <div className="h-8 flex items-center justify-center shrink-0 w-full relative">
          <button 
            onClick={() => setIsManualFloating(!isManualFloating)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 p-1.5 transition-colors ${theme === 'kawaii' ? 'text-[#5A3A3A] bg-white border border-[#F4B8C1] shadow-[1px_1px_0_#F4B8C1] rounded-none hover:opacity-70' : 'text-text-muted hover:text-text-dark bg-cream-dark rounded-md'}`}
            title="Toggle compact floating timer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><line x1="9" y1="15" x2="21" y2="3"/><polyline points="9 21 3 21 3 15"/><line x1="15" y1="9" x2="3" y2="21"/></svg>
          </button>

          {!isRunning ? (
            <div className={`flex items-center gap-2 px-4 py-1.5 ${theme === 'kawaii' ? 'bg-[#FDE8E8] border border-[#F4B8C1] rounded-none font-sans' : 'bg-cream-dark rounded-full'}`}>
              <span className={`text-[12px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70' : 'text-text-muted'}`}>FOCUS FOR:</span>
              <input 
                type="number" 
                value={customMins}
                onChange={handleMinsChange}
                className={`w-12 bg-transparent font-bold text-center border-b-2 focus:outline-none ${theme === 'kawaii' ? 'text-[#5A3A3A] border-[#F4B8C1] focus:border-[#5A3A3A]' : 'text-coral border-coral-light focus:border-coral'}`}
                min="15" max="180"
              />
              <span className={`text-[12px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70' : 'text-text-muted'}`}>MINS</span>
            </div>
          ) : (
            <div className={`flex items-center gap-2 px-4 py-1.5 ${theme === 'kawaii' ? 'bg-[#FDE8E8] border border-[#F4B8C1] rounded-none font-sans' : 'bg-cream-dark rounded-full'}`}>
              <span className={`text-[12px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70' : 'text-text-muted'}`}>FOCUSING FOR:</span>
              <span className={`text-[13px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A]' : 'text-coral'}`}>{customMins}</span>
              <span className={`text-[12px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70' : 'text-text-muted'}`}>MINS</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          {/* Status Label Above */}
          <div className={`text-[13px] font-extrabold uppercase tracking-widest h-5 mb-3 transition-opacity ${isRunning || (timeLeft < customMins * 60 && timeLeft > 0) ? 'opacity-100' : 'opacity-0'} ${theme === 'kawaii' ? (isFlowState ? 'text-[#7DDFC3] font-sans' : 'text-[#5A3A3A] font-sans') : (isFlowState ? 'text-blue-light' : 'text-text-muted')}`}>
            {isRunning ? (
              isFlowState ? '🌊 IN FLOW STATE' : '🧱 ENTERING FLOW STATE'
            ) : (timeLeft < customMins * 60 && timeLeft > 0) ? (
              '⏸️ Start Timer to continue'
            ) : (
              ' '
            )}
          </div>

          {/* Timer Display with Dual Rings */}
          <div className="relative flex items-center justify-center w-[240px] h-[240px]">
            {/* Outer Ring (Total Time) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle cx="120" cy="120" r="110" className={`stroke-cream-dark ${theme === 'kawaii' ? 'stroke-[#FDE8E8]' : ''}`} strokeWidth="8" fill="none" />
              <circle
                cx="120" cy="120" r="110"
                stroke={themeColor}
                className="transition-all duration-1000 ease-linear"
                strokeWidth="8" fill="none"
                strokeDasharray="691"
                strokeDashoffset={isFlowState ? (691 - (691 * totalPct) / 100) : 691}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Ring (Flow State Buildup) */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 scale-[0.82]">
              <circle cx="120" cy="120" r="110" className={`stroke-cream-dark opacity-50 ${theme === 'kawaii' ? 'stroke-[#FDE8E8]' : ''}`} strokeWidth="6" fill="none" />
              <circle
                cx="120" cy="120" r="110"
                stroke={theme === 'kawaii' ? (isFlowState ? '#7DDFC3' : '#F4B8C1') : (isFlowState ? '#F0A500' : '#FFB5A0')}
                className="transition-all duration-1000 ease-linear"
                strokeWidth="6" fill="none"
                strokeDasharray="691"
                strokeDashoffset={691 - (691 * flowPct) / 100}
                strokeLinecap="round"
              />
            </svg>
            
            <div className="flex flex-col items-center z-10 -mt-2">
              <div className={`font-extrabold text-[56px] tracking-wide leading-none ${theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : `font-baloo ${isRunning ? (isFlowState ? 'text-blue-light' : 'text-coral') : 'text-text-dark'}`}`}>
                {formatTime(timeLeft)}
              </div>
              <div className={`text-[14px] font-bold mt-1 uppercase tracking-widest ${theme === 'kawaii' ? 'text-[#7DDFC3] font-sans' : (isFlowState ? 'text-yellow-deep' : 'text-coral-light')}`}>
                +{Math.floor(earnedXp)} XP
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2 w-full max-w-[240px] mt-2">
          <div className="flex gap-2 w-full">
            <button
              onClick={toggleTimer}
              style={{ 
                backgroundColor: isRunning ? themeBg : themeColor,
                color: theme === 'kawaii' ? '#5A3A3A' : (isRunning ? themeColor : '#fff'),
                borderColor: theme === 'kawaii' ? '#5A3A3A' : themeColor,
              }}
              className={`flex-1 py-3 font-bold text-[14px] transition-all border-2 ${theme === 'kawaii' ? 'rounded-none font-sans active:translate-y-[2px]' : `rounded-xl ${!isRunning && 'shadow-[0_4px_0_#A03D20] active:translate-y-[4px] active:shadow-none hover:opacity-90'}`} ${theme === 'kawaii' && !isRunning && 'shadow-[2px_2px_0_#5A3A3A] active:shadow-none'}`}
            >
              {isRunning ? 'PAUSE' : 'START FOCUS'}
            </button>
            
            <button
              onClick={handleReset}
              className={`px-5 py-3 font-bold text-[14px] transition-all border-2 ${theme === 'kawaii' ? 'bg-white border-[#5A3A3A] text-[#5A3A3A] font-sans rounded-none shadow-[2px_2px_0_rgba(90,58,58,0.2)] active:translate-y-[2px] active:shadow-none' : 'rounded-xl border-cream-dark text-text-muted hover:bg-cream-dark hover:text-text-dark'}`}
            >
              RESET
            </button>
          </div>
          
          <button
            onClick={handleDistracted}
            disabled={!isRunning}
            className={`w-full py-2 font-bold text-[11px] transition-all border-2 uppercase ${theme === 'kawaii' ? 'border-[#5A3A3A] font-sans rounded-none text-[#5A3A3A]' : 'border-cream-dark rounded-xl'} ${
              isRunning
                ? (theme === 'kawaii' ? 'bg-[#FDE8E8] shadow-[2px_2px_0_rgba(90,58,58,0.2)] active:translate-y-[2px] active:shadow-none' : 'text-text-muted hover:bg-cream-dark hover:text-text-dark')
                : 'opacity-0 pointer-events-none'
            }`}
          >
            I got distracted 😔
          </button>
        </div>

      </div>

      {/* Floating Pill Widget */}
      {isFloating && (
        <div className={`fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300 ${theme === 'kawaii' ? '' : 'shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-full'}`}>
          <div 
            onClick={() => {
               window.scrollTo({ top: 0, behavior: 'smooth' });
               setIsManualFloating(false);
            }}
            className={`flex items-center gap-4 px-5 py-2.5 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 ${theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.3)] rounded-none' : 'bg-white/95 backdrop-blur-md rounded-full border-2 border-cream-dark'}`}
            title="Click to return to main timer"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{isFlowState ? '🌊' : '🧱'}</span>
              <span className={`font-extrabold text-2xl tracking-wide leading-none pt-0.5 ${theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : `font-baloo ${isRunning ? (isFlowState ? 'text-blue-light' : 'text-coral') : 'text-text-dark'}`}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
            <div className={`w-px h-6 mx-1 ${theme === 'kawaii' ? 'bg-[#F4B8C1]' : 'bg-cream-dark'}`}></div>

            <button 
              onClick={(e) => { e.stopPropagation(); toggleTimer(); }}
              className={`flex items-center justify-center w-9 h-9 transition-colors ${theme === 'kawaii' ? 'rounded-none border-2 border-[#5A3A3A] bg-[#7DDFC3] text-[#5A3A3A] active:translate-y-[2px] active:shadow-none shadow-[2px_2px_0_#5A3A3A]' : `rounded-full ${isRunning ? 'bg-cream-dark text-text-muted hover:bg-coral-pale hover:text-coral' : 'bg-coral text-white shadow-md hover:bg-[#E07652]'}`}`}
            >
              {isRunning ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="5" height="16" rx="1"/><rect x="14" y="4" width="5" height="16" rx="1"/></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M5 3v18l15-9L5 3z"/></svg>
              )}
            </button>
          </div>
        </div>
      )}
    </Card>

      {/* Custom Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setConfirmModal(null)} />
          {theme === 'kawaii' ? (
            <div className="relative bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] w-full max-w-[320px] flex flex-col animate-in fade-in zoom-in-95 duration-200">
              <div className="bg-[#F4B8C1] px-2 py-1 flex items-center justify-between border-b-2 border-[#F4B8C1]">
                <div className="text-[#5A3A3A] font-bold text-[12px] tracking-wide font-sans">confirm.exe</div>
                <div className="flex gap-1">
                  <button onClick={() => setConfirmModal(null)} className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">✕</button>
                </div>
              </div>
              <div className="p-5">
                <div className="text-center text-4xl mb-3">{confirmModal.emoji}</div>
                <p className="text-center text-[14px] font-bold text-[#5A3A3A] leading-relaxed mb-6 font-sans">
                  {confirmModal.message}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setConfirmModal(null)}
                    className="flex-1 bg-white text-[#5A3A3A] py-2.5 font-bold text-[13px] border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmModal.onConfirm}
                    className="flex-[1.5] bg-[#7DDFC3] text-[#5A3A3A] py-2.5 font-bold text-[13px] border-2 border-[#5A3A3A] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none shadow-[2px_2px_0_rgba(244,184,193,0.5)]"
                  >
                    Yes, I'm sure
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-white/90 backdrop-blur-xl rounded-[20px] p-6 w-[320px] border-[1.5px] border-white/60 shadow-[0_20px_60px_rgba(247,134,96,0.2)] animate-in fade-in zoom-in-95 duration-200">
              <div className="text-center text-4xl mb-3">{confirmModal.emoji}</div>
              <p className="text-center text-[14px] font-semibold text-text-dark leading-relaxed mb-5">
                {confirmModal.message}
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmModal(null)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-[13px] border-2 border-cream-dark text-text-muted hover:bg-cream-dark hover:text-text-dark transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmModal.onConfirm}
                  className="flex-1 py-2.5 rounded-xl font-bold text-[13px] bg-coral text-white border-2 border-coral hover:bg-[#E07652] transition-all shadow-[0_4px_0_#A03D20] active:translate-y-[4px] active:shadow-none"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
