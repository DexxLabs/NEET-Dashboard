import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { getDaysToExam } from '../../utils/dateUtils';

export const MockScoreLog = () => {
  const scores = useStore((state) => state.scores);
  const deleteScore = useStore((state) => state.deleteScore);
  const editScore = useStore((state) => state.editScore);
  
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editData, setEditData] = React.useState({ bio: 0, phy: 0, che: 0 });

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
            const actualIndex = scores.length - 1 - idx;
            const isEditing = editingIndex === actualIndex;

            const isGood = s.total >= 600;
            const isMid = s.total >= 500 && s.total < 600;
            const scoreColor = isGood ? 'text-[#0F7A4E]' : isMid ? 'text-[#B05A00]' : 'text-text-muted';
            const pct = Math.round((s.total / 720) * 100);
            const icon = isGood ? '👑' : s.total >= 550 ? '🚀' : '📈';

            const handleSave = () => {
              editScore(actualIndex, editData.bio, editData.phy, editData.che);
              setEditingIndex(null);
            };

            return (
              <div key={idx} className="flex flex-col gap-2 py-2.5 border-b border-cream-dark last:border-b-0">
                <div className="flex items-center gap-2.5">
                  <div className="bg-blue-pale text-blue font-extrabold text-[11px] py-0.5 px-2 rounded-md font-baloo min-w-[44px] text-center">
                    Mock
                  </div>
                  <div className={`font-baloo font-extrabold text-[18px] flex-1 ${scoreColor}`}>
                    {isEditing ? (Number(editData.bio) + Number(editData.phy) + Number(editData.che)) : s.total}
                    <span className="text-[12px] text-text-muted font-medium">/720</span>
                  </div>
                  
                  {!isEditing ? (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setEditingIndex(actualIndex);
                          setEditData({ bio: s.bio, phy: s.phy, che: s.che });
                        }}
                        className="text-[11px] text-blue hover:text-blue-light font-bold uppercase transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this score?")) {
                            deleteScore(actualIndex);
                          }
                        }}
                        className="text-[11px] text-coral hover:text-[#A03D20] font-bold uppercase transition-colors"
                      >
                        Del
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={handleSave} className="text-[11px] text-[#0F7A4E] font-bold uppercase bg-[#F0FFF8] px-2 py-1 rounded">Save</button>
                      <button onClick={() => setEditingIndex(null)} className="text-[11px] text-text-muted font-bold uppercase bg-cream-dark px-2 py-1 rounded">Cancel</button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-1.5 rounded-md bg-cream-dark overflow-hidden flex-1 max-w-[120px]">
                    <div className="h-full rounded-md bg-blue-light" style={{ width: `${pct}%` }} />
                  </div>
                  
                  {isEditing ? (
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-text-dark">
                      Bio: <input type="number" value={editData.bio} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))} className="w-10 border border-[#DDD0B8] rounded px-1" />
                      Phy: <input type="number" value={editData.phy} onChange={e => setEditData(d => ({ ...d, phy: e.target.value }))} className="w-10 border border-[#DDD0B8] rounded px-1" />
                      Che: <input type="number" value={editData.che} onChange={e => setEditData(d => ({ ...d, che: e.target.value }))} className="w-10 border border-[#DDD0B8] rounded px-1" />
                    </div>
                  ) : (
                    <div className="text-[11px] text-text-muted font-medium flex-1">
                      Bio:{s.bio} Phy:{s.phy} Che:{s.che}
                    </div>
                  )}
                  {!isEditing && <span className="text-[16px]">{icon}</span>}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
