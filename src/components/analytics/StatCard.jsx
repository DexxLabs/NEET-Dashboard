import React from 'react';
import { useTheme } from '../../store/useTheme';
import { useStore } from '../../store/useStore';

const KawaiiStatItem = ({ title, icon, value, target, remark, color }) => (
  <div className="bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] flex flex-col">
    <div className="bg-[#F4B8C1] px-2 py-1 flex items-center justify-between border-b-2 border-[#F4B8C1]">
      <div className="text-[#5A3A3A] font-bold text-[12px] tracking-wide font-sans">{title.toLowerCase()}.exe</div>
      <div className="flex gap-1">
        <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">_</button>
        <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">□</button>
        <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px] active:translate-y-[1px] active:shadow-none active:translate-x-[1px] transition-all">✕</button>
      </div>
    </div>
    <div className="p-4 flex-1">
      <div className="text-[#5A3A3A] font-bold text-[12px] mb-1">{icon} {title}</div>
      <div className="font-bold text-[24px] text-[#5A3A3A] mb-1">{value}</div>
      <div className="text-[11px] text-[#5A3A3A] opacity-70 font-semibold mb-2">{target}</div>
      <div className="text-[11px] font-bold border border-[#F4B8C1] bg-[#FDE8E8] text-[#5A3A3A] px-1.5 py-0.5 inline-block">{remark}</div>
    </div>
  </div>
);

export const StatCard = () => {
  const scores = useStore((state) => state.scores);
  const theme = useTheme((state) => state.theme);
  const lastScore = scores.length > 0 ? scores[scores.length - 1] : { bio: '—', phy: '—', che: '—', total: '—' };

  if (theme === 'kawaii') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KawaiiStatItem title="Biology" icon="🌿" value={lastScore.bio} target="Target: 300+ / 360" remark="Your strength 💪" />
        <KawaiiStatItem title="Physics" icon="⚡" value={lastScore.phy} target="Target: 130+ / 180" remark="Needs practice" />
        <KawaiiStatItem title="Chemistry" icon="🧪" value={lastScore.che} target="Target: 130+ / 180" remark="Effort = Marks 🔑" />
        <KawaiiStatItem title="Mock_Score" icon="🏆" value={lastScore.total} target="Goal: 600+ / 720" remark="Latest Score" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Bio */}
      <div className="bg-white/70 backdrop-blur-md rounded-[20px] p-5 border-[1.5px] border-[#3ECFA0] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(62,207,160,0.2)]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-[#C8F0E0]">🌿</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-text-muted mb-1">Biology</div>
        <div className="font-baloo font-extrabold text-[28px] text-text-dark leading-none">{lastScore.bio}</div>
        <div className="text-[12px] text-text-muted font-semibold mt-0.5">Target: 300+ / 360</div>
        <div className="inline-block text-[11px] font-bold py-[3px] px-2 rounded-pill mt-2 bg-[#DFFFF0] text-[#0F7A4E]">Your strength 💪</div>
      </div>
      {/* Phy */}
      <div className="bg-white/70 backdrop-blur-md rounded-[20px] p-5 border-[1.5px] border-blue-light transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(61,95,199,0.2)]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-blue-pale">⚡</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-text-muted mb-1">Physics</div>
        <div className="font-baloo font-extrabold text-[28px] text-text-dark leading-none">{lastScore.phy}</div>
        <div className="text-[12px] text-text-muted font-semibold mt-0.5">Target: 130+ / 180</div>
        <div className="inline-block text-[11px] font-bold py-[3px] px-2 rounded-pill mt-2 bg-[#FFF0E0] text-[#B05A00]">Needs timed practice</div>
      </div>
      {/* Che */}
      <div className="bg-white/70 backdrop-blur-md rounded-[20px] p-5 border-[1.5px] border-coral transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(247,134,96,0.2)]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-[#FFE4D8]">🧪</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-text-muted mb-1">Chemistry</div>
        <div className="font-baloo font-extrabold text-[28px] text-text-dark leading-none">{lastScore.che}</div>
        <div className="text-[12px] text-text-muted font-semibold mt-0.5">Target: 130+ / 180</div>
        <div className="inline-block text-[11px] font-bold py-[3px] px-2 rounded-pill mt-2 bg-[#FFF0E0] text-[#B05A00]">Effort = Marks 🔑</div>
      </div>
      {/* Total */}
      <div className="bg-blue/90 backdrop-blur-md rounded-[20px] p-5 border-[1.5px] border-yellow-deep transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,204,122,0.25)]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-yellow/20">🏆</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-white/60 mb-1">Latest Mock</div>
        <div className="font-baloo font-extrabold text-[28px] text-yellow leading-none">{lastScore.total}</div>
        <div className="text-[12px] text-white/50 font-semibold mt-0.5">Goal: 600+ / 720</div>
      </div>
    </div>
  );
};
