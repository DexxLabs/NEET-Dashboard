import React, { useState, useRef, useEffect } from 'react';

export const ChapterSelect = ({ value, onChange, options, completedMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedOption = options.find(o => o.id === value);

  return (
    <div className="relative" ref={ref}>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white border-2 border-[#DDD0B8] rounded-lg py-2 px-3 text-[12px] font-semibold text-text-dark cursor-pointer flex justify-between items-center transition-colors hover:border-blue-light"
      >
        <span className="truncate pr-2">
          {selectedOption ? selectedOption.name : 'Select Chapter...'}
        </span>
        <span className="text-[10px] text-text-muted">▼</span>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border-2 border-[#DDD0B8] rounded-xl shadow-xl max-h-[220px] overflow-y-auto custom-scrollbar">
          {options.map(opt => {
            const isDone = !!completedMap[opt.id];
            return (
              <div 
                key={opt.id}
                onClick={() => { onChange(opt.id); setIsOpen(false); }}
                className={`py-2 px-3 hover:bg-blue-pale cursor-pointer flex flex-col border-b border-cream-dark last:border-0 ${value === opt.id ? 'bg-cream' : ''}`}
              >
                <span className="text-[12px] font-semibold text-text-dark">{opt.name}</span>
                <div className="flex gap-1.5 mt-1">
                  <span className={`text-[9px] font-bold px-1.5 py-[1px] rounded uppercase tracking-wide ${opt.weight === 'High' ? 'bg-[#FFF0EC] text-coral' : opt.weight === 'Medium' ? 'bg-blue-pale text-blue' : 'bg-cream-dark text-text-muted'}`}>
                    {opt.weight}
                  </span>
                  {isDone && <span className="text-[9px] font-bold px-1.5 py-[1px] rounded uppercase tracking-wide bg-[#DFFFF0] text-[#0F7A4E]">✓ Done</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
