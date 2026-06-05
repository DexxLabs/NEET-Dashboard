import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { SYLLABUS } from '../../utils/SyllabusData';

export const SyllabusChecklist = () => {
  const completedChapters = useStore(state => state.completedChapters);
  const toggleChapter = useStore(state => state.toggleChapter);

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
                <div className="font-baloo font-bold text-[18px] text-text-dark">{subject}</div>
                <div className="text-[13px] font-bold text-text-muted">{done}/{total} Done</div>
              </div>
              <div className="h-2 rounded-pill bg-cream-dark mb-4 overflow-hidden">
                <div className="h-full bg-blue-light transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex flex-col gap-1.5 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {chapters.map(chap => {
                  const isDone = !!completedChapters[chap.id];
                  const weightColor = chap.weight === 'High' ? 'text-coral bg-[#FFF0EC]' : chap.weight === 'Medium' ? 'text-blue bg-blue-pale' : 'text-text-muted bg-cream-dark';
                  
                  return (
                    <div 
                      key={chap.id}
                      onClick={() => toggleChapter(chap.id)}
                      className={`flex items-center gap-3 p-2.5 border-2 rounded-xl cursor-pointer transition-all duration-200 select-none shrink-0 ${isDone ? 'border-[#3ECFA0] bg-[#F0FFF8]' : 'border-cream-dark bg-white hover:border-blue-light/50'}`}
                    >
                      <div className={`w-5 h-5 rounded-md border-[1.5px] flex items-center justify-center text-[11px] ${isDone ? 'bg-[#3ECFA0] border-[#2AAB80] text-white' : 'bg-white border-[#DDD0B8] text-transparent'}`}>
                        ✓
                      </div>
                      <div className={`flex-1 text-[13px] font-semibold leading-tight ${isDone ? 'text-text-muted line-through' : 'text-text-dark'}`}>
                        {chap.name}
                      </div>
                      <div className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide shrink-0 ${weightColor}`}>
                        {chap.weight}
                      </div>
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
