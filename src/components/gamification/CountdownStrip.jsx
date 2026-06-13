import React from 'react';
import { getDaysToExam } from '../../utils/dateUtils';
import { useTheme } from '../../store/useTheme';

export const CountdownStrip = () => {
  const daysRemaining = getDaysToExam();
  const totalDays = 15; // Assume the journey started 15 days before June 21
  const currentDay = Math.max(1, Math.min(totalDays, totalDays - daysRemaining + 1));
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const theme = useTheme(state => state.theme);

  return (
    <div className={`py-2.5 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 overflow-x-auto custom-scrollbar ${theme === 'kawaii' ? 'bg-[#F4B8C1] border-y-2 border-[#5A3A3A]' : 'bg-yellow'}`}>
      <div className={`font-bold text-[15px] whitespace-nowrap ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'font-baloo text-blue'}`}>
        📅 {totalDays}-Day Journey ({daysRemaining} days left)
      </div>
      <div className="flex gap-2 min-w-max">
        {days.map((day) => {
          let stateClass = '';
          if (theme === 'kawaii') {
            if (day < currentDay) {
              stateClass = 'bg-[#7DDFC3] border-[#5A3A3A] text-[#5A3A3A] shadow-[2px_2px_0_rgba(90,58,58,0.3)]';
            } else if (day === currentDay) {
              stateClass = 'bg-white border-[#5A3A3A] text-[#5A3A3A] shadow-[2px_2px_0_#5A3A3A] -translate-y-[2px]';
            } else {
              stateClass = 'bg-[#FDE8E8] border-[#5A3A3A] text-[#5A3A3A] opacity-80';
            }
          } else {
            if (day < currentDay) {
              stateClass = 'bg-blue border-[#1a2e80] text-white';
            } else if (day === currentDay) {
              stateClass = 'bg-coral border-[#D05830] text-white shadow-[0_3px_0_#D05830] -translate-y-[2px]';
            } else {
              stateClass = 'bg-white/60 border-[#2945A8]/30 text-text-mid';
            }
          }
          return (
            <div 
              key={day}
              className={`w-[36px] h-[36px] md:w-[42px] md:h-[42px] flex items-center justify-center font-extrabold text-[14px] md:text-base border-2 transition-all duration-200 cursor-default select-none shrink-0 ${theme === 'kawaii' ? 'rounded-none font-sans' : 'rounded-[10px] font-baloo'} ${stateClass}`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className={`md:ml-auto font-extrabold text-[13px] py-1 px-3.5 whitespace-nowrap ${theme === 'kawaii' ? 'bg-white text-[#5A3A3A] border-2 border-[#5A3A3A] rounded-none shadow-[2px_2px_0_#5A3A3A] font-sans' : 'bg-blue text-yellow rounded-pill font-baloo'}`}>
        🎯 NEET 2026
      </div>
    </div>
  );
};
