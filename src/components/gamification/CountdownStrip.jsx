import React from 'react';
import { getDaysToExam } from '../../utils/dateUtils';

export const CountdownStrip = () => {
  const daysRemaining = getDaysToExam();
  const totalDays = 15; // Assume the journey started 15 days before June 21
  const currentDay = Math.max(1, Math.min(totalDays, totalDays - daysRemaining + 1));
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);

  return (
    <div className="bg-yellow py-2.5 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 overflow-x-auto custom-scrollbar">
      <div className="font-baloo font-bold text-[15px] text-blue whitespace-nowrap">
        📅 {totalDays}-Day Journey ({daysRemaining} days left)
      </div>
      <div className="flex gap-2 min-w-max">
        {days.map((day) => {
          let stateClass = '';
          if (day < currentDay) {
            stateClass = 'bg-blue border-[#1a2e80] text-white';
          } else if (day === currentDay) {
            stateClass = 'bg-coral border-[#D05830] text-white shadow-[0_3px_0_#D05830] -translate-y-[2px]';
          } else {
            stateClass = 'bg-white/60 border-[#2945A8]/30 text-text-mid';
          }
          return (
            <div 
              key={day}
              className={`w-[36px] h-[36px] md:w-[42px] md:h-[42px] rounded-[10px] flex items-center justify-center font-baloo font-extrabold text-[14px] md:text-base border-2 transition-all duration-200 cursor-default select-none shrink-0 ${stateClass}`}
            >
              {day}
            </div>
          );
        })}
      </div>
      <div className="md:ml-auto bg-blue text-yellow font-baloo font-extrabold text-[13px] py-1 px-3.5 rounded-pill whitespace-nowrap">
        🎯 NEET 2026
      </div>
    </div>
  );
};
