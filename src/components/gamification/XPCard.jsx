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
              Total XP<br/><span className="text-[18px]">{xp}</span>
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

  if (theme === 'cozy') {
    return (
      <div
        className="flex flex-col relative overflow-hidden"
        style={{
          background: '#3A2E2A',
          border: '1.5px solid #2A2018',
          borderRadius: '6px',
          fontFamily: "'Courier Prime','Courier New',monospace",
        }}
      >
        {/* macOS traffic lights */}
        <div className="px-4 py-2 flex items-center gap-3" style={{ borderBottom: '1px solid #2A2018', background: '#2A2018' }}>
          {[['#FF5F57','✕'],['#FEBC2E','−'],['#28C840','⤢']].map(([c,sym],i) => (
            <div key={i} className="group w-3 h-3 rounded-full flex items-center justify-center cursor-default" style={{ background: c }}>
              <span className="opacity-0 group-hover:opacity-100 text-[6px] font-bold leading-none select-none" style={{ color: '#fff' }}>{sym}</span>
            </div>
          ))}
          <span className="text-[11px] tracking-wide lowercase mx-auto pr-16" style={{ color: 'rgba(245,240,232,0.4)' }}>xp_tracker.log</span>
        </div>

        <div className="p-6 flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <div
              className="font-bold text-[13px] px-4 py-1.5"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', color: '#F5F0E8' }}
            >
              ⚡ Level {lv.n} — <span dangerouslySetInnerHTML={{ __html: lv.name.replace(/<[^>]+>/g, '') }} />
            </div>
            <div className="text-right text-[12px] font-bold leading-tight" style={{ color: 'rgba(245,240,232,0.55)' }}>
              Total XP<br/><span className="text-[20px]" style={{ color: '#C4A882' }}>{xp}</span>
            </div>
          </div>
          <div className="font-bold text-[22px] mb-1" style={{ color: '#F5F0E8' }} dangerouslySetInnerHTML={{ __html: lv.name }} />
          <div className="text-[13px] mb-[18px]" style={{ color: 'rgba(245,240,232,0.5)' }}>{lv.desc}</div>
          <div className="h-[10px] mb-2 overflow-hidden" style={{ background: 'rgba(255,255,255,0.10)', borderRadius: '3px' }}>
            <div className="h-full xp-bar-fill" style={{ width: `${pct}%`, background: '#B5302A', borderRadius: '3px' }} />
          </div>
          <div className="flex justify-between text-[11px] font-bold" style={{ color: 'rgba(245,240,232,0.4)' }}>
            <span>Level {lv.n}</span>
            <span>{lv.max === 99999 ? 'MAX LEVEL 🏆' : `${xp - lv.min} / ${span} XP to Level ${lv.n + 1}`}</span>
            <span>{lv.max === 99999 ? 'MAX' : `Level ${lv.n + 1}`}</span>
          </div>
        </div>
      </div>
    );
  }

  // Default
  return (
    <div className="bg-blue rounded-lg p-7 relative overflow-hidden">
      <div className="absolute w-[220px] h-[220px] bg-white/5 rounded-full -top-[80px] -right-[60px]" />
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="bg-yellow rounded-pill px-[18px] py-1.5 font-baloo font-extrabold text-[15px] text-blue shadow-[0_3px_0_var(--color-yellow-deep)]">
          ⚡ Level {lv.n} — <span dangerouslySetInnerHTML={{ __html: lv.name.replace(/<[^>]+>/g, '') }} />
        </div>
        <div className="text-right text-white/70 text-[13px] font-semibold leading-tight">
          Total XP<br/><span className="text-yellow text-[18px] font-extrabold font-baloo">{xp}</span>
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
