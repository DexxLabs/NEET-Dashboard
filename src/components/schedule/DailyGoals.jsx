import React from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { SYLLABUS } from '../../utils/SyllabusData';
import { ChapterSelect } from '../ui/ChapterSelect';

export const DailyGoals = () => {
  const dailyTasks = useStore((state) => state.dailyTasks);
  const completedChapters = useStore((state) => state.completedChapters);
  const toggleDailyTask = useStore((state) => state.toggleDailyTask);
  const updateDailyTask = useStore((state) => state.updateDailyTask);
  const theme = useTheme(state => state.theme);

  return (
    <Card title="⏰ Today's Goals" sub="Select chapters & PYQs, then tap the box when done ✅">
      <div className="flex flex-col gap-3">
        {dailyTasks.map((task) => {
          const isDone = task.done;
          let bgClass = task.subject === 'Physics' ? 'bg-blue-pale border-blue-light/50' 
            : task.subject === 'Chemistry' ? 'bg-[#FFF3EE] border-[#FFD0B8]' 
            : task.subject === 'Mock Test' ? 'bg-[#FFF8E0] border-yellow' 
            : task.subject === 'Self Care' ? 'bg-[#FFF0F5] border-[#FFD6E8]' 
            : 'bg-[#F0FFF8] border-[#9EECD0]'; // Botany/Zoology

          if (theme === 'kawaii') {
            bgClass = isDone ? 'bg-[#FDE8E8] border-[#F4B8C1]' : 'bg-white border-[#F4B8C1] shadow-[2px_2px_0_rgba(244,184,193,0.3)]';
          }

          const weightMap = { 'High': 3, 'Medium': 2, 'Low': 1 };
          let sortedChapters = [];
          if (SYLLABUS[task.subject]) {
            sortedChapters = [...SYLLABUS[task.subject]].sort((a, b) => weightMap[b.weight] - weightMap[a.weight]);
          }

          const hasPicker = sortedChapters.length > 0;

          return (
            <div key={task.id} className={`py-3 px-4 relative border-[1.5px] transition-all duration-200 ${theme === 'kawaii' ? 'rounded-none' : 'rounded-xl'} ${bgClass} ${isDone ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className={`font-bold text-[14px] ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark'}`}>{task.name}</div>
                  {isDone && hasPicker && task.chapterId && (
                    <div className={`text-[11px] font-semibold mt-0.5 pr-10 leading-tight ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-80' : 'text-text-mid'}`}>
                      {sortedChapters.find(c => c.id === task.chapterId)?.name} • {task.pyqs || 0} PYQs
                    </div>
                  )}
                  {isDone && !hasPicker && (
                    <div className={`text-[11px] font-semibold mt-0.5 pr-10 leading-tight ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-80' : 'text-text-mid'}`}>
                      Completed 🚀
                    </div>
                  )}
                </div>
                
                <div 
                  onClick={() => toggleDailyTask(task.id, task.xp)}
                  className={`w-7 h-7 flex items-center justify-center text-[14px] transition-all duration-200 shrink-0 cursor-pointer select-none ${theme === 'kawaii' ? 'border-2 rounded-none' : 'border-2 rounded-lg'} ${
                    isDone 
                      ? (theme === 'kawaii' ? 'bg-[#7DDFC3] border-[#5A3A3A] text-[#5A3A3A]' : 'bg-[#3ECFA0] border-[#2AAB80] text-white') 
                      : (theme === 'kawaii' ? 'bg-white border-[#5A3A3A] hover:bg-[#FDE8E8] text-transparent hover:text-transparent' : 'bg-white border-[#DDD0B8] hover:border-blue-light text-transparent hover:text-blue-light/50')
                  }`}
                >
                  ✓
                </div>
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
                      className={`border-2 py-1 px-2 text-[12px] font-bold outline-none w-[64px] text-center transition-colors ${theme === 'kawaii' ? 'bg-white border-[#F4B8C1] rounded-none text-[#5A3A3A] focus:border-[#5A3A3A]' : 'bg-white border-[#DDD0B8] rounded-lg text-text-dark focus:border-blue-light'}`}
                    />
                    <span className={`text-[11px] font-bold uppercase tracking-wide ${theme === 'kawaii' ? 'text-[#5A3A3A]' : 'text-text-muted'}`}>Target PYQs / Qs</span>
                  </div>
                </div>
              )}

              <div className={`absolute top-3 right-12 text-[11px] font-extrabold ${theme === 'kawaii' ? 'text-[#7DDFC3] font-sans' : 'text-yellow-deep font-baloo'}`}>
                +{task.xp} XP
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
