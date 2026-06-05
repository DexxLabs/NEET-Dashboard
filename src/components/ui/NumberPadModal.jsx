import React, { useState } from 'react';

export const NumberPadModal = ({ isOpen, onClose, onSave, title, maxVal }) => {
  const [val, setVal] = useState('');

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
