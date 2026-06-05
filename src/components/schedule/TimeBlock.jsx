import React from 'react';
import { useStore } from '../../store/useStore';

export const TimeBlock = ({ id, time, bgClass, name, task, xp }) => {
  const isDone = useStore((state) => !!state.checkedTasks[id]);
  const toggleCheck = useStore((state) => state.toggleCheck);

  return (
    <div className="flex items-start gap-[14px] py-3 border-b-[1.5px] border-dashed border-cream-dark last:border-b-0">
      <div className="font-baloo font-bold text-[13px] text-text-muted min-w-[80px] mt-[3px]">
        {time}
      </div>
      <div className={`flex-1 rounded-xl py-2.5 px-3.5 relative ${bgClass}`}>
        <div className="font-bold text-[14px] text-text-dark">{name}</div>
        <div className="text-[12px] text-text-mid mt-0.5 font-medium">{task}</div>
        {xp > 0 && (
          <div className="absolute top-2 right-2.5 text-[11px] font-extrabold text-yellow-deep font-baloo">
            +{xp} XP
          </div>
        )}
      </div>
      <div 
        onClick={() => toggleCheck(id, xp)}
        className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center text-[14px] transition-all duration-200 shrink-0 mt-1.5 cursor-pointer select-none ${
          isDone 
            ? 'bg-[#3ECFA0] border-[#2AAB80] text-white' 
            : 'bg-white border-cream-dark hover:border-blue-light text-transparent hover:text-blue-light/50'
        }`}
      >
        ✓
      </div>
    </div>
  );
};
