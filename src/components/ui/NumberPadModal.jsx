import React, { useState } from 'react';
import { useTheme } from '../../store/useTheme';

const cz = (extra = {}) => ({ fontFamily: "'Courier Prime','Courier New',monospace", ...extra });

export const NumberPadModal = ({ isOpen, onClose, onSave, title, maxVal }) => {
  const [val, setVal] = useState('');
  const theme = useTheme(state => state.theme);

  if (!isOpen) return null;

  const handlePress = (num) => { if (val.length < 3) setVal(prev => prev + num); };
  const handleBackspace = () => setVal(prev => prev.slice(0, -1));
  const handleSave = () => {
    const finalVal = Math.min(maxVal, Math.max(0, parseInt(val) || 0));
    onSave(finalVal);
    setVal('');
    onClose();
  };

  if (theme === 'cozy') {
    return (
      <div
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 backdrop-blur-sm"
        style={{ background: 'rgba(58,46,42,0.25)' }}
        onClick={() => { setVal(''); onClose(); }}
      >
        <div
          className="w-full max-w-[300px] flex flex-col overflow-hidden"
          style={{ background: '#F5F0E8', border: '1.5px solid #D8CEBC', borderRadius: '8px', boxShadow: '0 8px 32px rgba(58,46,42,0.15)', fontFamily: "'Courier Prime','Courier New',monospace" }}
          onClick={e => e.stopPropagation()}
        >
          {/* macOS title bar */}
          <div className="flex items-center gap-[6px] px-3 py-2" style={{ background: '#EDE8DE', borderBottom: '1px solid #D8CEBC' }}>
            {[['#FF5F57','✕'],['#FEBC2E','−'],['#28C840','⤢']].map(([c,sym],i) => (
              <div key={i} className="group w-3 h-3 rounded-full flex items-center justify-center cursor-pointer" style={{ background: c }} onClick={i === 0 ? () => { setVal(''); onClose(); } : undefined}>
                <span className="opacity-0 group-hover:opacity-100 text-[6px] font-bold leading-none" style={{ color: '#fff' }}>{sym}</span>
              </div>
            ))}
            <span className="text-[11px] mx-auto pr-8" style={{ color: '#8A7A6A' }}>score_input.txt</span>
          </div>

          <div className="p-5">
            <div className="font-bold text-[14px] mb-4 text-center" style={{ color: '#3A2E2A' }}>{title}</div>

            {/* Display */}
            <div className="py-3 px-4 text-center font-bold text-[32px] mb-5 h-[72px] flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#3A2E2A' }}>
              {val || <span style={{ opacity: 0.3 }}>0</span>}
            </div>

            {/* Number grid */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => handlePress(n)} className="py-2 font-bold text-[20px] transition-all active:translate-y-[1px] cursor-pointer" style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#3A2E2A' }}>
                  {n}
                </button>
              ))}
              <button onClick={() => setVal('')} className="py-2 font-bold text-[16px] transition-all active:translate-y-[1px] cursor-pointer" style={{ background: '#EDE8DE', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#3A2E2A' }}>CLR</button>
              <button onClick={() => handlePress(0)} className="py-2 font-bold text-[20px] transition-all active:translate-y-[1px] cursor-pointer" style={{ background: 'rgba(255,255,255,0.90)', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#3A2E2A' }}>0</button>
              <button onClick={handleBackspace} className="py-2 font-bold text-[18px] transition-all active:translate-y-[1px] cursor-pointer" style={{ background: '#EDE8DE', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#3A2E2A' }}>⌫</button>
            </div>

            <div className="flex gap-2">
              <button onClick={() => { setVal(''); onClose(); }} className="flex-1 py-3 font-bold text-[14px] cursor-pointer transition-all active:translate-y-[1px]" style={{ background: '#EDE8DE', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#3A2E2A' }}>Cancel</button>
              <button onClick={handleSave} className="flex-[2] py-3 font-bold text-[14px] cursor-pointer transition-all active:translate-y-[1px]" style={{ background: '#B5302A', border: 'none', borderRadius: '6px', color: '#F5F0E8', boxShadow: '0 2px 0 #8B1A14' }}>Confirm Score</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (theme === 'kawaii') {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-opacity" onClick={() => { setVal(''); onClose(); }}>
        <div className="bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] w-full max-w-[320px] flex flex-col" onClick={(e) => e.stopPropagation()}>
          <div className="bg-[#F4B8C1] px-2 py-1 flex items-center justify-between border-b-2 border-[#F4B8C1]">
            <div className="text-[#5A3A3A] font-bold text-[12px] tracking-wide font-sans">score_input.exe</div>
            <div className="flex gap-1">
              <button onClick={() => { setVal(''); onClose(); }} className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">✕</button>
            </div>
          </div>
          <div className="p-5">
            <div className="font-bold text-[14px] text-[#5A3A3A] mb-4 text-center font-sans">{title}</div>
            <div className="bg-[#FDE8E8] border-2 border-[#F4B8C1] shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] py-3 px-4 text-center font-bold text-[32px] text-[#5A3A3A] mb-5 h-[72px] flex items-center justify-center">
              {val || <span className="opacity-30">0</span>}
            </div>
            <div className="grid grid-cols-3 gap-2 mb-5">
              {[1,2,3,4,5,6,7,8,9].map(n => (
                <button key={n} onClick={() => handlePress(n)} className="bg-[#FDE8E8] text-[#5A3A3A] font-bold text-[20px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none">{n}</button>
              ))}
              <button onClick={() => setVal('')} className="bg-white text-[#5A3A3A] font-bold text-[16px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none">CLR</button>
              <button onClick={() => handlePress(0)} className="bg-[#FDE8E8] text-[#5A3A3A] font-bold text-[20px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none">0</button>
              <button onClick={handleBackspace} className="bg-white text-[#5A3A3A] font-bold text-[18px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none">⌫</button>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setVal(''); onClose(); }} className="flex-1 bg-white text-[#5A3A3A] py-3 font-bold text-[14px] border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none">Cancel</button>
              <button onClick={handleSave} className="flex-[2] bg-[#7DDFC3] text-[#5A3A3A] py-3 font-bold text-[14px] border-2 border-[#5A3A3A] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none shadow-[2px_2px_0_rgba(244,184,193,0.5)]">Confirm Score</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-blue/40 backdrop-blur-sm transition-opacity" onClick={() => { setVal(''); onClose(); }}>
      <div className="bg-white rounded-[24px] p-6 w-full max-w-[320px] shadow-2xl border-[3px] border-blue-light transition-transform scale-100" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <div className="font-baloo font-bold text-[18px] text-blue">{title}</div>
          <button onClick={() => { setVal(''); onClose(); }} className="text-text-muted hover:text-coral transition-colors font-bold text-xl">✕</button>
        </div>
        <div className="bg-cream-dark rounded-2xl py-3 px-4 text-center font-baloo font-extrabold text-[32px] text-text-dark mb-5 border-2 border-[#DDD0B8] h-[72px] flex items-center justify-center">
          {val || <span className="text-text-muted/40">0</span>}
        </div>
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button key={n} onClick={() => handlePress(n)} className="bg-blue-pale text-blue font-baloo font-extrabold text-[22px] rounded-xl py-3 border-b-[4px] border-blue/20 active:border-b-0 active:translate-y-1 transition-all select-none">{n}</button>
          ))}
          <button onClick={() => setVal('')} className="bg-cream-dark text-text-muted font-baloo font-bold text-[16px] rounded-xl py-3 border-b-[4px] border-[#DDD0B8] active:border-b-0 active:translate-y-1 transition-all select-none">CLR</button>
          <button onClick={() => handlePress(0)} className="bg-blue-pale text-blue font-baloo font-extrabold text-[22px] rounded-xl py-3 border-b-[4px] border-blue/20 active:border-b-0 active:translate-y-1 transition-all select-none">0</button>
          <button onClick={handleBackspace} className="bg-cream-dark text-text-muted font-baloo font-bold text-[18px] rounded-xl py-3 border-b-[4px] border-[#DDD0B8] active:border-b-0 active:translate-y-1 transition-all select-none">⌫</button>
        </div>
        <button onClick={handleSave} className="w-full bg-coral text-white rounded-xl py-3.5 font-baloo font-extrabold text-[16px] border-b-[4px] border-[#D05830] active:border-b-0 active:translate-y-1 transition-all select-none shadow-[0_2px_10px_rgba(247,134,96,0.3)]">
          Confirm Score
        </button>
      </div>
    </div>
  );
};
