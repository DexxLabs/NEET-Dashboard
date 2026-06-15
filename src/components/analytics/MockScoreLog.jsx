import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { getDaysToExam } from '../../utils/dateUtils';

const cz = (extra = {}) => ({ fontFamily: "'Courier Prime','Courier New',monospace", ...extra });

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
  const isCozy = theme === 'cozy';

  return (
    <Card title="📈 Mock Score History" sub="Watch yourself climb to 600+ 🚀" className="h-full flex flex-col">
      {/* Target score box */}
      <div
        className={`mt-4 py-3.5 px-4 flex items-center gap-3 ${!isCozy ? (theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none shadow-[2px_2px_0_rgba(244,184,193,0.3)]' : 'bg-cream-dark rounded-[14px]') : ''}`}
        style={isCozy ? cz({ background: '#3A2E2A', borderRadius: '6px', padding: '14px 16px' }) : {}}
      >
        <div className="flex-1">
          <div className={`text-[13px] font-bold ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-mid') : ''}`} style={isCozy ? cz({ color: '#F5F0E8' }) : {}}>🎯 Target Score</div>
          <div className={`text-[12px] font-medium ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted') : ''}`} style={isCozy ? cz({ color: 'rgba(245,240,232,0.5)' }) : {}}>Ultimate Goal</div>
        </div>
        <div className={`font-extrabold text-[22px] ${!isCozy ? (theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : 'font-baloo text-blue') : ''}`} style={isCozy ? cz({ color: '#C4A882' }) : {}}>600+ / 720</div>
      </div>

      {/* Mini goal */}
      <div
        className={`mt-3 py-3 px-4 flex items-center gap-3 ${!isCozy ? (theme === 'kawaii' ? 'bg-white border-2 border-[#7DDFC3] rounded-none shadow-[2px_2px_0_rgba(125,223,195,0.3)]' : 'bg-[#F0FFF8] border-[1.5px] border-[#9EECD0] rounded-[14px]') : ''}`}
        style={isCozy ? cz({ background: '#F5F0E8', border: '1.5px solid #D8CEBC', borderRadius: '6px' }) : {}}
      >
        <div className="flex-1">
          <div className={`text-[13px] font-bold ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-[#0F7A4E]') : ''}`} style={isCozy ? cz({ color: '#3A2E2A' }) : {}}>🌟 Today's Mini-Goal</div>
          <div className={`text-[11px] font-semibold leading-tight mt-0.5 ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-80 font-sans' : 'text-[#2AAB80]') : ''}`} style={isCozy ? cz({ color: 'rgba(58,46,42,0.6)' }) : {}}>
            A realistic target for today's mock to keep you on track.
          </div>
        </div>
        <div className={`font-extrabold text-[22px] shrink-0 ${!isCozy ? (theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : 'font-baloo text-[#0F7A4E]') : ''}`} style={isCozy ? cz({ color: '#B5302A' }) : {}}>~{estimatedTarget}</div>
      </div>

      {/* Score entries */}
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
            const scoreColor = isCozy
              ? (isGood ? '#3A6B35' : isMid ? '#B5302A' : 'rgba(58,46,42,0.6)')
              : (isGood ? 'text-[#0F7A4E]' : isMid ? 'text-[#B05A00]' : 'text-text-muted');
            const pct = Math.round((s.total / 720) * 100);
            const icon = isGood ? '👑' : s.total >= 550 ? '🚀' : '📈';

            const handleSave = () => { editScore(actualIndex, editData.bio, editData.phy, editData.che); setEditingIndex(null); };

            return (
              <div
                key={idx}
                className={`flex flex-col gap-2 py-2.5 border-b last:border-b-0 ${!isCozy ? (theme === 'kawaii' ? 'border-[#F4B8C1]' : 'border-cream-dark') : ''}`}
                style={isCozy ? cz({ borderBottom: '1px solid #EDE8DE' }) : {}}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`font-extrabold text-[11px] py-0.5 px-2 min-w-[44px] text-center ${!isCozy ? (theme === 'kawaii' ? 'bg-[#FDE8E8] text-[#5A3A3A] border border-[#F4B8C1] rounded-none font-sans' : 'bg-blue-pale text-blue rounded-md font-baloo') : ''}`}
                    style={isCozy ? cz({ background: '#F5F0E8', border: '1px solid #D8CEBC', borderRadius: '4px', color: '#3A2E2A' }) : {}}
                  >Mock</div>
                  <div
                    className={`font-extrabold text-[18px] flex-1 ${!isCozy ? `font-${theme === 'kawaii' ? 'sans' : 'baloo'}` : ''}`}
                    style={isCozy ? cz({ color: scoreColor }) : { color: theme === 'kawaii' ? '#5A3A3A' : undefined }}
                  >
                    {isEditing ? (Number(editData.bio) + Number(editData.phy) + Number(editData.che)) : s.total}
                    <span className={`text-[12px] font-medium ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted') : ''}`} style={isCozy ? cz({ color: 'rgba(58,46,42,0.5)' }) : {}}>
                      /720
                    </span>
                  </div>
                  {!isEditing ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setEditingIndex(actualIndex); setEditData({ bio: s.bio, phy: s.phy, che: s.che }); }}
                        className={`text-[11px] font-bold uppercase transition-colors ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] hover:opacity-70 font-sans underline' : 'text-blue hover:text-blue-light') : ''}`}
                        style={isCozy ? cz({ color: '#B5302A' }) : {}}
                      >Edit</button>
                      <button
                        onClick={() => { if (window.confirm("Delete this score?")) deleteScore(actualIndex); }}
                        className={`text-[11px] font-bold uppercase transition-colors ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] hover:opacity-70 font-sans underline' : 'text-coral hover:text-[#A03D20]') : ''}`}
                        style={isCozy ? cz({ color: 'rgba(58,46,42,0.5)' }) : {}}
                      >Del</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={handleSave} className={`text-[11px] font-bold uppercase px-2 py-1 ${!isCozy ? (theme === 'kawaii' ? 'bg-white text-[#5A3A3A] border border-[#7DDFC3] rounded-none font-sans' : 'text-[#0F7A4E] bg-[#F0FFF8] rounded') : ''}`} style={isCozy ? cz({ background: '#F5F0E8', border: '1px solid #B5302A', borderRadius: '4px', color: '#B5302A' }) : {}}>Save</button>
                      <button onClick={() => setEditingIndex(null)} className={`text-[11px] font-bold uppercase px-2 py-1 ${!isCozy ? (theme === 'kawaii' ? 'bg-[#FDE8E8] text-[#5A3A3A] border border-[#F4B8C1] rounded-none font-sans' : 'text-text-muted bg-cream-dark rounded') : ''}`} style={isCozy ? cz({ background: '#EDE8DE', border: '1px solid #D8CEBC', borderRadius: '4px', color: 'rgba(58,46,42,0.6)' }) : {}}>Cancel</button>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className={`h-1.5 overflow-hidden flex-1 max-w-[120px] p-[1px] ${!isCozy ? (theme === 'kawaii' ? 'bg-[#FDE8E8] border border-[#F4B8C1] rounded-none' : 'bg-cream-dark rounded-md') : ''}`} style={isCozy ? { background: '#EDE8DE', borderRadius: '3px', height: '6px' } : {}}>
                    <div className={`h-full ${!isCozy ? (theme === 'kawaii' ? 'bg-[#7DDFC3] rounded-none' : 'bg-blue-light rounded-md') : ''}`} style={isCozy ? { background: '#B5302A', height: '100%', borderRadius: '2px' } : {}} style={{ width: `${pct}%`, ...(isCozy ? { background: '#B5302A', height: '100%', borderRadius: '2px' } : {}) }} />
                  </div>
                  {isEditing ? (
                    <div className={`flex items-center gap-1.5 text-[11px] font-bold ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark') : ''}`} style={isCozy ? cz({ color: '#3A2E2A' }) : {}}>
                      Bio: <input type="number" value={editData.bio} onChange={e => setEditData(d => ({ ...d, bio: e.target.value }))} className={`w-10 px-1 ${!isCozy ? (theme === 'kawaii' ? 'bg-white border border-[#F4B8C1] rounded-none text-[#5A3A3A]' : 'border border-[#DDD0B8] rounded') : ''}`} style={isCozy ? cz({ border: '1px solid #D8CEBC', borderRadius: '3px' }) : {}} />
                      Phy: <input type="number" value={editData.phy} onChange={e => setEditData(d => ({ ...d, phy: e.target.value }))} className={`w-10 px-1 ${!isCozy ? (theme === 'kawaii' ? 'bg-white border border-[#F4B8C1] rounded-none text-[#5A3A3A]' : 'border border-[#DDD0B8] rounded') : ''}`} style={isCozy ? cz({ border: '1px solid #D8CEBC', borderRadius: '3px' }) : {}} />
                      Che: <input type="number" value={editData.che} onChange={e => setEditData(d => ({ ...d, che: e.target.value }))} className={`w-10 px-1 ${!isCozy ? (theme === 'kawaii' ? 'bg-white border border-[#F4B8C1] rounded-none text-[#5A3A3A]' : 'border border-[#DDD0B8] rounded') : ''}`} style={isCozy ? cz({ border: '1px solid #D8CEBC', borderRadius: '3px' }) : {}} />
                    </div>
                  ) : (
                    <div className={`text-[11px] font-medium flex-1 ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted') : ''}`} style={isCozy ? cz({ color: 'rgba(58,46,42,0.5)' }) : {}}>
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
