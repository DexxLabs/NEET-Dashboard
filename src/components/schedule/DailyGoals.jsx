import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { SYLLABUS } from '../../utils/SyllabusData';
import { ChapterSelect } from '../ui/ChapterSelect';
import { MOCK_TEST_DAILY_GOAL, MOCK_TEST_XP_PER_TEST, MOCK_TEST_BONUS_XP } from '../../utils/constants';

const cz = (style) => ({ fontFamily: "'Courier Prime','Courier New',monospace", ...style });

// ── Mock Test Counter ─────────────────────────────────────────────────────────
const MockTestCounter = ({ theme }) => {
  const mockTestCount   = useStore((s) => s.mockTestCount);
  const incrementMockTest = useStore((s) => s.incrementMockTest);
  const decrementMockTest = useStore((s) => s.decrementMockTest);

  const isCozy   = theme === 'cozy';
  const isKawaii = theme === 'kawaii';

  const goal        = MOCK_TEST_DAILY_GOAL;
  const rawProgress = mockTestCount / goal;
  const progress    = Math.min(rawProgress, 1);
  const isOnFire    = mockTestCount >= goal;
  const isExceeded  = mockTestCount > goal;

  // pulse animation trigger on count change
  const [pulse, setPulse] = useState(false);
  const prevCount = useRef(mockTestCount);
  useEffect(() => {
    if (mockTestCount !== prevCount.current) {
      prevCount.current = mockTestCount;
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 400);
      return () => clearTimeout(t);
    }
  }, [mockTestCount]);

  // ── XP label
  const xpPerTest = isExceeded
    ? MOCK_TEST_XP_PER_TEST + MOCK_TEST_BONUS_XP
    : MOCK_TEST_XP_PER_TEST;

  // ── Theming ─────────────────────────────────────────────────────
  let cardBg, cardBorder, btnBase, btnMinus, btnPlus, countColor, labelColor, barBg, barFill, barFireFill;

  if (isCozy) {
    cardBg       = isOnFire ? 'rgba(181,48,42,0.07)' : 'rgba(255,255,255,0.82)';
    cardBorder   = isOnFire ? '#B5302A' : '#D8CEBC';
    btnBase      = { fontFamily: "'Courier Prime','Courier New',monospace", border: '1.5px solid #D8CEBC', borderRadius: '4px', background: 'rgba(255,255,255,0.9)', color: '#3A2E2A', fontWeight: 700, fontSize: 18, cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' };
    countColor   = isOnFire ? '#B5302A' : '#3A2E2A';
    labelColor   = 'rgba(58,46,42,0.6)';
    barBg        = '#EDE8DE';
    barFill      = '#B5302A';
    barFireFill  = '#FF6B35';
  } else if (isKawaii) {
    cardBg       = isOnFire ? '#FDE8E8' : 'white';
    cardBorder   = '#F4B8C1';
    btnBase      = { border: '2px solid #5A3A3A', background: 'white', color: '#5A3A3A', fontWeight: 900, fontSize: 18, cursor: 'pointer', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 0 };
    countColor   = isOnFire ? '#E85D8A' : '#5A3A3A';
    labelColor   = 'rgba(90,58,58,0.65)';
    barBg        = '#FDE8E8';
    barFill      = '#7DDFC3';
    barFireFill  = '#F4B8C1';
  } else {
    // default
    cardBg       = isOnFire ? 'linear-gradient(135deg,#FFF8E0 0%,#FFF3CC 100%)' : 'linear-gradient(135deg,#FFF8E0 0%,#FFFDF5 100%)';
    cardBorder   = isOnFire ? '#FFB800' : '#FFD95A';
    btnBase      = { border: '2px solid #DDD0B8', borderRadius: 10, background: 'white', color: '#3A2E2A', fontWeight: 900, fontSize: 18, cursor: 'pointer', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s' };
    countColor   = isOnFire ? '#FF6B00' : '#2A2118';
    labelColor   = 'rgba(58,46,42,0.55)';
    barBg        = 'rgba(0,0,0,0.07)';
    barFill      = '#FFB800';
    barFireFill  = 'linear-gradient(90deg, #FF6B00, #FF4500)';
  }

  const progressBarFill = isOnFire
    ? (isCozy ? barFireFill : isKawaii ? barFireFill : 'linear-gradient(90deg,#FF6B00,#FF4500)')
    : barFill;

  return (
    <div
      style={{
        background: cardBg,
        border: `2px solid ${cardBorder}`,
        borderRadius: isKawaii ? 0 : isCozy ? 6 : 16,
        padding: '14px 16px 12px',
        marginBottom: 12,
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Fire shimmer overlay when on-fire */}
      {isOnFire && !isCozy && !isKawaii && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(135deg, rgba(255,107,0,0.06) 0%, transparent 60%)',
          animation: 'pulseGlow 2s ease-in-out infinite alternate',
        }} />
      )}

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{
            fontWeight: 800, fontSize: 14,
            color: countColor,
            fontFamily: isCozy ? "'Courier Prime','Courier New',monospace" : isKawaii ? 'sans-serif' : "'Baloo 2', sans-serif",
            letterSpacing: 0.2,
          }}>
            {isOnFire ? '🔥 Full Mock Tests' : '📝 Full Mock Tests'}
          </div>
          <div style={{
            fontSize: 11, fontWeight: 600, marginTop: 1,
            color: labelColor,
            fontFamily: isCozy ? "'Courier Prime','Courier New',monospace" : 'inherit',
          }}>
            {isOnFire
              ? isExceeded
                ? `🔥 BEYOND GOAL! +${xpPerTest} XP each (Bonus!)`
                : `🎯 Goal reached! You're incredible!`
              : `Goal: ${goal} mocks · +${xpPerTest} XP each`}
          </div>
        </div>

        {/* XP badge */}
        <div style={{
          fontWeight: 800, fontSize: 11,
          background: isOnFire
            ? (isCozy ? '#B5302A' : isKawaii ? '#7DDFC3' : 'linear-gradient(135deg,#FF6B00,#FF4500)')
            : (isCozy ? '#F5F0E8' : isKawaii ? '#FDE8E8' : '#FFF3CC'),
          color: isOnFire
            ? (isCozy ? '#F5F0E8' : isKawaii ? '#5A3A3A' : 'white')
            : (isCozy ? '#B5302A' : isKawaii ? '#5A3A3A' : '#B8860B'),
          border: isOnFire ? 'none' : (isCozy ? '1px solid #D8CEBC' : isKawaii ? '2px solid #F4B8C1' : '1.5px solid #FFD95A'),
          borderRadius: isKawaii ? 0 : isCozy ? 4 : 20,
          padding: '3px 10px',
          fontFamily: isCozy ? "'Courier Prime','Courier New',monospace" : isKawaii ? 'sans-serif' : "'Baloo 2', sans-serif",
          transition: 'all 0.3s',
        }}>
          +{xpPerTest} XP
        </div>
      </div>

      {/* Counter row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 10 }}>
        {/* Minus button */}
        <button
          onClick={decrementMockTest}
          disabled={mockTestCount === 0}
          style={{
            ...btnBase,
            opacity: mockTestCount === 0 ? 0.35 : 1,
            color: isCozy ? '#B5302A' : isKawaii ? '#5A3A3A' : '#FF6B00',
          }}
          aria-label="Remove one mock test"
        >
          −
        </button>

        {/* Count display */}
        <div style={{
          flex: 1, textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <span style={{
            fontSize: 40, fontWeight: 900,
            color: countColor,
            fontFamily: isCozy ? "'Courier Prime','Courier New',monospace" : isKawaii ? 'sans-serif' : "'Baloo 2', sans-serif",
            lineHeight: 1,
            transform: pulse ? 'scale(1.18)' : 'scale(1)',
            display: 'inline-block',
            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            textShadow: isOnFire && !isCozy && !isKawaii ? '0 0 20px rgba(255,107,0,0.4)' : 'none',
          }}>
            {mockTestCount}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 700,
            color: labelColor,
            marginTop: 2,
            fontFamily: isCozy ? "'Courier Prime','Courier New',monospace" : 'inherit',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}>
            of {goal} goal{isExceeded ? ' 🔥' : ''}
          </span>
        </div>

        {/* Plus button */}
        <button
          onClick={incrementMockTest}
          style={{
            ...btnBase,
            background: isOnFire
              ? (isCozy ? '#B5302A' : isKawaii ? '#7DDFC3' : 'linear-gradient(135deg,#FF6B00,#FF4500)')
              : (isCozy ? 'rgba(255,255,255,0.9)' : isKawaii ? 'white' : 'white'),
            color: isOnFire
              ? (isCozy ? 'white' : isKawaii ? '#5A3A3A' : 'white')
              : (isCozy ? '#3A2E2A' : isKawaii ? '#5A3A3A' : '#FF6B00'),
            border: isOnFire && !isCozy && !isKawaii ? '2px solid transparent' : btnBase.border,
            boxShadow: isOnFire && !isCozy && !isKawaii ? '0 4px 14px rgba(255,107,0,0.4)' : 'none',
          }}
          aria-label="Add one mock test"
        >
          +
        </button>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{
          height: 8,
          borderRadius: 99,
          background: barBg,
          overflow: 'visible',
          position: 'relative',
        }}>
          <div
            style={{
              height: '100%',
              borderRadius: 99,
              width: `${Math.min(progress * 100, 100)}%`,
              background: typeof progressBarFill === 'string' && progressBarFill.startsWith('linear')
                ? progressBarFill
                : progressBarFill,
              transition: 'width 0.5s cubic-bezier(0.34,1.56,0.64,1), background 0.4s ease',
              boxShadow: isOnFire ? '0 0 8px rgba(255,107,0,0.5)' : 'none',
              position: 'relative',
            }}
          >
            {/* Animated shimmer on the bar when on fire */}
            {isOnFire && !isCozy && (
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.4s linear infinite',
                borderRadius: 99,
              }} />
            )}
          </div>
        </div>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          marginTop: 4, fontSize: 10, fontWeight: 700,
          color: labelColor,
          fontFamily: isCozy ? "'Courier Prime','Courier New',monospace" : 'inherit',
        }}>
          <span>{mockTestCount} done</span>
          {isExceeded && (
            <span style={{ color: isCozy ? '#B5302A' : isKawaii ? '#E85D8A' : '#FF6B00', fontWeight: 800 }}>
              +{mockTestCount - goal} BEYOND GOAL 🔥
            </span>
          )}
          <span>Goal: {goal}</span>
        </div>
      </div>
    </div>
  );
};

