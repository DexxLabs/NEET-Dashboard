import React from 'react';
import { getDaysToExam } from '../../utils/dateUtils';
import { useTheme } from '../../store/useTheme';

export const CountdownStrip = () => {
  const daysRemaining = getDaysToExam();
  const totalDays = 15;
  const currentDay = Math.max(1, Math.min(totalDays, totalDays - daysRemaining + 1));
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const theme = useTheme(state => state.theme);

  if (theme === 'cozy') {
    return (
      <div
        className="py-2.5 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 relative z-10 w-full"
        style={{ background: 'rgba(255,255,255,0.70)', borderBottom: '1.5px solid #D8CEBC', fontFamily: "'Courier Prime','Courier New',monospace" }}
      >
        <div className="font-bold text-[14px] whitespace-nowrap lowercase shrink-0" style={{ color: '#3A2E2A' }}>
          📅 {totalDays}-day journey ({daysRemaining} days left)
        </div>
        <div className="flex gap-2 w-full overflow-x-auto py-1 hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
          {days.map(day => {
            let bg, border, color;
            if (day < currentDay)    { bg = '#B5302A'; border = '#8B1A14'; color = '#F5F0E8'; }
            else if (day === currentDay) { bg = '#F5F0E8'; border = '#B5302A'; color = '#B5302A'; }
            else                     { bg = 'transparent'; border = '#D8CEBC'; color = '#C4A882'; }
            return (
              <div
                key={day}
                className="w-[34px] h-[34px] md:w-[40px] md:h-[40px] flex items-center justify-center font-bold text-[13px] md:text-[14px] transition-all duration-200 cursor-default select-none shrink-0"
                style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: '6px', color, fontFamily: "'Courier Prime','Courier New',monospace", transform: day === currentDay ? 'translateY(-2px)' : 'none' }}
              >
                {day}
              </div>
            );
          })}
        </div>
        <div
          className="md:ml-auto font-bold text-[12px] py-1 px-3.5 whitespace-nowrap lowercase shrink-0 hidden sm:block"
          style={{ background: 'rgba(255,255,255,0.85)', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#B5302A' }}
        >
          ★ neet 2026
        </div>
      </div>
    );
  }

  return (
    <div className={`py-2.5 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 w-full ${theme === 'kawaii' ? 'bg-[#F4B8C1] border-y-2 border-[#5A3A3A]' : 'bg-yellow'}`}>
      <div className={`font-bold text-[15px] whitespace-nowrap shrink-0 ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'font-baloo text-blue'}`}>
        📅 {totalDays}-Day Journey ({daysRemaining} days left)
      </div>
      <div className="flex gap-2 w-full overflow-x-auto py-1 custom-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
        {days.map((day) => {
          let stateClass = '';
          if (theme === 'kawaii') {
            if (day < currentDay)         stateClass = 'bg-[#7DDFC3] border-[#5A3A3A] text-[#5A3A3A] shadow-[2px_2px_0_rgba(90,58,58,0.3)]';
            else if (day === currentDay)  stateClass = 'bg-white border-[#5A3A3A] text-[#5A3A3A] shadow-[2px_2px_0_#5A3A3A] -translate-y-[2px]';
            else                          stateClass = 'bg-[#FDE8E8] border-[#5A3A3A] text-[#5A3A3A] opacity-80';
          } else {
            if (day < currentDay)         stateClass = 'bg-blue border-[#1a2e80] text-white';
            else if (day === currentDay)  stateClass = 'bg-coral border-[#D05830] text-white shadow-[0_3px_0_#D05830] -translate-y-[2px]';
            else                          stateClass = 'bg-white/60 border-[#2945A8]/30 text-text-mid';
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
      <div className={`md:ml-auto font-extrabold text-[13px] py-1 px-3.5 whitespace-nowrap shrink-0 hidden sm:block ${theme === 'kawaii' ? 'bg-white text-[#5A3A3A] border-2 border-[#5A3A3A] rounded-none shadow-[2px_2px_0_#5A3A3A] font-sans' : 'bg-blue text-yellow rounded-pill font-baloo'}`}>
        🎯 NEET 2026
      </div>
    </div>
  );
};
