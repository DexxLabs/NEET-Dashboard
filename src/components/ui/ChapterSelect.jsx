import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../store/useTheme';

export const ChapterSelect = ({ value, onChange, options, completedMap }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const theme = useTheme(state => state.theme);

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
        className={`py-2 px-3 text-[12px] cursor-pointer flex justify-between items-center transition-colors ${theme === 'kawaii' ? 'bg-white border-2 border-[#F4B8C1] rounded-none font-sans text-[#5A3A3A] font-bold shadow-[inset_2px_2px_0_rgba(244,184,193,0.2)] hover:border-[#5A3A3A]' : theme === 'cozy' ? 'font-mono' : 'bg-white border-2 border-[#DDD0B8] rounded-lg font-semibold text-text-dark hover:border-blue-light'}`}
        style={theme === 'cozy' ? { background: 'rgba(255,255,255,0.90)', border: '1.5px solid #D8CEBC', borderRadius: '4px', color: '#3A2E2A', fontFamily: "'Courier Prime','Courier New',monospace", fontWeight: 'bold' } : {}}
      >
        <span className="truncate pr-2">
          {selectedOption ? selectedOption.name : 'Select Chapter...'}
        </span>
        <span className={`text-[10px] ${theme === 'kawaii' ? 'text-[#5A3A3A]' : 'text-text-muted'}`}>▼</span>
      </div>
      
      {isOpen && (
        <div className={`absolute z-50 top-full left-0 right-0 mt-1 max-h-[220px] overflow-y-auto custom-scrollbar ${theme === 'kawaii' ? 'bg-white border-2 border-[#F4B8C1] rounded-none shadow-[2px_2px_0_#F4B8C1]' : theme === 'cozy' ? '' : 'bg-white border-2 border-[#DDD0B8] rounded-xl shadow-xl'}`}
          style={theme === 'cozy' ? { background: 'rgba(255,255,255,0.97)', border: '1.5px solid #D8CEBC', borderRadius: '6px', boxShadow: '0 4px 16px rgba(58,46,42,0.10)', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
        >
          {options.map(opt => {
            const isDone = !!completedMap[opt.id];
            return (
              <div 
                key={opt.id}
                onClick={() => { onChange(opt.id); setIsOpen(false); }}
                className={`py-2 px-3 cursor-pointer flex flex-col border-b last:border-0 ${theme === 'kawaii' ? `border-[#FDE8E8] hover:bg-[#FDE8E8] ${value === opt.id ? 'bg-[#FDE8E8]' : ''}` : theme === 'cozy' ? '' : `hover:bg-blue-pale border-cream-dark ${value === opt.id ? 'bg-cream' : ''}`}`}
                style={theme === 'cozy' ? { borderBottom: '1px solid #EDE8DE', background: value === opt.id ? '#F5F0E8' : 'transparent' } : {}}
              >
                <span className={`text-[12px] ${theme === 'kawaii' ? 'font-bold text-[#5A3A3A] font-sans' : theme === 'cozy' ? 'font-mono' : 'font-semibold text-text-dark'}`} style={theme === 'cozy' ? { color: '#3A2E2A', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}>{opt.name}</span>
                <div className="flex gap-1.5 mt-1">
                  <span className={`text-[9px] font-bold px-1.5 py-[1px] rounded uppercase tracking-wide ${theme === 'kawaii' ? (opt.weight === 'High' ? 'bg-[#FF91A4] text-white rounded-none' : opt.weight === 'Medium' ? 'bg-[#7DDFC3] text-[#5A3A3A] rounded-none' : 'bg-[#FDE8E8] text-[#5A3A3A] rounded-none') : theme === 'cozy' ? '' : (opt.weight === 'High' ? 'bg-[#FFF0EC] text-coral' : opt.weight === 'Medium' ? 'bg-blue-pale text-blue' : 'bg-cream-dark text-text-muted')}`}
                    style={theme === 'cozy' ? { background: opt.weight === 'High' ? '#B5302A' : opt.weight === 'Medium' ? '#C4A882' : '#EDE8DE', color: opt.weight === 'Low' ? '#3A2E2A' : '#F5F0E8', borderRadius: '3px', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
                  >{opt.weight}</span>
                  {isDone && <span className={`text-[9px] font-bold px-1.5 py-[1px] uppercase tracking-wide ${theme === 'kawaii' ? 'bg-[#7DDFC3] text-[#5A3A3A] rounded-none' : theme === 'cozy' ? '' : 'bg-[#DFFFF0] text-[#0F7A4E] rounded'}`} style={theme === 'cozy' ? { background: '#F5F0E8', border: '1px solid #D8CEBC', borderRadius: '3px', color: '#3A6B35', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}>✓ Done</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
