import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';

const QUESTS = [
  { id: 'q1', emoji: '📵', text: 'No phone during active study blocks', xp: 50 },
  { id: 'q2', emoji: '📱', text: 'Scrolled fewer than 20 reels today', xp: 80 },
  { id: 'q3', emoji: '🧘‍♀️', text: '10 minutes of deep breathing or stretching', xp: 80 },
  { id: 'q4', emoji: '📝', text: 'Complete your full Mock Test today', xp: 150 },
  { id: 'q5', emoji: '🌙', text: "Log today's mock scores before 9 PM", xp: 30 }
];

export const QuestList = () => {
  const doneQuests = useStore((state) => state.doneQuests);
  const toggleQuest = useStore((state) => state.toggleQuest);
  const theme = useTheme(state => state.theme);

  return (
    <Card title="🎯 Daily Quests" sub="Finish all 5 for +100 Bonus XP 🌟">
      <div>
        {QUESTS.map((q) => {
          const isDone = !!doneQuests[q.id];
          return (
            <div 
              key={q.id}
              onClick={() => toggleQuest(q.id, q.xp)}
              className={`flex items-center gap-3.5 py-3 px-3.5 mb-2 border-[1.5px] cursor-pointer transition-all duration-200 select-none ${theme === 'kawaii' ? 'rounded-none' : 'rounded-[14px]'} ${
                isDone 
                  ? (theme === 'kawaii' ? 'bg-[#FDE8E8] border-[#F4B8C1]' : 'bg-[#F0FFF8] border-[#9EECD0]') 
                  : (theme === 'kawaii' ? 'bg-white border-[#F4B8C1] shadow-[2px_2px_0_rgba(244,184,193,0.3)] hover:-translate-y-[2px]' : 'bg-white border-cream-dark hover:border-blue-light hover:translate-x-[3px]')
              }`}
            >
              <div className="text-[22px]">{q.emoji}</div>
              <div className={`flex-1 text-[13px] ${theme === 'kawaii' ? 'font-bold font-sans' : 'font-semibold'} ${isDone ? `line-through ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-60' : 'text-text-muted'}` : (theme === 'kawaii' ? 'text-[#5A3A3A]' : 'text-text-dark')}`}>
                {q.text}
              </div>
              <div className={`font-extrabold text-[12px] py-[3px] px-2.5 ${theme === 'kawaii' ? 'font-sans rounded-none' : 'font-baloo rounded-pill'} ${
                isDone ? (theme === 'kawaii' ? 'bg-[#7DDFC3] text-[#5A3A3A]' : 'bg-[#DFFFF0] text-[#0F7A4E]') : (theme === 'kawaii' ? 'bg-[#FDE8E8] text-[#5A3A3A]' : 'bg-blue-pale text-blue')
              }`}>
                +{q.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
