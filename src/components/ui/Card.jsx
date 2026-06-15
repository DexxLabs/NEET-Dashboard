import React from 'react';
import { useTheme } from '../../store/useTheme';

// macOS-style traffic light dots for cozy.grid panels
const TrafficLights = ({ filename }) => (
  <div className="flex items-center justify-between px-3 py-2 border-b" style={{ borderColor: '#D8CEBC', background: '#F7F3EB' }}>
    <div className="flex items-center gap-[6px]">
      <div className="group relative w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center cursor-default transition-all">
        <span className="opacity-0 group-hover:opacity-100 text-[7px] font-bold text-[#8B1A14] leading-none select-none">✕</span>
      </div>
      <div className="group relative w-3 h-3 rounded-full bg-[#FEBC2E] flex items-center justify-center cursor-default transition-all">
        <span className="opacity-0 group-hover:opacity-100 text-[7px] font-bold text-[#8B6A00] leading-none select-none">−</span>
      </div>
      <div className="group relative w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center cursor-default transition-all">
        <span className="opacity-0 group-hover:opacity-100 text-[7px] font-bold text-[#0A5A1A] leading-none select-none">⤢</span>
      </div>
    </div>
    <span className="text-[11px] font-mono text-[#8A7A6A] tracking-wide lowercase mx-auto pr-9">
      {filename}
    </span>
  </div>
);

// Kawaii-style win95 title bar
const KawaiiTitleBar = ({ title }) => (
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
);

// Derive a cozy filename from a card title
const toFilename = (title = 'panel') => {
  const cleaned = title.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim().replace(/\s+/g, '_');
  const suffixes = { xp: 'log', score: 'csv', progress: 'csv', quest: 'txt', badge: 'log', timer: 'exe', syllabus: 'md', streak: 'log', goal: 'txt', power: 'md', mock: 'log', subject: 'csv', stat: 'json' };
  for (const [k, ext] of Object.entries(suffixes)) {
    if (cleaned.includes(k)) return `${cleaned}.${ext}`;
  }
  return `${cleaned}.txt`;
};

export const Card = ({ title, sub, children, className = '' }) => {
  const theme = useTheme(state => state.theme);

  if (theme === 'kawaii') {
    return (
      <div className={`bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] flex flex-col ${className}`}>
        <KawaiiTitleBar title={title} />
        <div className="p-4 flex-1">
          {sub && <div className="text-[#5A3A3A] opacity-70 text-[11px] font-bold mb-4">{sub}</div>}
          {children}
        </div>
      </div>
    );
  }

  if (theme === 'cozy') {
    return (
      <div
        className={`flex flex-col ${className}`}
        style={{
          background: 'rgba(255,255,255,0.82)',
          border: '1.5px solid #D8CEBC',
          borderRadius: '6px',
          boxShadow: '0 2px 12px rgba(58,46,42,0.08)',
          fontFamily: "'Courier Prime', 'Courier New', monospace",
        }}
      >
        <TrafficLights filename={toFilename(title)} />
        <div className="p-4 flex-1">
          {title && <div className="font-bold text-[15px] mb-1" style={{ color: '#3A2E2A' }}>{title}</div>}
          {sub && <div className="text-[12px] font-mono mb-[14px]" style={{ color: 'rgba(58,46,42,0.6)' }}>{sub}</div>}
          {children}
        </div>
      </div>
    );
  }

  // Default
  return (
    <div className={`bg-white/70 backdrop-blur-md rounded-xl p-6 border-[1.5px] border-white/60 shadow-[0_8px_30px_rgba(247,134,96,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(247,134,96,0.15)] hover:border-coral/20 ${className}`}>
      {title && <div className="font-baloo font-bold text-[18px] text-text-dark mb-1">{title}</div>}
      {sub && <div className="text-[12px] text-text-muted font-semibold mb-[18px]">{sub}</div>}
      {children}
    </div>
  );
};
