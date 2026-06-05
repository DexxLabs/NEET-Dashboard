import React from 'react';
import { useStore } from '../../store/useStore';
import { getLevel } from '../../utils/constants';

export const XPCard = () => {
  const xp = useStore((state) => state.xp);
  const lv = getLevel(xp);
  
  const span = lv.max - lv.min;
  const pct = lv.max === 99999 ? 100 : Math.min(100, Math.round(((xp - lv.min) / span) * 100));

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
