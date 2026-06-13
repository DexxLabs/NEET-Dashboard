import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { NumberPadModal } from '../ui/NumberPadModal';

export const SubjectProgress = () => {
  const scores = useStore((state) => state.scores);
  const logScoreAction = useStore((state) => state.logScore);
  const showToast = useStore((state) => state.showToast);
  const theme = useTheme((state) => state.theme);
  
  const [inBio, setInBio] = useState('');
  const [inPhy, setInPhy] = useState('');
  const [inChe, setInChe] = useState('');
  
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);

  const lastScore = scores.length > 0 ? scores[scores.length - 1] : { bio: 0, phy: 0, che: 0 };
  const bioPct = Math.round((lastScore.bio / 360) * 100);
  const phyPct = Math.round((lastScore.phy / 180) * 100);
  const chePct = Math.round((lastScore.che / 180) * 100);

  const handleLog = () => {
    const bio = inBio === '' ? 0 : inBio;
    const phy = inPhy === '' ? 0 : inPhy;
    const che = inChe === '' ? 0 : inChe;
    
    if (bio === 0 && phy === 0 && che === 0) {
      showToast('⚠️ Enter at least one score first!');
      return;
    }
    
    logScoreAction(bio, phy, che);
    setInBio('');
    setInPhy('');
    setInChe('');
  };

  const handleOpenModal = (subject) => {
    setActiveSubject(subject);
    setModalOpen(true);
  };

  const handleSaveScore = (val) => {
    if (activeSubject === 'bio') setInBio(val);
    if (activeSubject === 'phy') setInPhy(val);
    if (activeSubject === 'che') setInChe(val);
  };

  const getModalProps = () => {
    if (activeSubject === 'bio') return { title: '🌿 Biology Score', maxVal: 360 };
    if (activeSubject === 'phy') return { title: '⚡ Physics Score', maxVal: 180 };
    if (activeSubject === 'che') return { title: '🧪 Chemistry Score', maxVal: 180 };
    return { title: 'Score', maxVal: 0 };
  };

  return (
    <>
      <Card title="📊 Subject Breakdown" sub="Based on your latest mock score" className="h-full flex flex-col">
        <div className="flex items-center gap-[14px] mb-4">
          <div className="text-[22px] w-9 text-center">🌿</div>
          <div className="flex-1">
            <div className={`font-bold text-[14px] ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark'}`}>Biology</div>
            <div className={`text-[11px] font-semibold mt-[1px] ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted'}`}>Your strongest! 60 min/day to maintain the lead</div>
            <div className={`${theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none h-3' : 'bg-cream-dark rounded-pill h-2.5'} overflow-hidden mt-1.5 p-[1px]`}>
              <div className={`h-full subj-bar-fill ${theme === 'kawaii' ? 'bg-[#7DDFC3] rounded-none' : 'bg-[#3ECFA0] rounded-pill'}`} style={{ width: `${bioPct}%` }} />
            </div>
          </div>
          <div className={`font-extrabold text-base min-w-[60px] text-right ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'font-baloo text-[#0F7A4E]'}`}>
            {scores.length > 0 ? `${lastScore.bio}/360` : '—'}
          </div>
        </div>

        <div className="flex items-center gap-[14px] mb-4">
          <div className="text-[22px] w-9 text-center">⚡</div>
          <div className="flex-1">
            <div className={`font-bold text-[14px] ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark'}`}>Physics</div>
            <div className={`text-[11px] font-semibold mt-[1px] ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted'}`}>Time management key — 2-min/Q discipline wins here</div>
            <div className={`${theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none h-3' : 'bg-cream-dark rounded-pill h-2.5'} overflow-hidden mt-1.5 p-[1px]`}>
              <div className={`h-full subj-bar-fill ${theme === 'kawaii' ? 'bg-[#7DDFC3] rounded-none' : 'bg-blue-light rounded-pill'}`} style={{ width: `${phyPct}%` }} />
            </div>
          </div>
          <div className={`font-extrabold text-base min-w-[60px] text-right ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'font-baloo text-blue'}`}>
            {scores.length > 0 ? `${lastScore.phy}/180` : '—'}
          </div>
        </div>

        <div className="flex items-center gap-[14px]">
          <div className="text-[22px] w-9 text-center">🧪</div>
          <div className="flex-1">
            <div className={`font-bold text-[14px] ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark'}`}>Chemistry</div>
            <div className={`text-[11px] font-semibold mt-[1px] ${theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted'}`}>High effort → high reward. Best ROI subject in 10 days</div>
            <div className={`${theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none h-3' : 'bg-cream-dark rounded-pill h-2.5'} overflow-hidden mt-1.5 p-[1px]`}>
              <div className={`h-full subj-bar-fill ${theme === 'kawaii' ? 'bg-[#7DDFC3] rounded-none' : 'bg-coral rounded-pill'}`} style={{ width: `${chePct}%` }} />
            </div>
          </div>
          <div className={`font-extrabold text-base min-w-[60px] text-right ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'font-baloo text-coral'}`}>
            {scores.length > 0 ? `${lastScore.che}/180` : '—'}
          </div>
        </div>

        <div className={`mt-5 p-4 ${theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none' : 'bg-cream-dark rounded-2xl'}`}>
          <div className={`text-[12px] font-extrabold uppercase tracking-[1px] mb-3 ${theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : 'font-baloo text-text-muted'}`}>
            Log Today's Mock Score
          </div>
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            <div className="flex flex-col gap-1.5">
              <label className={`text-[10px] font-bold uppercase tracking-[0.6px] text-center ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-muted'}`}>🌿 Bio (/360)</label>
              <div 
                onClick={() => handleOpenModal('bio')}
                className={`py-2 px-1 font-bold text-[18px] text-center cursor-pointer transition-colors duration-200 ${theme === 'kawaii' ? 'bg-white border-2 border-[#F4B8C1] text-[#5A3A3A] font-sans rounded-none shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] hover:border-[#5A3A3A]' : 'bg-white border-2 border-cream-dark rounded-xl font-baloo text-text-dark hover:border-blue-light'}`}
              >
                {inBio === '' ? '-' : inBio}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={`text-[10px] font-bold uppercase tracking-[0.6px] text-center ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-muted'}`}>⚡ Phy (/180)</label>
              <div 
                onClick={() => handleOpenModal('phy')}
                className={`py-2 px-1 font-bold text-[18px] text-center cursor-pointer transition-colors duration-200 ${theme === 'kawaii' ? 'bg-white border-2 border-[#F4B8C1] text-[#5A3A3A] font-sans rounded-none shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] hover:border-[#5A3A3A]' : 'bg-white border-2 border-cream-dark rounded-xl font-baloo text-text-dark hover:border-blue-light'}`}
              >
                {inPhy === '' ? '-' : inPhy}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={`text-[10px] font-bold uppercase tracking-[0.6px] text-center ${theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-muted'}`}>🧪 Che (/180)</label>
              <div 
                onClick={() => handleOpenModal('che')}
                className={`py-2 px-1 font-bold text-[18px] text-center cursor-pointer transition-colors duration-200 ${theme === 'kawaii' ? 'bg-white border-2 border-[#F4B8C1] text-[#5A3A3A] font-sans rounded-none shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] hover:border-[#5A3A3A]' : 'bg-white border-2 border-cream-dark rounded-xl font-baloo text-text-dark hover:border-blue-light'}`}
              >
                {inChe === '' ? '-' : inChe}
              </div>
            </div>
          </div>
          <button 
            onClick={handleLog}
            className={`w-full border-none p-3 font-bold text-[15px] cursor-pointer transition-all duration-150 active:translate-y-[2px] ${theme === 'kawaii' ? 'bg-[#7DDFC3] text-[#5A3A3A] rounded-none border-2 border-[#5A3A3A] shadow-[2px_2px_0_#5A3A3A] active:shadow-none font-sans' : 'bg-blue text-white rounded-[14px] font-baloo shadow-[0_4px_0_#1a2e80] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a2e80] active:translate-y-0.5 active:shadow-[0_2px_0_#1a2e80]'}`}
          >
            + Log Score 🎯
          </button>
        </div>
      </Card>

      <NumberPadModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSave={handleSaveScore}
        title={getModalProps().title}
        maxVal={getModalProps().maxVal}
      />
    </>
  );
};
