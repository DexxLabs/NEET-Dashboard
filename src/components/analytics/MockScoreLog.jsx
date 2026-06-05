import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { getDaysToExam } from '../../utils/dateUtils';

export const MockScoreLog = () => {
  const scores = useStore((state) => state.scores);
  const daysToExam = getDaysToExam();
  
  const daysPassed = Math.max(0, 15 - daysToExam);
  const estimatedTarget = Math.min(620, Math.round(470 + daysPassed * 9.5));

  return (
    <Card title="📈 Mock Score History" sub="Watch yourself climb to 600+ 🚀" className="h-full flex flex-col">
      <div className="mt-4 bg-cream-dark rounded-[14px] py-3.5 px-4 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-[13px] font-bold text-text-mid">🎯 Target Score</div>
          <div className="text-[12px] text-text-muted font-medium">Ultimate Goal</div>
        </div>
        <div className="font-baloo font-extrabold text-[22px] text-blue">600+ / 720</div>
      </div>

      <div className="mt-3 bg-[#F0FFF8] border-[1.5px] border-[#9EECD0] rounded-[14px] py-3 px-4 flex items-center gap-3">
        <div className="flex-1">
          <div className="text-[13px] font-bold text-[#0F7A4E]">🌟 Today's Mini-Goal</div>
          <div className="text-[11px] text-[#2AAB80] font-semibold leading-tight mt-0.5">
            A realistic target for today's mock to keep you on track. Just chase it!
          </div>
        </div>
        <div className="font-baloo font-extrabold text-[22px] text-[#0F7A4E] shrink-0">~{estimatedTarget}</div>
      </div>

      <div className="mt-4">
        {scores.length === 0 ? (
          <div className="text-center p-7 text-text-muted text-[13px] font-semibold">
            🐰 No scores yet!<br/>Log your first mock above!
          </div>
        ) : (
          [...scores].reverse().map((s, idx) => {
            const isGood = s.total >= 600;
            const isMid = s.total >= 500 && s.total < 600;
            const scoreColor = isGood ? 'text-[#0F7A4E]' : isMid ? 'text-[#B05A00]' : 'text-text-muted';
            const pct = Math.round((s.total / 720) * 100);
            const icon = isGood ? '👑' : s.total >= 550 ? '🚀' : '📈';

            return (
              <div key={idx} className="flex items-center gap-2.5 py-2 border-b border-cream-dark last:border-b-0">
                <div className="bg-blue-pale text-blue font-extrabold text-[11px] py-0.5 px-2 rounded-md font-baloo min-w-[44px] text-center">
                  Mock
                </div>
                <div className={`font-baloo font-extrabold text-[18px] flex-1 ${scoreColor}`}>
                  {s.total}<span className="text-[12px] text-text-muted font-medium">/720</span>
                </div>
                <div>
                  <div className="h-1.5 rounded-md bg-cream-dark overflow-hidden w-[80px]">
                    <div className="h-full rounded-md bg-blue-light" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="text-[11px] text-text-muted font-medium mt-0.5">
                    Bio:{s.bio} Phy:{s.phy} Che:{s.che}
                  </div>
                </div>
                <span className="text-[18px]">{icon}</span>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
