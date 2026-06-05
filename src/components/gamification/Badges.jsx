import React from 'react';
import { useStore } from '../../store/useStore';
import { Card } from '../ui/Card';

const BADGE_LIST = [
  { id: 'fresh', emoji: '🌱', name: 'Fresh Start', title: 'You showed up! Day 1 done.', alwaysUnlocked: true },
  { id: 'streak3', emoji: '🔥', name: 'On Fire 3-Day Streak', title: 'Maintain a 3-day streak' },
  { id: 'streak7', emoji: '🌟', name: 'Star Streak 7 Days', title: 'Maintain a 7-day streak' },
  { id: 's500', emoji: '⚡', name: 'Lightning 500+ Mock', title: 'Score 500+ in a mock test' },
  { id: 's550', emoji: '🚀', name: 'Rocket 550+ Mock', title: 'Score 550+ in a mock test' },
  { id: 's600', emoji: '👑', name: 'Queen 600+ Legend!', title: 'Score 600+ — THE GOAL!' },
  { id: 'bio', emoji: '🌿', name: 'Bio Beast 340+ Bio', title: 'Score 340+ in Biology' },
  { id: 'allq', emoji: '✨', name: 'Quest Complete!', title: 'Complete all 5 daily quests' }
];

export const Badges = () => {
  const badges = useStore((state) => state.badges);

  return (
    <Card title="🏅 Achievements" sub="Unlock badges as you grind! Tap to see what each needs 🔓">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5 mt-1.5">
        {BADGE_LIST.map((b) => {
          const unlocked = b.alwaysUnlocked || badges[b.id];
          return (
            <div 
              key={b.id}
              title={b.title}
              className={`rounded-[14px] px-2.5 py-3.5 text-center border-2 transition-all duration-200 cursor-pointer ${
                unlocked 
                  ? 'bg-blue-pale border-blue-light hover:-translate-y-[2px]' 
                  : 'bg-cream-dark border-transparent'
              }`}
            >
              <div className={`text-[28px] ${!unlocked ? 'grayscale opacity-40' : ''}`}>
                {b.emoji}
              </div>
              <div className={`text-[11px] font-bold mt-1.5 leading-[1.3] ${unlocked ? 'text-text-dark' : 'text-text-muted'}`}>
                {b.name}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
