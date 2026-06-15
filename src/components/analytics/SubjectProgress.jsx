import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';
import { NumberPadModal } from '../ui/NumberPadModal';

const cz = { color: '#3A2E2A', fontFamily: "'Courier Prime','Courier New',monospace" };
const czSub = { color: 'rgba(58,46,42,0.6)', fontFamily: "'Courier Prime','Courier New',monospace" };

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

  const isCozy = theme === 'cozy';

  const handleLog = () => {
    const bio = inBio === '' ? 0 : inBio;
    const phy = inPhy === '' ? 0 : inPhy;
    const che = inChe === '' ? 0 : inChe;
    if (bio === 0 && phy === 0 && che === 0) { showToast('⚠️ Enter at least one score first!'); return; }
    logScoreAction(bio, phy, che);
    setInBio(''); setInPhy(''); setInChe('');
  };

  const handleOpenModal = (subject) => { setActiveSubject(subject); setModalOpen(true); };
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

  // Helper: bar track + fill
  const BarTrack = ({ pct, cozyFill = '#B5302A' }) => {
    if (isCozy) return (
      <div style={{ background: '#EDE8DE', borderRadius: '3px', height: '10px', overflow: 'hidden', marginTop: '6px', padding: '1px' }}>
        <div className="subj-bar-fill" style={{ height: '100%', background: cozyFill, borderRadius: '2px', width: `${pct}%` }} />
      </div>
    );
    if (theme === 'kawaii') return (
      <div className="bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none h-3 overflow-hidden mt-1.5 p-[1px]">
        <div className="h-full subj-bar-fill bg-[#7DDFC3] rounded-none" style={{ width: `${pct}%` }} />
      </div>
    );
    return (
      <div className="bg-cream-dark rounded-pill h-2.5 overflow-hidden mt-1.5 p-[1px]">
        <div className="h-full subj-bar-fill bg-[#3ECFA0] rounded-pill" style={{ width: `${pct}%` }} />
      </div>
    );
  };

  const textMain = isCozy ? cz : { className: theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-dark' };
  const textSub = isCozy ? czSub : { className: theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans' : 'text-text-muted' };

  return (
    <>
      <Card title="📊 Subject Breakdown" sub="Based on your latest mock score" className="h-full flex flex-col">
        {/* Biology */}
        <div className="flex items-center gap-[14px] mb-4">
          <div className="text-[22px] w-9 text-center">🌿</div>
          <div className="flex-1">
            <div className="font-bold text-[14px]" style={isCozy ? cz : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans font-bold text-[14px]' : 'text-text-dark font-bold text-[14px]') : 'font-bold text-[14px]'}>Biology</div>
            <div className="text-[11px] font-semibold mt-[1px]" style={isCozy ? czSub : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans text-[11px] font-semibold mt-[1px]' : 'text-text-muted text-[11px] font-semibold mt-[1px]') : 'text-[11px] font-semibold mt-[1px]'}>Your strongest! 60 min/day to maintain the lead</div>
            <BarTrack pct={bioPct} />
          </div>
          <div className="font-extrabold text-base min-w-[60px] text-right" style={isCozy ? { ...cz, color: '#B5302A' } : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans font-extrabold text-base min-w-[60px] text-right' : 'font-baloo text-[#0F7A4E] font-extrabold text-base min-w-[60px] text-right') : 'font-extrabold text-base min-w-[60px] text-right'}>
            {scores.length > 0 ? `${lastScore.bio}/360` : '—'}
          </div>
        </div>

        {/* Physics */}
        <div className="flex items-center gap-[14px] mb-4">
          <div className="text-[22px] w-9 text-center">⚡</div>
          <div className="flex-1">
            <div className="font-bold text-[14px]" style={isCozy ? cz : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans font-bold text-[14px]' : 'text-text-dark font-bold text-[14px]') : 'font-bold text-[14px]'}>Physics</div>
            <div className="text-[11px] font-semibold mt-[1px]" style={isCozy ? czSub : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans text-[11px] font-semibold mt-[1px]' : 'text-text-muted text-[11px] font-semibold mt-[1px]') : 'text-[11px] font-semibold mt-[1px]'}>Time management key — 2-min/Q discipline wins here</div>
            <BarTrack pct={phyPct} cozyFill="#2945A8" />
          </div>
          <div className="font-extrabold text-base min-w-[60px] text-right" style={isCozy ? { ...cz, color: '#2945A8' } : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans font-extrabold text-base min-w-[60px] text-right' : 'font-baloo text-blue font-extrabold text-base min-w-[60px] text-right') : 'font-extrabold text-base min-w-[60px] text-right'}>
            {scores.length > 0 ? `${lastScore.phy}/180` : '—'}
          </div>
        </div>

        {/* Chemistry */}
        <div className="flex items-center gap-[14px]">
          <div className="text-[22px] w-9 text-center">🧪</div>
          <div className="flex-1">
            <div className="font-bold text-[14px]" style={isCozy ? cz : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans font-bold text-[14px]' : 'text-text-dark font-bold text-[14px]') : 'font-bold text-[14px]'}>Chemistry</div>
            <div className="text-[11px] font-semibold mt-[1px]" style={isCozy ? czSub : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] opacity-70 font-sans text-[11px] font-semibold mt-[1px]' : 'text-text-muted text-[11px] font-semibold mt-[1px]') : 'text-[11px] font-semibold mt-[1px]'}>High effort → high reward. Best ROI subject in 10 days</div>
            <BarTrack pct={chePct} cozyFill="#B5302A" />
          </div>
          <div className="font-extrabold text-base min-w-[60px] text-right" style={isCozy ? { ...cz, color: '#B5302A' } : {}} className={!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans font-extrabold text-base min-w-[60px] text-right' : 'font-baloo text-coral font-extrabold text-base min-w-[60px] text-right') : 'font-extrabold text-base min-w-[60px] text-right'}>
            {scores.length > 0 ? `${lastScore.che}/180` : '—'}
          </div>
        </div>

        {/* Log scores section */}
        <div
          className={`mt-5 p-4 ${!isCozy ? (theme === 'kawaii' ? 'bg-[#FDE8E8] border-2 border-[#F4B8C1] rounded-none' : 'bg-cream-dark rounded-2xl') : ''}`}
          style={isCozy ? { background: '#F5F0E8', border: '1.5px solid #D8CEBC', borderRadius: '6px', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
        >
          <div
            className={`text-[12px] font-extrabold uppercase tracking-[1px] mb-3 ${!isCozy ? (theme === 'kawaii' ? 'font-sans text-[#5A3A3A]' : 'font-baloo text-text-muted') : ''}`}
            style={isCozy ? { color: 'rgba(58,46,42,0.6)', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
          >
            Log Today's Mock Score
          </div>
          <div className="grid grid-cols-3 gap-2.5 mb-4">
            {[
              { key: 'bio', label: '🌿 Bio (/360)', val: inBio, subject: 'bio' },
              { key: 'phy', label: '⚡ Phy (/180)', val: inPhy, subject: 'phy' },
              { key: 'che', label: '🧪 Che (/180)', val: inChe, subject: 'che' },
            ].map(({ key, label, val, subject }) => (
              <div key={key} className="flex flex-col gap-1.5">
                <label
                  className={`text-[10px] font-bold uppercase tracking-[0.6px] text-center ${!isCozy ? (theme === 'kawaii' ? 'text-[#5A3A3A] font-sans' : 'text-text-muted') : ''}`}
                  style={isCozy ? czSub : {}}
                >{label}</label>
                <div
                  onClick={() => handleOpenModal(subject)}
                  className={`py-2 px-1 font-bold text-[18px] text-center cursor-pointer transition-colors duration-200 ${!isCozy ? (theme === 'kawaii' ? 'bg-white border-2 border-[#F4B8C1] text-[#5A3A3A] font-sans rounded-none shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] hover:border-[#5A3A3A]' : 'bg-white border-2 border-cream-dark rounded-xl font-baloo text-text-dark hover:border-blue-light') : ''}`}
                  style={isCozy ? { background: 'rgba(255,255,255,0.90)', border: '1.5px solid #D8CEBC', borderRadius: '4px', color: '#3A2E2A', fontFamily: "'Courier Prime','Courier New',monospace" } : {}}
                >
                  {val === '' ? '-' : val}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handleLog}
            className={`w-full border-none p-3 font-bold text-[15px] cursor-pointer transition-all duration-150 active:translate-y-[2px] ${!isCozy ? (theme === 'kawaii' ? 'bg-[#7DDFC3] text-[#5A3A3A] rounded-none border-2 border-[#5A3A3A] shadow-[2px_2px_0_#5A3A3A] active:shadow-none font-sans' : 'bg-blue text-white rounded-[14px] font-baloo shadow-[0_4px_0_#1a2e80] hover:-translate-y-0.5 hover:shadow-[0_6px_0_#1a2e80] active:translate-y-0.5 active:shadow-[0_2px_0_#1a2e80]') : ''}`}
            style={isCozy ? { background: '#B5302A', color: '#F5F0E8', borderRadius: '6px', border: 'none', fontFamily: "'Courier Prime','Courier New',monospace", boxShadow: '0 2px 0 #8B1A14' } : {}}
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
