import React from 'react';
import { Card } from '../ui/Card';
import { TimeBlock } from './TimeBlock';

const BLOCKS = [
  { id: 'b1', time: '6:00–7:30', bgClass: 'bg-[#F0FFF8] border-[1.5px] border-[#9EECD0]', name: '🌿 Biology — Chapter Revision', task: 'Genetics + Evolution · 30 NCERT MCQs · underline key lines', xp: 50 },
  { id: 'b2', time: '7:30–7:45', bgClass: 'bg-cream-dark border-[1.5px] border-[#E8D8C0]', name: '☕ Break + Stretch', task: 'Eyes off screen — walk, eat light, breathe!', xp: 5 },
  { id: 'b3', time: '7:45–10:00', bgClass: 'bg-blue-pale border-[1.5px] border-[#B5C8FF]', name: '⚡ Physics — Mechanics', task: 'NLM + Work-Energy · 20 Qs with 2-min timer each · mark doubts', xp: 80 },
  { id: 'b4', time: '10:00–11:00', bgClass: 'bg-cream-dark border-[1.5px] border-[#E8D8C0]', name: '🍱 Lunch Break', task: 'Eat properly · glance formula sheet (optional, no pressure)', xp: 5 },
  { id: 'b5', time: '11:00–1:30', bgClass: 'bg-[#FFF3EE] border-[1.5px] border-[#FFD0B8]', name: '🧪 Chemistry — Organic', task: 'GOC + Hydrocarbons · 25 MCQs · write reaction steps', xp: 80 },
  { id: 'b6', time: '1:30–2:30', bgClass: 'bg-blue-pale border-[1.5px] border-[#B5C8FF]', name: '⚡ Physics — Waves & Optics', task: '15 Qs timed sprint · identify which chapter eats most time', xp: 50 },
  { id: 'b7', time: '2:30–3:00', bgClass: 'bg-cream-dark border-[1.5px] border-[#E8D8C0]', name: '😴 Power Nap / Eyes Rest', task: '15–20 min only. Set alarm. No scrolling after!', xp: 5 },
  { id: 'b8', time: '3:00–6:00', bgClass: 'bg-[#FFF8E0] border-[1.5px] border-yellow', name: '📝 Full Mock Test', task: 'Real exam conditions · phone away · log scores below after', xp: 150 },
  { id: 'b9', time: '6:00–8:00', bgClass: 'bg-[#F0FFF8] border-[1.5px] border-[#9EECD0]', name: '🌿 Night Revision — Mistakes', task: 'Review mock errors · flashcards for weak areas · sleep by 10:30', xp: 60 }
];

export const ScheduleList = () => {
  return (
    <Card title="⏰ Today's Game Plan" sub="Tap the box when done — every block = XP earned ✅">
      {BLOCKS.map(b => <TimeBlock key={b.id} {...b} />)}
    </Card>
  );
};
