import React from 'react';
import { Card } from '../ui/Card';

const POWERUPS = [
  { emoji: '⚡', title: 'Physics: The 2-Minute Rule', body: 'Set a timer per question. If stuck after 2 min, skip and return. This alone saves 15–20 marks by cutting time sink losses on exam day.' },
  { emoji: '🧪', title: 'Chemistry: Fastest Marks Available', body: 'Chemistry rewards effort the fastest. Each solid hour of Organic + Inorganic practice can directly add 10–15 marks. Best ROI subject for the next 10 days.' },
  { emoji: '🌿', title: 'Biology: Protect the Lead', body: 'You\'re already strong. 60 min revision/day is enough — read NCERT lines carefully. Assertion-reason traps and diagram-based Qs are where marks slip.' },
  { emoji: '⏰', title: 'Time Block = Zero Decision Fatigue', body: 'Don\'t decide what to study — the schedule already did. Just open the block and start. Hesitation eats more prep time than any hard question ever will.' }
];

export const PowerUps = () => {
  return (
    <Card title="💡 Strategy Power-ups" sub="Nitu's personalized edge — read daily before you start">
      {POWERUPS.map((p, idx) => (
        <div key={idx} className="bg-blue-pale rounded-[14px] py-3.5 px-4 mb-2.5 border-l-[4px] border-l-blue-light flex gap-3 items-start">
          <div className="text-[20px] shrink-0">{p.emoji}</div>
          <div>
            <div className="font-bold text-[14px] text-blue mb-0.5">{p.title}</div>
            <div className="text-[12px] text-text-mid font-medium leading-[1.5]">{p.body}</div>
          </div>
        </div>
      ))}
    </Card>
  );
};
