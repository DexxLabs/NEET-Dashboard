import React, { useEffect, useState } from 'react';
import { useTheme } from '../../store/useTheme';

export const BootScreen = () => {
  const { isBooting, theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('shutdown'); // shutdown -> boot

  useEffect(() => {
    if (isBooting) {
      setProgress(0);
      setPhase(theme === 'kawaii' ? 'shutdown' : 'boot'); // theme hasn't flipped yet in the store when this starts

      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            return 100;
          }
          return p + 15 + Math.random() * 20;
        });
      }, 100);

      const switchTimer = setTimeout(() => {
        setPhase(theme === 'kawaii' ? 'boot' : 'shutdown');
        setProgress(0);
      }, 600);

      return () => {
        clearInterval(interval);
        clearTimeout(switchTimer);
      };
    }
  }, [isBooting, theme]);

  if (!isBooting) return null;

  const isGoingToKawaii = theme === 'default'; // theme hasn't flipped yet in store

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#FDE8E8] transition-opacity">
      <div className="bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] w-full max-w-[360px] flex flex-col">
        {/* Title bar */}
        <div className="bg-[#F4B8C1] px-2 py-1 flex items-center justify-between border-b-2 border-[#F4B8C1]">
          <div className="text-[#5A3A3A] font-bold text-[12px] tracking-wide font-sans">
            system_dialog.exe
          </div>
          <div className="flex gap-1 opacity-50 pointer-events-none">
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px]">_</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px]">□</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px]">✕</button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">
              {phase === 'shutdown' ? '💤' : (isGoingToKawaii ? '♥' : '✨')}
            </div>
            <div className="text-[#5A3A3A] font-bold text-[14px] font-sans">
              {phase === 'shutdown' 
                ? (isGoingToKawaii ? "Shutting down default..." : "Shutting down kawaii.exe...") 
                : (isGoingToKawaii ? "Booting kawaii.exe..." : "Booting default system...")}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-6 bg-[#FDE8E8] border-2 border-[#F4B8C1] shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] p-0.5">
            <div 
              className="h-full bg-[#7DDFC3] transition-all duration-100 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
