import React from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
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
  const theme = useTheme((state) => state.theme);

  return (
    <Card title="🏆 Badges & Achievements" sub="Collect them all!" className="h-full flex flex-col">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5 mt-1.5 flex-1 content-start">
        {BADGE_LIST.map((b) => {
          const unlocked = b.alwaysUnlocked || badges[b.id];
          let containerClass = '';
          
          if (theme === 'kawaii') {
            if (unlocked) {
              containerClass = 'bg-white border-[#7DDFC3] shadow-[2px_2px_0_rgba(125,223,195,0.3)] hover:-translate-y-[2px] rounded-none';
            } else {
              containerClass = 'bg-[#FDE8E8] border-[#F4B8C1] opacity-60 rounded-none';
            }
          } else {
            if (unlocked) {
              containerClass = 'bg-blue-pale border-blue-light hover:-translate-y-[2px] rounded-[14px]';
            } else {
              containerClass = 'bg-cream-dark border-transparent rounded-[14px]';
            }
          }
          
          return (
            <div 
              key={b.id}
              title={b.title}
              className={`h-[110px] w-full px-1 py-2 text-center border-2 transition-all duration-200 cursor-pointer flex flex-col items-center justify-center overflow-hidden ${containerClass}`}
            >
              <div className={`text-[28px] ${!unlocked ? 'grayscale opacity-40' : ''}`}>
                {b.emoji}
              </div>
              <div className={`text-[11px] mt-1.5 leading-[1.3] ${theme === 'kawaii' ? (unlocked ? 'text-[#5A3A3A] font-bold font-sans' : 'text-[#5A3A3A] opacity-70 font-bold font-sans') : (unlocked ? 'text-text-dark font-bold' : 'text-text-muted font-bold')}`}>
                {b.name}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
