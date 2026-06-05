import React, { useState, useEffect } from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';

export const FocusTimer = () => {
  const addXP = useStore((state) => state.addXP);
  
  const PRESETS = [
    { label: '25m', mins: 25, xp: 50 },
    { label: '45m', mins: 45, xp: 100 },
    { label: '60m', mins: 60, xp: 150 },
  ];

  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState(selectedPreset.mins * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      // Completed!
      setIsRunning(false);
      addXP(selectedPreset.xp, `🍅 Focus Session Complete! +${selectedPreset.xp} XP`);
      setTimeLeft(selectedPreset.mins * 60);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, selectedPreset, addXP]);

  const toggleTimer = () => {
    if (!isRunning && timeLeft === 0) {
      setTimeLeft(selectedPreset.mins * 60);
    }
    setIsRunning(!isRunning);
  };

  const selectPreset = (preset) => {
    if (isRunning) {
      if (!window.confirm("Switching will reset your current timer. Are you sure?")) return;
    }
    setIsRunning(false);
    setSelectedPreset(preset);
    setTimeLeft(preset.mins * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progressPct = 100 - ((timeLeft / (selectedPreset.mins * 60)) * 100);

  return (
    <Card title="🍅 Focus Mode" sub="Put away the phone. Lock in." className="h-full">
      <div className="flex flex-col items-center justify-center h-full gap-5 py-4">
        
        {/* Preset Selector */}
        <div className="flex gap-2 bg-cream-dark p-1 rounded-full">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => selectPreset(p)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-bold transition-all ${
                selectedPreset.label === p.label 
                  ? 'bg-white text-coral shadow-sm' 
                  : 'text-text-muted hover:text-text-dark'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Timer Display */}
        <div className="relative flex items-center justify-center w-[180px] h-[180px]">
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="90" cy="90" r="80"
              className="stroke-cream-dark"
              strokeWidth="12" fill="none"
            />
            <circle
              cx="90" cy="90" r="80"
              className="stroke-coral transition-all duration-1000 ease-linear"
              strokeWidth="12" fill="none"
              strokeDasharray="502"
              strokeDashoffset={502 - (502 * progressPct) / 100}
              strokeLinecap="round"
            />
          </svg>
          
          <div className="flex flex-col items-center z-10">
            <div className={`font-baloo font-extrabold text-5xl tracking-wide ${isRunning ? 'text-coral' : 'text-text-dark'}`}>
              {formatTime(timeLeft)}
            </div>
            <div className="text-[12px] font-bold text-coral-light mt-1 uppercase tracking-widest">
              +{selectedPreset.xp} XP
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 w-full max-w-[200px]">
          <button
            onClick={toggleTimer}
            className={`flex-1 py-3 rounded-xl font-bold text-[14px] transition-all ${
              isRunning 
                ? 'bg-[#FFF0EC] text-[#A03D20] border-2 border-[#FFD5C8]' 
                : 'bg-coral text-white border-2 border-coral hover:bg-[#D05830] shadow-[0_4px_0_#A03D20] active:translate-y-[4px] active:shadow-none'
            }`}
          >
            {isRunning ? 'PAUSE' : 'START FOCUS'}
          </button>
        </div>

      </div>
    </Card>
  );
};
