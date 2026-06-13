import React, { useState } from 'react';
import { useTheme } from '../../store/useTheme';

export const NumberPadModal = ({ isOpen, onClose, onSave, title, maxVal }) => {
  const [val, setVal] = useState('');
  const theme = useTheme(state => state.theme);

  if (!isOpen) return null;

  const handlePress = (num) => {
    if (val.length < 3) {
      setVal(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setVal(prev => prev.slice(0, -1));
  };

  const handleSave = () => {
    const finalVal = Math.min(maxVal, Math.max(0, parseInt(val) || 0));
    onSave(finalVal);
    setVal('');
    onClose();
  };

  if (theme === 'kawaii') {
    return (
      <div 
        className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={() => { setVal(''); onClose(); }}
      >
        <div 
          className="bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] w-full max-w-[320px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Title bar */}
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
                <button 
                  key={n}
                  onClick={() => handlePress(n)}
                  className="bg-[#FDE8E8] text-[#5A3A3A] font-bold text-[20px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none"
                >
                  {n}
                </button>
              ))}
              <button 
                onClick={() => setVal('')}
                className="bg-white text-[#5A3A3A] font-bold text-[16px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none"
              >
                CLR
              </button>
              <button 
                onClick={() => handlePress(0)}
                className="bg-[#FDE8E8] text-[#5A3A3A] font-bold text-[20px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none"
              >
                0
              </button>
              <button 
                onClick={handleBackspace}
                className="bg-white text-[#5A3A3A] font-bold text-[18px] rounded-none py-2 border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none"
              >
                ⌫
              </button>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => { setVal(''); onClose(); }}
                className="flex-1 bg-white text-[#5A3A3A] py-3 font-bold text-[14px] border-2 border-[#F4B8C1] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex-[2] bg-[#7DDFC3] text-[#5A3A3A] py-3 font-bold text-[14px] border-2 border-[#5A3A3A] border-b-4 active:border-b-2 active:translate-y-[2px] transition-all select-none shadow-[2px_2px_0_rgba(244,184,193,0.5)]"
              >
                Confirm Score
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-blue/40 backdrop-blur-sm transition-opacity"
      onClick={() => { setVal(''); onClose(); }}
    >
      <div 
        className="bg-white rounded-[24px] p-6 w-full max-w-[320px] shadow-2xl border-[3px] border-blue-light transition-transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="font-baloo font-bold text-[18px] text-blue">{title}</div>
          <button onClick={() => { setVal(''); onClose(); }} className="text-text-muted hover:text-coral transition-colors font-bold text-xl">✕</button>
        </div>
        
        <div className="bg-cream-dark rounded-2xl py-3 px-4 text-center font-baloo font-extrabold text-[32px] text-text-dark mb-5 border-2 border-[#DDD0B8] h-[72px] flex items-center justify-center">
          {val || <span className="text-text-muted/40">0</span>}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1,2,3,4,5,6,7,8,9].map(n => (
            <button 
              key={n}
              onClick={() => handlePress(n)}
              className="bg-blue-pale text-blue font-baloo font-extrabold text-[22px] rounded-xl py-3 border-b-[4px] border-blue/20 active:border-b-0 active:translate-y-1 transition-all select-none"
            >
              {n}
            </button>
          ))}
          <button 
            onClick={() => setVal('')}
            className="bg-cream-dark text-text-muted font-baloo font-bold text-[16px] rounded-xl py-3 border-b-[4px] border-[#DDD0B8] active:border-b-0 active:translate-y-1 transition-all select-none"
          >
            CLR
          </button>
          <button 
            onClick={() => handlePress(0)}
            className="bg-blue-pale text-blue font-baloo font-extrabold text-[22px] rounded-xl py-3 border-b-[4px] border-blue/20 active:border-b-0 active:translate-y-1 transition-all select-none"
          >
            0
          </button>
          <button 
            onClick={handleBackspace}
            className="bg-cream-dark text-text-muted font-baloo font-bold text-[18px] rounded-xl py-3 border-b-[4px] border-[#DDD0B8] active:border-b-0 active:translate-y-1 transition-all select-none"
          >
            ⌫
          </button>
        </div>

        <button 
          onClick={handleSave}
          className="w-full bg-coral text-white rounded-xl py-3.5 font-baloo font-extrabold text-[16px] border-b-[4px] border-[#D05830] active:border-b-0 active:translate-y-1 transition-all select-none shadow-[0_2px_10px_rgba(247,134,96,0.3)]"
        >
          Confirm Score
        </button>
      </div>
    </div>
  );
};

