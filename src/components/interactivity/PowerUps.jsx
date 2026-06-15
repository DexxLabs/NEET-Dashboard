import React from 'react';
import { Card } from '../ui/Card';
import { useTheme } from '../../store/useTheme';

const POWERUPS = [
  { emoji: '⚡', title: 'Physics: The 2-Minute Rule', body: 'Set a timer per question. If stuck after 2 min, skip and return. This alone saves 15–20 marks by cutting time sink losses on exam day.' },
  { emoji: '🧪', title: 'Chemistry: Fastest Marks Available', body: 'Chemistry rewards effort the fastest. Each solid hour of Organic + Inorganic practice can directly add 10–15 marks. Best ROI subject for the next 10 days.' },
  { emoji: '🌿', title: 'Biology: Protect the Lead', body: 'You\'re already strong. 60 min revision/day is enough — read NCERT lines carefully. Assertion-reason traps and diagram-based Qs are where marks slip.' },
  { emoji: '⏰', title: 'Time Block = Zero Decision Fatigue', body: 'Don\'t decide what to study — the schedule already did. Just open the block and start. Hesitation eats more prep time than any hard question ever will.' }
];

export const PowerUps = () => {
  const theme = useTheme((state) => state.theme);

  return (
    <Card title="⚡ Power-Ups Shop" sub="Spend XP to unlock perks" className="h-full flex flex-col">
      <div className="flex flex-col gap-3 flex-1 justify-center">
      {POWERUPS.map((p, idx) => (
        <div
          key={idx}
          className={`py-3.5 px-4 mb-2.5 flex gap-3 items-start ${theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] border-l-8 border-l-[#7DDFC3] rounded-none' : theme === 'cozy' ? '' : 'bg-blue-pale rounded-[14px] border-l-[4px] border-l-blue-light'}`}
          style={theme === 'cozy' ? { background: 'rgba(255,255,255,0.80)', borderRadius: '6px', borderLeft: '3px solid #B5302A', border: '1.5px solid #D8CEBC', borderLeftWidth: '3px', borderLeftColor: '#B5302A', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
        >
          <div className="text-[20px] shrink-0">{p.emoji}</div>
          <div>
            <div
              className={`font-bold text-[14px] mb-0.5 ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : theme === 'cozy' ? '' : 'text-blue'}`}
              style={theme === 'cozy' ? { color: '#B5302A', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
            >{p.title}</div>
            <div
              className={`text-[12px] font-medium leading-[1.5] ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-80 font-sans' : theme === 'cozy' ? '' : 'text-text-mid'}`}
              style={theme === 'cozy' ? { color: 'rgba(58,46,42,0.70)', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
            >{p.body}</div>
          </div>
        </div>
      ))}
      </div>
    </Card>
  );
};
