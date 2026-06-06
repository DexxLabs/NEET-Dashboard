import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';

export const FocusTimer = () => {
  const addXP = useStore((state) => state.addXP);

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

  useEffect(() => {
    localStorage.setItem('focusTimerState', JSON.stringify({
      customMins, timeLeft, focusSeconds, earnedXp, isRunning
    }));
  }, [customMins, timeLeft, focusSeconds, earnedXp, isRunning]);

  // Constants
  const FOCUS_THRESHOLD = 600; // 10 minutes to reach Flow State
  const isFlowState = focusSeconds >= FOCUS_THRESHOLD;

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
        setFocusSeconds((f) => {
          const newF = f + 1;
          if (newF === FOCUS_THRESHOLD) {
            // Exactly at the 10 min mark, we enter flow state
            addXP(1, '🎉 Congratulations! You have entered Flow State!');
          } else if (newF > 0 && newF % 60 === 0) {
            const inFlow = newF > FOCUS_THRESHOLD;
            const xpToAdd = inFlow ? 2 : 1;
            // No message to prevent popup spam
            addXP(xpToAdd, null);
          }
          return newF;
        });
        setEarnedXp((xp) => xp + (isFlowState ? (2 / 60) : (1 / 60))); // 1 XP/min base, 2 XP/min in flow
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      setIsRunning(false);
      setTimeLeft(customMins * 60);
      setFocusSeconds(0);
      setEarnedXp(0);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, focusSeconds, isFlowState, earnedXp, customMins, addXP]);

  // Handle visibility change (tab switching)
  useEffect(() => {
    const onBeforeUnload = () => {
      window.__isRefreshing = true;
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    const handleVisibility = () => {
      if (document.hidden && isRunning && !window.__isRefreshing) {
        setIsRunning(false);
        if (focusSeconds < FOCUS_THRESHOLD) {
          setFocusSeconds(0);
          // Show toast that progress was lost
          const showToast = useStore.getState().showToast;
          showToast("🚨 You left the screen! Warmup progress reset.");
        } else {
          const showToast = useStore.getState().showToast;
          showToast("⏸️ You left the screen! Timer paused.");
        }
      }
    };
    
    // Also listen to blur for switching apps/windows
    const handleBlur = () => {
      if (isRunning && !window.__isRefreshing) {
        setIsRunning(false);
        if (focusSeconds < FOCUS_THRESHOLD) {
          setFocusSeconds(0);
          const showToast = useStore.getState().showToast;
          showToast("🚨 You lost focus! Warmup progress reset.");
        } else {
          const showToast = useStore.getState().showToast;
          showToast("⏸️ You lost focus! Timer paused.");
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
    };
  }, [isRunning, focusSeconds]);

  const toggleTimer = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(customMins * 60);
      setFocusSeconds(0);
      setEarnedXp(0);
      setIsRunning(true);
    } else if (isRunning) {
      if (!isFlowState) {
        if (window.confirm("Pausing now will reset your Flow State progress! Are you sure?")) {
          setIsRunning(false);
          setFocusSeconds(0);
        }
      } else {
        setIsRunning(false);
      }
    } else {
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the timer?")) {
      setIsRunning(false);
      setTimeLeft(customMins * 60);
      setFocusSeconds(0);
      setEarnedXp(0);
    }
  };

  const handleDistracted = () => {
    if (window.confirm("Checking your phone? This will reset your Flow State buildup!")) {
      setFocusSeconds(0);
    }
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

  const themeColor = isFlowState ? '#3D5FC7' : '#F78660'; // blue-light vs coral
  const themeBg = isFlowState ? '#E6EEFF' : '#FFF0EC'; // blue-pale vs coral-pale

  return (
    <Card title="🌊 Flow State Timer" sub="Survive 10 mins to enter Flow." className="h-full">
      <div className="flex flex-col items-center justify-center h-full gap-5 py-2">
        
        {/* Custom Duration Input */}
        {!isRunning ? (
          <div className="flex items-center gap-2 bg-cream-dark px-4 py-1.5 rounded-full">
            <span className="text-[12px] font-bold text-text-muted">FOCUS FOR:</span>
            <input 
              type="number" 
              value={customMins}
              onChange={handleMinsChange}
              className="w-12 bg-transparent text-coral font-bold text-center border-b-2 border-coral-light focus:outline-none focus:border-coral"
              min="15" max="180"
            />
            <span className="text-[12px] font-bold text-text-muted">MINS</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-cream-dark px-4 py-1.5 rounded-full opacity-0 pointer-events-none">
            {/* Placeholder to keep layout steady */}
            <span className="text-[12px]">FOCUS</span>
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full">
          {/* Status Label Above */}
          <div className={`text-[13px] font-extrabold uppercase tracking-widest h-5 mb-3 transition-opacity ${isRunning || (timeLeft < customMins * 60 && timeLeft > 0) ? 'opacity-100' : 'opacity-0'} ${isFlowState ? 'text-blue-light' : 'text-text-muted'}`}>
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
              <circle cx="120" cy="120" r="110" className="stroke-cream-dark" strokeWidth="8" fill="none" />
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
              <circle cx="120" cy="120" r="110" className="stroke-cream-dark opacity-50" strokeWidth="6" fill="none" />
              <circle
                cx="120" cy="120" r="110"
                stroke={isFlowState ? '#F0A500' : '#FFB5A0'}
                className="transition-all duration-1000 ease-linear"
                strokeWidth="6" fill="none"
                strokeDasharray="691"
                strokeDashoffset={691 - (691 * flowPct) / 100}
                strokeLinecap="round"
              />
            </svg>
            
            <div className="flex flex-col items-center z-10 mt-1">
              <div className={`font-baloo font-extrabold text-5xl tracking-wide leading-none ${isRunning ? (isFlowState ? 'text-blue-light' : 'text-coral') : 'text-text-dark'}`}>
                {formatTime(timeLeft)}
              </div>
              <div className={`text-[14px] font-bold mt-2 uppercase tracking-widest ${isFlowState ? 'text-yellow-deep' : 'text-coral-light'}`}>
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
                color: isRunning ? themeColor : '#fff',
                borderColor: isRunning ? themeColor : themeColor,
              }}
              className={`flex-1 py-3 rounded-xl font-bold text-[14px] transition-all border-2 ${!isRunning && 'shadow-[0_4px_0_#A03D20] active:translate-y-[4px] active:shadow-none hover:opacity-90'}`}
            >
              {isRunning ? 'PAUSE' : 'START FOCUS'}
            </button>
            
            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-xl font-bold text-[14px] transition-all border-2 border-cream-dark text-text-muted hover:bg-cream-dark hover:text-text-dark"
            >
              RESET
            </button>
          </div>
          
          <button
            onClick={handleDistracted}
            disabled={!isRunning}
            className={`w-full py-2 rounded-xl font-bold text-[11px] transition-all border-2 border-cream-dark uppercase ${
              isRunning
                ? 'text-text-muted hover:bg-cream-dark hover:text-text-dark'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            I got distracted 😔
          </button>
        </div>

      </div>
    </Card>
  );
};
