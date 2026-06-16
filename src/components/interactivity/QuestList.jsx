import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { MOCK_TEST_DAILY_GOAL } from '../../utils/constants';

const QUESTS = [
  { id: 'q1', emoji: '📵', text: 'No phone during active study blocks', xp: 50 },
  { id: 'q2', emoji: '📱', text: 'Scrolled fewer than 20 reels today', xp: 80 },
  { id: 'q3', emoji: '🧘‍♀️', text: '10 minutes of deep breathing or stretching', xp: 80 },
  { id: 'q5', emoji: '🌙', text: "Log today's mock scores before 9 PM", xp: 30 }
];

export const QuestList = () => {
  const doneQuests     = useStore((state) => state.doneQuests);
  const toggleQuest    = useStore((state) => state.toggleQuest);
  const mockTestCount  = useStore((state) => state.mockTestCount);
  const theme          = useTheme(state => state.theme);

  const isCozy   = theme === 'cozy';
  const isKawaii = theme === 'kawaii';

  const mockGoalReached  = mockTestCount >= MOCK_TEST_DAILY_GOAL;
  const mockQuestProgress = `${Math.min(mockTestCount, MOCK_TEST_DAILY_GOAL)} / ${MOCK_TEST_DAILY_GOAL}`;

  const allQuests = [
    {
      id: 'q4',
      emoji: mockGoalReached ? '🔥' : '📝',
      text: mockGoalReached
        ? `Crushed ${mockTestCount} mock tests today! Goal was ${MOCK_TEST_DAILY_GOAL} 🔥`
        : `Complete ${MOCK_TEST_DAILY_GOAL} Full Mock Tests today (${mockQuestProgress})`,
      xp: 150,
      isAutoTracked: true,
      autoDone: mockGoalReached,
    },
    ...QUESTS,
  ];

  return (
    <Card title="🎯 Daily Quests" sub="Finish all 5 for +100 Bonus XP 🌟">
      <div>
        {allQuests.map((q) => {
          const isDone = q.isAutoTracked ? q.autoDone : !!doneQuests[q.id];

          let rowClass = '';
          let rowStyle = {};
          let xpStyle  = {};

          if (isCozy) {
            rowStyle = isDone
              ? { background: '#EDE8DE', border: '1.5px solid #D8CEBC', borderRadius: '6px', opacity: 0.75 }
              : { background: 'rgba(255,255,255,0.80)', border: '1.5px solid #D8CEBC', borderRadius: '6px', cursor: q.isAutoTracked ? 'default' : 'pointer' };
            xpStyle = isDone
              ? { background: '#EDE8DE', color: '#8A7A6A', borderRadius: '6px', fontFamily: "'Courier Prime','Courier New',monospace" }
              : { background: '#F5F0E8', color: '#B5302A', border: '1px solid #D8CEBC', borderRadius: '6px', fontFamily: "'Courier Prime','Courier New',monospace" };
          } else if (isKawaii) {
            rowClass = `rounded-none ${isDone ? 'bg-[#FDE8E8] border-[#F4B8C1]' : 'bg-white border-[#F4B8C1] shadow-[2px_2px_0_rgba(244,184,193,0.3)] hover:-translate-y-[2px]'}`;
          } else {
            rowClass = `rounded-[14px] ${isDone ? 'bg-[#F0FFF8] border-[#9EECD0]' : 'bg-white border-cream-dark hover:border-blue-light hover:translate-x-[3px]'}`;
          }

          const extraStyle = q.isAutoTracked && isDone && !isCozy ? {
            background: isKawaii ? '#FDE8E8' : 'linear-gradient(135deg, #FFF8E0 0%, #FFE8CC 100%)',
            borderColor: isKawaii ? '#F4B8C1' : '#FFB800',
          } : {};

          return (
            <div
              key={q.id}
              onClick={() => !q.isAutoTracked && toggleQuest(q.id, q.xp)}
              className={`flex items-center gap-3.5 py-3 px-3.5 mb-2 border-[1.5px] transition-all duration-200 select-none ${!q.isAutoTracked ? 'cursor-pointer' : 'cursor-default'} ${!isCozy ? rowClass : ''}`}
              style={isCozy ? rowStyle : { ...extraStyle }}
            >
              <div className="text-[22px]">{q.emoji}</div>

              <div
                className={`flex-1 text-[13px] ${!isCozy ? (isKawaii ? 'font-bold font-sans' : 'font-semibold') : 'font-mono'} ${isDone && !isCozy ? `line-through ${isKawaii ? 'text-[#5A3A3A] opacity-60' : 'text-text-muted'}` : (!isCozy && (isKawaii ? 'text-[#5A3A3A]' : 'text-text-dark'))}`}
                style={isCozy ? { color: isDone ? 'rgba(58,46,42,0.5)' : '#3A2E2A', textDecoration: isDone ? 'line-through' : 'none', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
              >
                {q.text}
                {q.isAutoTracked && !isDone && (
                  <div style={{ marginTop: 5, height: 4, borderRadius: 99, background: isCozy ? '#EDE8DE' : isKawaii ? '#FDE8E8' : 'rgba(0,0,0,0.07)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      borderRadius: 99,
                      width: `${(mockTestCount / MOCK_TEST_DAILY_GOAL) * 100}%`,
                      background: isCozy ? '#B5302A' : isKawaii ? '#7DDFC3' : '#FFB800',
                      transition: 'width 0.4s ease',
                    }} />
                  </div>
                )}
              </div>

              <div
                className={`font-extrabold text-[12px] py-[3px] px-2.5 ${!isCozy ? (isKawaii ? 'font-sans rounded-none' : 'font-baloo rounded-pill') : ''} ${!isCozy ? (isDone ? (isKawaii ? 'bg-[#7DDFC3] text-[#5A3A3A]' : 'bg-[#DFFFF0] text-[#0F7A4E]') : (isKawaii ? 'bg-[#FDE8E8] text-[#5A3A3A]' : 'bg-blue-pale text-blue')) : ''}`}
                style={isCozy ? xpStyle : {}}
              >
                +{q.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
