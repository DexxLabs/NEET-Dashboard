import React, { useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Toast } from './components/layout/Toast';
import { CountdownStrip } from './components/gamification/CountdownStrip';
import { XPCard } from './components/gamification/XPCard';
import { StatCard } from './components/analytics/StatCard';
import { DailyGoals } from './components/schedule/DailyGoals';
import { StreakCard } from './components/gamification/StreakCard';
import { QuestList } from './components/interactivity/QuestList';
import { SubjectProgress } from './components/analytics/SubjectProgress';
import { MockScoreLog } from './components/analytics/MockScoreLog';
import { Badges } from './components/gamification/Badges';
import { PowerUps } from './components/interactivity/PowerUps';
import { SyllabusChecklist } from './components/analytics/SyllabusChecklist';
import { CustomCursor } from './components/ui/CustomCursor';
import { useStore } from './store/useStore';

function App() {
  const checkDayShift = useStore(state => state.checkDayShift);

  useEffect(() => {
    checkDayShift();
    const interval = setInterval(() => {
      checkDayShift();
    }, 60000);
    return () => clearInterval(interval);
  }, [checkDayShift]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CustomCursor />
      {/* Cute floating elements */}
      <div className="fixed top-28 left-[5%] text-5xl opacity-[0.15] animate-[bounce_6s_infinite] pointer-events-none z-0 select-none">🌸</div>
      <div className="fixed bottom-32 left-[10%] text-6xl opacity-[0.15] animate-[pulse_4s_infinite] pointer-events-none z-0 select-none">✨</div>
      <div className="fixed top-40 right-[8%] text-4xl opacity-[0.2] animate-[bounce_7s_infinite] pointer-events-none z-0 select-none" style={{ animationDelay: '1s' }}>🌙</div>
      <div className="fixed bottom-40 right-[15%] text-5xl opacity-[0.15] animate-[pulse_5s_infinite] pointer-events-none z-0 select-none" style={{ animationDelay: '2s' }}>⭐</div>
      <div className="fixed top-[40%] left-[2%] text-4xl opacity-[0.15] animate-[bounce_8s_infinite] pointer-events-none z-0 select-none" style={{ animationDelay: '3s' }}>📚</div>

      <Header />
      <CountdownStrip />
      
      <main className="w-full px-4 md:px-10 py-6 md:py-10 grid gap-8 md:gap-12 relative z-10">
        <XPCard />
        <StatCard />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <DailyGoals />
          <div className="flex flex-col gap-8 md:gap-10">
            <StreakCard />
            <QuestList />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <SubjectProgress />
          <MockScoreLog />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <Badges />
          <PowerUps />
        </div>

        <SyllabusChecklist />
      </main>

      <div className="text-center p-6 text-text-muted text-[13px] font-semibold pb-12">
        made with 💛 for <strong>Nitu</strong> · <span className="text-coral">You are going to absolutely smash that 600+</span> 🐰✨
      </div>

      <Toast />
    </div>
  );
}

export default App;
