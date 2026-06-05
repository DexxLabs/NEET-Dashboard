import React from 'react';
import { getDaysToExam } from '../../utils/dateUtils';

export const Header = () => {
  const daysRemaining = getDaysToExam();
  const totalDays = 15;
  const currentDay = Math.max(1, Math.min(totalDays, totalDays - daysRemaining + 1));

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
