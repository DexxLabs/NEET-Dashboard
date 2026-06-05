import React from 'react';
import { useStore } from '../../store/useStore';

export const StatCard = () => {
  const scores = useStore((state) => state.scores);
  const lastScore = scores.length > 0 ? scores[scores.length - 1] : { bio: '—', phy: '—', che: '—', total: '—' };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Bio */}
      <div className="bg-white rounded-[20px] p-5 border-2 border-[#3ECFA0] transition-transform duration-200 hover:-translate-y-[3px]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-[#C8F0E0]">🌿</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-text-muted mb-1">Biology</div>
        <div className="font-baloo font-extrabold text-[28px] text-text-dark leading-none">{lastScore.bio}</div>
        <div className="text-[12px] text-text-muted font-semibold mt-0.5">Target: 300+ / 360</div>
        <div className="inline-block text-[11px] font-bold py-[3px] px-2 rounded-pill mt-2 bg-[#DFFFF0] text-[#0F7A4E]">Your strength 💪</div>
      </div>
      {/* Phy */}
      <div className="bg-white rounded-[20px] p-5 border-2 border-blue-light transition-transform duration-200 hover:-translate-y-[3px]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-blue-pale">⚡</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-text-muted mb-1">Physics</div>
        <div className="font-baloo font-extrabold text-[28px] text-text-dark leading-none">{lastScore.phy}</div>
        <div className="text-[12px] text-text-muted font-semibold mt-0.5">Target: 130+ / 180</div>
        <div className="inline-block text-[11px] font-bold py-[3px] px-2 rounded-pill mt-2 bg-[#FFF0E0] text-[#B05A00]">Needs timed practice</div>
      </div>
      {/* Che */}
      <div className="bg-white rounded-[20px] p-5 border-2 border-coral transition-transform duration-200 hover:-translate-y-[3px]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-[#FFE4D8]">🧪</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-text-muted mb-1">Chemistry</div>
        <div className="font-baloo font-extrabold text-[28px] text-text-dark leading-none">{lastScore.che}</div>
        <div className="text-[12px] text-text-muted font-semibold mt-0.5">Target: 130+ / 180</div>
        <div className="inline-block text-[11px] font-bold py-[3px] px-2 rounded-pill mt-2 bg-[#FFF0E0] text-[#B05A00]">Effort = Marks 🔑</div>
      </div>
      {/* Total */}
      <div className="bg-blue rounded-[20px] p-5 border-2 border-yellow-deep transition-transform duration-200 hover:-translate-y-[3px]">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[22px] mb-3 bg-yellow/20">🏆</div>
        <div className="text-[12px] font-bold uppercase tracking-[0.8px] text-white/60 mb-1">Latest Mock</div>
        <div className="font-baloo font-extrabold text-[28px] text-yellow leading-none">{lastScore.total}</div>
        <div className="text-[12px] text-white/50 font-semibold mt-0.5">Goal: 600+ / 720</div>
      </div>
    </div>
  );
};
