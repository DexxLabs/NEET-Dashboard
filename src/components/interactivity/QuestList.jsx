import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';

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

  return (
    <Card title="🎯 Daily Quests" sub="Finish all 5 for +100 Bonus XP 🌟">
      <div>
        {QUESTS.map((q) => {
          const isDone = !!doneQuests[q.id];
          return (
            <div 
              key={q.id}
              onClick={() => toggleQuest(q.id, q.xp)}
              className={`flex items-center gap-3.5 py-3 px-3.5 rounded-[14px] mb-2 border-[1.5px] cursor-pointer transition-all duration-200 select-none ${
                isDone 
                  ? 'bg-[#F0FFF8] border-[#9EECD0]' 
                  : 'bg-white border-cream-dark hover:border-blue-light hover:translate-x-[3px]'
              }`}
            >
              <div className="text-[22px]">{q.emoji}</div>
              <div className={`flex-1 text-[13px] font-semibold ${isDone ? 'line-through text-text-muted' : 'text-text-dark'}`}>
                {q.text}
              </div>
              <div className={`font-baloo font-extrabold text-[12px] py-[3px] px-2.5 rounded-pill ${
                isDone ? 'bg-[#DFFFF0] text-[#0F7A4E]' : 'bg-blue-pale text-blue'
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
