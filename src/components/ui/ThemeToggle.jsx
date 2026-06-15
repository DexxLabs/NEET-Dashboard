import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../store/useTheme';

export const ThemeToggle = () => {
  const { theme, setThemeAction } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (nextTheme) => {
    setThemeAction(nextTheme);
    setIsOpen(false);
  };

  const currentThemeConfig = {
    default: { id: 'default', icon: '🌸', tooltip: 'Default', btnClass: 'bg-white/80 border-white/60 text-text-dark rounded-2xl shadow-lg border-[1.5px]' },
    kawaii: { id: 'kawaii', icon: '★', tooltip: 'kawaii.exe', btnClass: 'bg-[#F4B8C1] border-[#5A3A3A] text-[#5A3A3A] shadow-[2px_2px_0_#5A3A3A] rounded-none border-2' },
    cozy: { id: 'cozy', icon: '✨', tooltip: 'cozy.grid', btnClass: 'bg-[#F5F0E8] border-[#D8CEBC] text-[#3A2E2A] rounded-[6px] shadow-[0_2px_8px_rgba(58,46,42,0.10)] border-[1.5px]' }
  };
  
  const cfg = currentThemeConfig[theme] || currentThemeConfig.default;
  const otherThemes = ['default', 'kawaii', 'cozy'].filter(t => t !== theme);

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col-reverse gap-4 items-center" ref={containerRef}>
      
      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[50px] h-[50px] flex items-center justify-center transition-all group relative ${cfg.btnClass} ${isOpen ? 'scale-90 opacity-80' : 'hover:-translate-y-1 hover:shadow-xl'}`}
        title="Change Theme"
      >
        <span className={`text-[24px] transition-transform ${isOpen ? 'rotate-180' : 'group-hover:scale-110'}`}>
          {cfg.icon}
        </span>
      </button>

      {/* Pop-up Theme Buttons (Speed Dial) */}
      <div 
        className={`flex flex-col-reverse gap-4 absolute bottom-[66px] transition-all duration-300 origin-bottom ${isOpen ? 'opacity-100 scale-100 pointer-events-auto translate-y-0' : 'opacity-0 scale-50 pointer-events-none translate-y-8'}`}
      >
        {otherThemes.map(t => {
          const tCfg = currentThemeConfig[t];
          return (
            <div key={t} className="relative group/btn">
              <button
                onClick={() => handleSelect(t)}
                className={`w-[50px] h-[50px] flex items-center justify-center transition-all hover:-translate-y-1 hover:shadow-xl relative ${tCfg.btnClass}`}
              >
                <span className="text-[24px] group-hover/btn:scale-110 transition-transform">
                  {tCfg.icon}
                </span>
                
                {/* NEW tag for cozy */}
                {t === 'cozy' && (
                  <span className="absolute -top-2 -right-3 bg-[#B5302A] text-white text-[8px] px-1.5 py-0.5 rounded-[4px] uppercase tracking-wider font-bold shadow-sm z-10" style={{ fontFamily: 'sans-serif' }}>
                    New
                  </span>
                )}
              </button>
              
              {/* Tooltip */}
              <div className="absolute left-16 top-1/2 -translate-y-1/2 px-2.5 py-1 whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none bg-white/90 backdrop-blur-sm rounded-lg text-text-dark font-bold text-[12px] shadow-sm border border-white/60">
                {tCfg.tooltip}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
