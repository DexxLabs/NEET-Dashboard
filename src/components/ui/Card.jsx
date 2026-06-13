import React from 'react';
import { useTheme } from '../../store/useTheme';

export const Card = ({ title, sub, children, className = '' }) => {
  const theme = useTheme(state => state.theme);

  if (theme === 'kawaii') {
    return (
      <div className={`bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] flex flex-col ${className}`}>
        {/* Title bar */}
        <div className="bg-[#F4B8C1] px-2 py-1 flex items-center justify-between border-b-2 border-[#F4B8C1]">
          <div className="text-[#5A3A3A] font-bold text-[12px] tracking-wide font-sans">
            {(title || 'panel').toLowerCase().replace(/[^a-z0-9]+/g, '_')}.exe
          </div>
          <div className="flex gap-1">
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">_</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">□</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">✕</button>
          </div>
        </div>
        <div className="p-4 flex-1">
          {sub && <div className="text-[#5A3A3A] opacity-70 text-[11px] font-bold mb-4">{sub}</div>}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/70 backdrop-blur-md rounded-xl p-6 border-[1.5px] border-white/60 shadow-[0_8px_30px_rgba(247,134,96,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(247,134,96,0.15)] hover:border-coral/20 ${className}`}>
      {title && <div className="font-baloo font-bold text-[18px] text-text-dark mb-1">{title}</div>}
      {sub && <div className="text-[12px] text-text-muted font-semibold mb-[18px]">{sub}</div>}
      {children}
    </div>
  );
};

