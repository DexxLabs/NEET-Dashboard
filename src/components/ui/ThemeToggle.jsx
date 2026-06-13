import React from 'react';
import { useTheme } from '../../store/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 left-6 z-[9999] w-[50px] h-[50px] flex items-center justify-center transition-all group ${
        theme === 'kawaii' 
          ? 'bg-[#F4B8C1] border-2 border-[#5A3A3A] shadow-[2px_2px_0_#5A3A3A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-none' 
          : 'bg-white/80 backdrop-blur-md rounded-2xl border-[1.5px] border-white/60 shadow-lg hover:-translate-y-1 hover:shadow-xl hover:border-coral/30'
      }`}
      title={theme === 'kawaii' ? "Switch to default theme" : "Switch to kawaii.exe theme"}
    >
      <span className={`text-[24px] ${theme === 'kawaii' ? 'group-active:scale-95' : 'group-hover:scale-110'} transition-transform`}>
        {theme === 'kawaii' ? '♥' : '🌸'}
      </span>
      
      {/* Tooltip */}
      <div className={`absolute left-16 px-3 py-1.5 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${
        theme === 'kawaii'
          ? 'bg-white border-2 border-[#F4B8C1] text-[#5A3A3A] font-bold text-[12px] shadow-[2px_2px_0_rgba(244,184,193,0.5)]'
          : 'bg-white/90 backdrop-blur-sm rounded-lg text-text-dark font-bold text-[12px] shadow-sm border border-white/60'
      }`}>
        {theme === 'kawaii' ? "shutdown kawaii.exe" : "run kawaii.exe"}
      </div>
    </button>
  );
};
