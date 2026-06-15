import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { SYLLABUS } from '../../utils/SyllabusData';

export const SyllabusChecklist = () => {
  const completedChapters = useStore(state => state.completedChapters);
  const toggleChapter = useStore(state => state.toggleChapter);
  const theme = useTheme(state => state.theme);
  const isCozy = theme === 'cozy';

  return (
    <Card title="📚 Syllabus Weightage & Checklist" sub="Track your macro-progression here! Ranked by high yield." className="mt-6 col-span-1 md:col-span-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(SYLLABUS).map(([subject, chapters]) => {
          const total = chapters.length;
          const done = chapters.filter(c => completedChapters[c.id]).length;
          const pct = Math.round((done / total) * 100) || 0;

          return (
            <div key={subject}>
              <div className="flex justify-between items-center mb-2">
                <div
                  className={`font-bold text-[18px] ${!isCozy ? 'font-baloo text-text-dark' : ''}`}
                  style={isCozy ? { color: '#3A2E2A', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
                >{subject}</div>
                <div
                  className={`text-[13px] font-bold ${!isCozy ? 'text-text-muted' : ''}`}
                  style={isCozy ? { color: 'rgba(58,46,42,0.6)', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
                >{done}/{total} Done</div>
              </div>
              <div
                className={`mb-4 overflow-hidden ${!isCozy ? 'h-2 rounded-pill bg-cream-dark' : ''}`}
                style={isCozy ? { height: '8px', borderRadius: '3px', background: '#EDE8DE', marginBottom: '16px', overflow: 'hidden' } : {}}
              >
                <div
                  className={`h-full transition-all duration-500 ${!isCozy ? 'bg-blue-light' : ''}`}
                  style={isCozy ? { width: `${pct}%`, background: '#B5302A', height: '100%' } : { width: `${pct}%` }}
                />
              </div>
              <div className="flex flex-col gap-1.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {chapters.map(chap => {
                  const isDone = !!completedChapters[chap.id];
                  const weightColor = isCozy
                    ? null
                    : (chap.weight === 'High' ? 'text-coral bg-[#FFF0EC]' : chap.weight === 'Medium' ? 'text-blue bg-blue-pale' : 'text-text-muted bg-cream-dark');

                  const weightStyle = isCozy
                    ? { background: chap.weight === 'High' ? '#B5302A' : chap.weight === 'Medium' ? '#C4A882' : '#EDE8DE', color: chap.weight === 'Low' ? '#3A2E2A' : '#F5F0E8', borderRadius: '3px', fontFamily: "'Courier Prime','Courier New',monospace" }
                    : {};

                  return (
                    <div
                      key={chap.id}
                      onClick={() => toggleChapter(chap.id)}
                      className={`flex items-center gap-3 p-2.5 cursor-pointer transition-all duration-200 select-none shrink-0 ${!isCozy ? `border-2 rounded-xl ${isDone ? 'border-[#3ECFA0] bg-[#F0FFF8]' : 'border-cream-dark bg-white hover:border-blue-light/50'}` : ''}`}
                      style={isCozy ? { border: `1.5px solid ${isDone ? '#B5302A' : '#D8CEBC'}`, borderRadius: '6px', background: isDone ? 'rgba(181,48,42,0.06)' : 'rgba(255,255,255,0.80)', cursor: 'pointer' } : {}}
                    >
                      <div
                        className={`w-5 h-5 flex items-center justify-center text-[11px] ${!isCozy ? `rounded-md border-[1.5px] ${isDone ? 'bg-[#3ECFA0] border-[#2AAB80] text-white' : 'bg-white border-[#DDD0B8] text-transparent'}` : ''}`}
                        style={isCozy ? { width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${isDone ? '#B5302A' : '#D8CEBC'}`, background: isDone ? '#B5302A' : 'rgba(255,255,255,0.9)', color: isDone ? '#F5F0E8' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', flexShrink: 0 } : {}}
                      >✓</div>
                      <div
                        className={`flex-1 text-[13px] font-semibold leading-tight ${!isCozy ? (isDone ? 'text-text-muted line-through' : 'text-text-dark') : ''}`}
                        style={isCozy ? { color: isDone ? 'rgba(58,46,42,0.5)' : '#3A2E2A', textDecoration: isDone ? 'line-through' : 'none', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
                      >{chap.name}</div>
                      <div
                        className={`text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide shrink-0 ${!isCozy ? `rounded-md ${weightColor}` : ''}`}
                        style={isCozy ? weightStyle : {}}
                      >{chap.weight}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
