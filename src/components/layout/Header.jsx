import React from 'react';
import { useTheme } from '../../store/useTheme';
import { getDaysToExam } from '../../utils/dateUtils';

export const Header = () => {
  const daysRemaining = getDaysToExam();
  const totalDays = 15;
  const currentDay = Math.max(1, Math.min(totalDays, totalDays - daysRemaining + 1));
  const theme = useTheme(state => state.theme);

  if (theme === 'kawaii') {
    return (
      <header className="bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] flex flex-col mb-4">
        {/* Title bar */}
        <div className="bg-[#F4B8C1] px-3 py-1.5 flex items-center justify-between border-b-2 border-[#F4B8C1]">
          <div className="text-[#5A3A3A] font-bold text-[14px] tracking-wide font-sans">neet_quest.exe</div>
          <div className="flex gap-1.5">
            <button className="w-4 h-4 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[10px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">_</button>
            <button className="w-4 h-4 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[10px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">□</button>
            <button className="w-4 h-4 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[10px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">✕</button>
          </div>
        </div>
        <div className="py-5 px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FDE8E8] border-2 border-[#F4B8C1] flex items-center justify-center text-3xl shadow-[2px_2px_0_rgba(244,184,193,0.5)] shrink-0">
              🐰
            </div>
            <div>
              <div className="font-sans text-[20px] md:text-[24px] font-bold text-[#5A3A3A] leading-[1.1] mb-1">
                Nitu's <span className="text-[#F4B8C1] drop-shadow-[1px_1px_0_#5A3A3A]">NEET Quest</span> ✨
              </div>
              <div className="text-[13px] text-[#5A3A3A] font-medium opacity-80">
                Score 600+ in {daysRemaining} days · You got this!
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="bg-[#FDE8E8] border-2 border-[#F4B8C1] px-4 py-2 text-[#5A3A3A] font-bold text-sm shadow-[2px_2px_0_rgba(244,184,193,0.5)] font-sans">
              Day <span className="text-[#F4B8C1] drop-shadow-[1px_1px_0_#5A3A3A] text-lg">{currentDay}</span> of {totalDays}
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-blue py-6 px-4 md:px-16 lg:px-24 xl:px-32 flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden gap-4">
      <div className="absolute w-[300px] h-[300px] bg-white/5 rounded-full -top-[120px] -right-[60px]" />
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-yellow rounded-full flex items-center justify-center text-3xl border-[3px] border-yellow-deep shadow-[0_4px_0_var(--color-yellow-deep)] shrink-0 z-10">
          🐰
        </div>
        <div className="z-10">
          <div className="font-baloo text-[22px] md:text-[28px] font-extrabold text-white leading-[1.1]">
            Nitu's <span className="text-yellow">NEET Quest</span> ✨
          </div>
          <div className="text-[13px] text-white/65 font-medium mt-[2px]">
            Score 600+ in {daysRemaining} days · You got this, guddi!
          </div>
        </div>
      </div>

      <div className="flex gap-3 items-center z-10">
        <div className="bg-white/[0.13] border-[1.5px] border-white/20 rounded-pill px-4 py-1.5 text-white font-bold text-sm font-baloo">
          Day <span className="text-yellow">{currentDay}</span> of {totalDays}
        </div>
      </div>
    </header>
  );
};

