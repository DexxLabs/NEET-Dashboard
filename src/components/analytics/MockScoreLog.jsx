import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { getDaysToExam } from '../../utils/dateUtils';

export const MockScoreLog = () => {
  const scores = useStore((state) => state.scores);
  const deleteScore = useStore((state) => state.deleteScore);
  const editScore = useStore((state) => state.editScore);
  const theme = useTheme((state) => state.theme);
  
  const [editingIndex, setEditingIndex] = React.useState(null);
  const [editData, setEditData] = React.useState({ bio: 0, phy: 0, che: 0 });

  const daysToExam = getDaysToExam();
  
  const daysPassed = Math.max(0, 15 - daysToExam);
  const estimatedTarget = Math.min(620, Math.round(470 + daysPassed * 9.5));

  return (
    <Card title="📈 Mock Score History" sub="Watch yourself climb to 600+ 🚀" className="h-full flex flex-col">
      <div className={`mt-4 py-3.5 px-4 flex items-center gap-3 ${theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none shadow-[2px_2px_0_rgba(244,184,193,0.3)]' : 'bg-cream-dark rounded-[14px]'}`}>
        <div className="flex-1">
          <div className={`text-[13px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-mid'}`}>🎯 Target Score</div>
          <div className={`text-[12px] font-medium ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted'}`}>Ultimate Goal</div>
        </div>
        <div className={`font-extrabold text-[22px] ${theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : 'font-baloo text-blue'}`}>600+ / 720</div>
      </div>

      <div className={`mt-3 py-3 px-4 flex items-center gap-3 ${theme === 'kawaii' ? 'bg-white border-2 border-[#7DDFC3] rounded-none shadow-[2px_2px_0_rgba(125,223,195,0.3)]' : 'bg-[#F0FFF8] border-[1.5px] border-[#9EECD0] rounded-[14px]'}`}>
        <div className="flex-1">
          <div className={`text-[13px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-[#0F7A4E]'}`}>🌟 Today's Mini-Goal</div>
          <div className={`text-[11px] font-semibold leading-tight mt-0.5 ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-80 font-sans' : 'text-[#2AAB80]'}`}>
            A realistic target for today's mock to keep you on track. Just chase it!
          </div>
        </div>
        <div className={`font-extrabold text-[22px] shrink-0 ${theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : 'font-baloo text-[#0F7A4E]'}`}>~{estimatedTarget}</div>
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
              <div key={idx} className={`flex flex-col gap-2 py-2.5 border-b last:border-b-0 ${theme === 'kawaii' ? 'border-[#F4B8C1]' : 'border-cream-dark'}`}>
                <div className="flex items-center gap-2.5">
                  <div className={`font-extrabold text-[11px] py-0.5 px-2 min-w-[44px] text-center ${theme === 'kawaii' ? 'bg-[#FDE8E8] text-[#5A3A3A] border border-[#F4B8C1] rounded-none font-sans' : 'bg-blue-pale text-blue rounded-md font-baloo'}`}>
                    Mock
                  </div>
                  <div className={`font-extrabold text-[18px] flex-1 ${theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : `font-baloo ${scoreColor}`}`}>
                    {isEditing ? (Number(editData.bio) + Number(editData.phy) + Number(editData.che)) : s.total}
                    <span className={`text-[12px] font-medium ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted'}`}>/720</span>
                  </div>
                  
                  {!isEditing ? (
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => {
                          setEditingIndex(actualIndex);
                          setEditData({ bio: s.bio, phy: s.phy, che: s.che });
                        }}
                        className={`text-[11px] font-bold uppercase transition-colors ${theme === 'kawaii' ? 'text-[#5A3A3A] hover:opacity-70 font-sans underline' : 'text-blue hover:text-blue-light'}`}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this score?")) {
                            deleteScore(actualIndex);
                          }
                        }}
                        className={`text-[11px] font-bold uppercase transition-colors ${theme === 'kawaii' ? 'text-[#5A3A3A] hover:opacity-70 font-sans underline' : 'text-coral hover:text-[#A03D20]'}`}
                      >
                        Del
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={handleSave} className={`text-[11px] font-bold uppercase px-2 py-1 ${theme === 'kawaii' ? 'bg-white text-[#5A3A3A] border border-[#7DDFC3] rounded-none font-sans' : 'text-[#0F7A4E] bg-[#F0FFF8] rounded'}`}>Save</button>
                      <button onClick={() => setEditingIndex(null)} className={`text-[11px] font-bold uppercase px-2 py-1 ${theme === 'kawaii' ? 'bg-[#FDE8E8] text-[#5A3A3A] border border-[#F4B8C1] rounded-none font-sans' : 'text-text-muted bg-cream-dark rounded'}`}>Cancel</button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <div className={`h-1.5 overflow-hidden flex-1 max-w-[120px] p-[1px] ${theme === 'kawaii' ? 'bg-[#FDE8E8] border border-[#F4B8C1] rounded-none' : 'bg-cream-dark rounded-md'}`}>
                    <div className={`h-full ${theme === 'kawaii' ? 'bg-[#7DDFC3] rounded-none' : 'bg-blue-light rounded-md'}`} style={{ width: `${pct}%` }} />
                  </div>
                  
                  {isEditing ? (
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark'}`}>
                      Bio: <input type="number" value={editData.bio} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))} className={`w-10 px-1 ${theme === 'kawaii' ? 'bg-white border border-[#F4B8C1] rounded-none text-[#5A3A3A]' : 'border border-[#DDD0B8] rounded'}`} />
                      Phy: <input type="number" value={editData.phy} onChange={e => setEditData(d => ({ ...d, phy: e.target.value }))} className={`w-10 px-1 ${theme === 'kawaii' ? 'bg-white border border-[#F4B8C1] rounded-none text-[#5A3A3A]' : 'border border-[#DDD0B8] rounded'}`} />
                      Che: <input type="number" value={editData.che} onChange={e => setEditData(d => ({ ...d, che: e.target.value }))} className={`w-10 px-1 ${theme === 'kawaii' ? 'bg-white border border-[#F4B8C1] rounded-none text-[#5A3A3A]' : 'border border-[#DDD0B8] rounded'}`} />
                    </div>
                  ) : (
                    <div className={`text-[11px] font-medium flex-1 ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted'}`}>
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
