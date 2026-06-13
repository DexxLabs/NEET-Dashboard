import React from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { getLevel } from '../../utils/constants';

export const XPCard = () => {
  const xp = useStore((state) => state.xp);
  const theme = useTheme((state) => state.theme);
  const lv = getLevel(xp);
  
  const span = lv.max - lv.min;
  const pct = lv.max === 99999 ? 100 : Math.min(100, Math.round(((xp - lv.min) / span) * 100));

  if (theme === 'kawaii') {
    return (
      <div className="bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] flex flex-col relative">
        <div className="bg-[#F4B8C1] px-2 py-1 flex items-center justify-between border-b-2 border-[#F4B8C1]">
          <div className="text-[#5A3A3A] font-bold text-[12px] tracking-wide font-sans">xp_tracker.exe</div>
          <div className="flex gap-1">
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">_</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">□</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">✕</button>
          </div>
        </div>
        <div className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div className="bg-[#FDE8E8] border-2 border-[#F4B8C1] px-4 py-1.5 font-bold text-[14px] text-[#5A3A3A] shadow-[2px_2px_0_rgba(90,58,58,0.2)] font-sans">
              ⚡ Level {lv.n} — <span dangerouslySetInnerHTML={{ __html: lv.name.replace(/<[^>]+>/g, '') }} />
            </div>
            <div className="text-right text-[#5A3A3A] text-[13px] font-bold leading-tight font-sans">
              Total XP<br/>
              <span className="text-[18px]">{xp}</span>
            </div>
          </div>
          
          <div className="font-bold text-[22px] text-[#5A3A3A] mb-1 font-sans" dangerouslySetInnerHTML={{ __html: lv.name }} />
          <div className="text-[#5A3A3A] opacity-80 text-[13px] font-bold mb-[18px] font-sans">{lv.desc}</div>
          
          <div className="bg-[#FDE8E8] border-2 border-[#F4B8C1] shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] h-[16px] mb-2 p-0.5">
            <div className="h-full bg-[#7DDFC3] xp-bar-fill transition-all duration-300" style={{ width: `${pct}%` }} />
          </div>
          
          <div className="flex justify-between text-[12px] text-[#5A3A3A] opacity-70 font-bold font-sans">
            <span>Level {lv.n}</span>
            <span>{lv.max === 99999 ? 'MAX LEVEL 🏆' : `${xp - lv.min} / ${span} XP to Level ${lv.n + 1}`}</span>
            <span>{lv.max === 99999 ? 'MAX' : `Level ${lv.n + 1}`}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue rounded-lg p-7 relative overflow-hidden">
      <div className="absolute w-[220px] h-[220px] bg-white/5 rounded-full -top-[80px] -right-[60px]" />
      
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="bg-yellow rounded-pill px-[18px] py-1.5 font-baloo font-extrabold text-[15px] text-blue shadow-[0_3px_0_var(--color-yellow-deep)]">
          ⚡ Level {lv.n} — <span dangerouslySetInnerHTML={{ __html: lv.name.replace(/<[^>]+>/g, '') }} />
        </div>
        <div className="text-right text-white/70 text-[13px] font-semibold leading-tight">
          Total XP<br/>
          <span className="text-yellow text-[18px] font-extrabold font-baloo">{xp}</span>
        </div>
      </div>
      
      <div className="font-baloo font-extrabold text-[26px] text-white mb-1 relative z-10" dangerouslySetInnerHTML={{ __html: lv.name }} />
      <div className="text-white/60 text-[13px] font-medium mb-[18px] relative z-10">{lv.desc}</div>
      
      <div className="bg-white/12 rounded-pill h-[14px] overflow-hidden mb-2 relative z-10">
        <div className="h-full rounded-pill bg-yellow xp-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      
      <div className="flex justify-between text-[12px] text-white/50 font-semibold relative z-10">
        <span>Level {lv.n}</span>
        <span>{lv.max === 99999 ? 'MAX LEVEL 🏆' : `${xp - lv.min} / ${span} XP to Level ${lv.n + 1}`}</span>
        <span>{lv.max === 99999 ? 'MAX' : `Level ${lv.n + 1}`}</span>
      </div>
    </div>
  );
};
