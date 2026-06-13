import React from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { Card } from '../ui/Card';
import { getDaysToExam } from '../../utils/dateUtils';

export const StreakCard = () => {
  const streak = useStore((state) => state.streak);
  const theme = useTheme(state => state.theme);
  const days = Array.from({ length: 15 }, (_, i) => i + 1);

  const msgs = [
    "🌱 Day 1! Every legend starts somewhere. Let's gooo!",
    "🔥 2-day streak! You came back again — that's the move!",
    "🚀 3 days straight! You are officially on a roll!",
    "⚡ 4 days! Physics can't hide from Nitu anymore!",
    "🌟 5-day streak! Consistency is rare, but you have it!",
    "💪 6 days! The momentum is building!",
    "🏆 7-DAY STREAK! A full week of queen behaviour!",
    "✨ 8 days of fire — you are unstoppable!",
    "👑 9 days! Almost at double digits!",
    "🎉 10-DAY STREAK! Double digits, absolute legend!",
    "🦋 11 days! You are morphing into a topper!",
    "💎 12 days! Pressure makes diamonds!",
    "🎯 13 days! Focused, locked in, brilliant!",
    "🌙 14 days! One more day till the grand finale!",
    "🌟 15-DAY STREAK! FULL COMMITMENT. NITU THE GREAT!"
  ];
  
  const streakMsg = msgs[Math.max(0, Math.min(streak === 0 ? 0 : streak - 1, 14))];

  return (
    <Card title="🔥 Study Streak" sub="Complete 2+ tasks/day to keep it alive!">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
        <div>
          <div className={`font-extrabold text-[36px] leading-none ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'font-baloo text-coral'}`}>{streak}</div>
          <div className={`text-[12px] font-semibold mt-0.5 ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted'}`}>day streak</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {days.map((day) => {
            let stateClass = '';
            if (day <= streak) {
              stateClass = theme === 'kawaii' ? 'bg-[#7DDFC3] border-[#5A3A3A] text-[#5A3A3A] rounded-none' : 'bg-coral border-[#D05830] text-white rounded-[10px]';
            } else {
              stateClass = theme === 'kawaii' ? 'bg-[#FDE8E8] border-[#F4B8C1] text-[#F4B8C1] rounded-none' : 'bg-white border-cream-dark text-cream-dark rounded-[10px]';
            }
            return (
              <div 
                key={day}
                className={`w-[34px] h-[34px] flex items-center justify-center font-bold text-[13px] border-2 ${theme === 'kawaii' ? 'font-sans' : 'font-baloo'} ${stateClass}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <div className={`border-[1.5px] py-2.5 px-3.5 text-[13px] font-semibold mt-3.5 ${theme === 'kawaii' ? 'bg-[#FDE8E8] border-[#F4B8C1] rounded-none text-[#5A3A3A] font-sans shadow-[2px_2px_0_rgba(244,184,193,0.3)]' : 'bg-[#FFF0EC] border-coral-light rounded-xl text-[#A03D20]'}`}>
        {streakMsg}
      </div>
    </Card>
  );
};