// ── Main DailyGoals ───────────────────────────────────────────────────────────
export const DailyGoals = () => {
  const dailyTasks = useStore((state) => state.dailyTasks);
  const completedChapters = useStore((state) => state.completedChapters);
  const toggleDailyTask = useStore((state) => state.toggleDailyTask);
  const updateDailyTask = useStore((state) => state.updateDailyTask);
  const theme = useTheme(state => state.theme);
  const isCozy = theme === 'cozy';

  return (
    <Card title="⏰ Today's Goals" sub="Mock tests on top · Select chapters & PYQs, then tap the box when done ✅">
      {/* ── Keyframe styles injected once ── */}
      <style>{`
        @keyframes pulseGlow {
          from { opacity: 0.6; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="flex flex-col gap-3">
        {/* ── Mock test counter always first ── */}
        <MockTestCounter theme={theme} />

        {/* ── Rest of daily tasks (no mock test row anymore) ── */}
        {dailyTasks.map((task) => {
          const isDone = task.done;

          let bgClass = task.subject === 'Physics' ? 'bg-blue-pale border-blue-light/50'
            : task.subject === 'Chemistry' ? 'bg-[#FFF3EE] border-[#FFD0B8]'
            : task.subject === 'Self Care' ? 'bg-[#FFF0F5] border-[#FFD6E8]'
            : 'bg-[#F0FFF8] border-[#9EECD0]';

          if (theme === 'kawaii') bgClass = isDone ? 'bg-[#FDE8E8] border-[#F4B8C1]' : 'bg-white border-[#F4B8C1] shadow-[2px_2px_0_rgba(244,184,193,0.3)]';

          const weightMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
          let sortedChapters = [];
          if (SYLLABUS[task.subject]) {
            sortedChapters = [...SYLLABUS[task.subject]].sort((a, b) => weightMap[b.weight] - weightMap[a.weight]);
          }
          const hasPicker = sortedChapters.length > 0;

          const rowStyle = isCozy
            ? { background: isDone ? '#EDE8DE' : 'rgba(255,255,255,0.82)', border: '1.5px solid #D8CEBC', borderRadius: '6px', opacity: isDone ? 0.7 : 1 }
            : {};

          return (
            <div
              key={task.id}
              className={`py-3 px-4 relative border-[1.5px] transition-all duration-200 ${isCozy ? '' : `${theme === 'kawaii' ? 'rounded-none' : 'rounded-xl'} ${bgClass} ${isDone ? 'opacity-60' : ''}`}`}
              style={rowStyle}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div
                    className={`font-bold text-[14px] ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark') : ''}`}
                    style={isCozy ? cz({ color: '#3A2E2A' }) : {}}
                  >{task.name}</div>
                  {isDone && hasPicker && task.chapterId && (
                    <div className={`text-[11px] font-semibold mt-0.5 pr-10 leading-tight ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-80' : 'text-text-mid') : ''}`} style={isCozy ? cz({ color: 'rgba(58,46,42,0.6)' }) : {}}>
                      {sortedChapters.find(c => c.id === task.chapterId)?.name} • {task.pyqs || 0} PYQs
                    </div>
                  )}
                  {isDone && !hasPicker && (
                    <div className={`text-[11px] font-semibold mt-0.5 pr-10 leading-tight ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-80' : 'text-text-mid') : ''}`} style={isCozy ? cz({ color: 'rgba(58,46,42,0.6)' }) : {}}>Completed 🚀</div>
                  )}
                </div>

                <div
                  onClick={() => toggleDailyTask(task.id, task.xp)}
                  className={`w-7 h-7 flex items-center justify-center text-[14px] transition-all duration-200 shrink-0 cursor-pointer select-none ${!isCozy ? `border-2 ${theme === 'kawaii' ? 'rounded-none' : 'rounded-lg'}` : ''} ${!isCozy ? (isDone
                    ? (theme === 'kawaii' ? 'bg-[#7DDFC3] border-[#5A3A3A] text-[#5A3A3A]' : 'bg-[#3ECFA0] border-[#2AAB80] text-white')
                    : (theme === 'kawaii' ? 'bg-white border-[#5A3A3A] hover:bg-[#FDE8E8] text-transparent hover:text-transparent' : 'bg-white border-[#DDD0B8] hover:border-blue-light text-transparent hover:text-blue-light/50')) : ''}`}
                  style={isCozy ? {
                    border: `1.5px solid ${isDone ? '#B5302A' : '#D8CEBC'}`,
                    borderRadius: '50%',
                    background: isDone ? '#B5302A' : 'rgba(255,255,255,0.9)',
                    color: isDone ? '#F5F0E8' : 'transparent',
                  } : {}}
                >✓</div>
              </div>

              {hasPicker && !isDone && (
                <div className="flex flex-col gap-2.5 mt-2.5 pr-10">
                  <ChapterSelect
                    value={task.chapterId}
                    onChange={(val) => updateDailyTask(task.id, { chapterId: val })}
                    options={sortedChapters}
                    completedMap={completedChapters}
                  />
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      value={task.pyqs || ''}
                      onChange={(e) => updateDailyTask(task.id, { pyqs: e.target.value })}
                      className={`border-2 py-1 px-2 text-[12px] font-bold outline-none w-[64px] text-center transition-colors ${theme === 'kawaii' ? 'bg-white border-[#F4B8C1] rounded-none text-[#5A3A3A] focus:border-[#5A3A3A]' : isCozy ? '' : 'bg-white border-[#DDD0B8] rounded-lg text-text-dark focus:border-blue-light'}`}
                      style={isCozy ? cz({ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #D8CEBC', borderRadius: '4px', color: '#3A2E2A' }) : {}}
                    />
                    <span className={`text-[11px] font-bold uppercase tracking-wide ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A]' : 'text-text-muted') : ''}`} style={isCozy ? cz({ color: 'rgba(58,46,42,0.6)' }) : {}}>Target PYQs / Qs</span>
                  </div>
                </div>
              )}

              <div
                className={`absolute top-3 right-12 text-[11px] font-extrabold ${!isCozy ? (theme === 'kawaii' ? 'text-[#7DDFC3] font-sans' : 'text-yellow-deep font-baloo') : ''}`}
                style={isCozy ? cz({ color: '#B5302A' }) : {}}
              >
                +{task.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
