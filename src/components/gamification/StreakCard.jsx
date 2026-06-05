import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../ui/Card';
import { getDaysToExam } from '../../utils/dateUtils';

export const StreakCard = () => {
  const streak = useStore((state) => state.streak);
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
    <Card title="🔥 Study Streak" sub="Complete 4+ tasks/day to keep it alive!">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
        <div>
          <div className="font-baloo font-extrabold text-[36px] text-coral leading-none">{streak}</div>
          <div className="text-[12px] font-semibold text-text-muted mt-0.5">day streak</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {days.map((day) => {
            let stateClass = '';
            if (day <= streak) {
              stateClass = 'bg-coral border-[#D05830] text-white';
            } else {
              stateClass = 'bg-white border-cream-dark text-cream-dark';
            }
            return (
              <div 
                key={day}
                className={`w-[34px] h-[34px] rounded-[10px] flex items-center justify-center font-bold font-baloo text-[13px] border-2 ${stateClass}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-[#FFF0EC] border-[1.5px] border-coral-light rounded-xl py-2.5 px-3.5 text-[13px] font-semibold text-[#A03D20] mt-3.5">
        {streakMsg}
      </div>
    </Card>
  );
};
