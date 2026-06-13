import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { getLevel } from '../../utils/constants';
import mascotHappy from '../../assets/mascot_happy.png';
import mascotStudying from '../../assets/mascot_studying.png';
import mascotCheering from '../../assets/mascot_cheering.png';
import mascotProud from '../../assets/mascot_proud.png';
import stickerBoba from '../../assets/sticker_boba.png';
import stickerDripper from '../../assets/sticker_dripper.png';
import stickerIcecream from '../../assets/sticker_icecream.png';

// ─── Mascot image map ───
const MASCOT_IMAGES = {
  happy: mascotHappy,
  studying: mascotStudying,
  cheering: mascotCheering,
  proud: mascotProud,
};

// ─── Sticker callout component ───
const StickerCallout = ({ emoji, image, label, position, delay = 0 }) => (
  <div
    className="absolute flex flex-col items-center gap-0.5 animate-bounce pointer-events-none"
    style={{
      ...position,
      animationDuration: `${3 + Math.random() * 2}s`,
      animationDelay: `${delay}s`,
    }}
  >
    {image ? (
      <img src={image} alt={label} className="w-[32px] h-[32px] object-contain drop-shadow-sm" />
    ) : (
      <span className="text-[18px]">{emoji}</span>
    )}
    <span className="bg-white/90 backdrop-blur-sm text-[9px] font-bold text-text-dark px-1.5 py-0.5 rounded-md shadow-sm border border-white/60">
      {label}
    </span>
  </div>
);

// ─── Dynamic messages based on state ───
const getMascotState = (store) => {
  const { xp, streak, scores, dailyTasks, questsDone } = store;
  const doneTasks = dailyTasks?.filter(t => t.done).length || 0;
  const totalTasks = dailyTasks?.length || 0;
  const lv = getLevel(xp);
  const lastScore = scores?.length > 0 ? scores[scores.length - 1] : null;

  // Check if focus timer is running (from localStorage)
  let isFocusing = false;
  try {
    const timerState = JSON.parse(localStorage.getItem('focusTimerState') || '{}');
    isFocusing = timerState.isRunning || false;
  } catch (e) {}

  if (isFocusing) {
    return {
      mood: 'studying',
      messages: [
        "Shhh... we're studying! 📚",
        "Focus mode ON! You got this 💪",
        "Deep breath... one concept at a time 🌸",
        "I'm studying with you! Let's go! ✨",
        "No distractions! We're in the zone 🎯",
      ],
      stickers: [
        { image: stickerBoba, label: 'fuel up!' },
        { emoji: '🎯', label: 'focus' },
        { image: stickerIcecream, label: 'reward later' },
      ]
    };
  }

  if (doneTasks === totalTasks && totalTasks > 0) {
    return {
      mood: 'proud',
      messages: [
        "ALL TASKS DONE! You're incredible! 🎉",
        "Queen behavior! Every single task ✅",
        "I'm SO proud of you today! 👑✨",
        "600+ is written in your destiny! 🌟",
      ],
      stickers: [
        { image: stickerIcecream, label: 'treat time!' },
        { image: stickerDripper, label: 'snack break' },
        { image: stickerBoba, label: 'you earned it' },
      ]
    };
  }

  if (doneTasks > 0 && doneTasks < totalTasks) {
    const remaining = totalTasks - doneTasks;
    return {
      mood: 'cheering',
      messages: [
        `${doneTasks} done! Only ${remaining} more to go! 💪`,
        "You're on a roll! Keep checking them off! ✅",
        `Amazing progress! ${remaining} left — easy peasy! 🌸`,
        "Each task brings you closer to 600+! 🚀",
      ],
      stickers: [
        { image: stickerBoba, label: `${doneTasks}/${totalTasks}` },
        { image: stickerDripper, label: 'keep going' },
        { emoji: '💪', label: 'you can!' },
      ]
    };
  }

  if (lastScore && lastScore.total >= 550) {
    return {
      mood: 'cheering',
      messages: [
        `${lastScore.total}/720! That's amazing! 🎉`,
        "Your scores are on FIRE! 🔥",
        "600+ is SO close I can feel it! ✨",
      ],
      stickers: [
        { image: stickerIcecream, label: 'scores up' },
        { image: stickerBoba, label: 'on fire!' },
        { emoji: '🎯', label: `${lastScore.total}` },
      ]
    };
  }

  if (streak >= 3) {
    return {
      mood: 'cheering',
      messages: [
        `${streak}-day streak! Consistency is key! 🔥`,
        "Streak mode activated! Don't break it! 💪",
        `Day ${streak}! You're unstoppable! ⚡`,
      ],
      stickers: [
        { image: stickerDripper, label: `${streak} days` },
        { image: stickerIcecream, label: 'streak!' },
        { emoji: '💖', label: 'proud' },
      ]
    };
  }

  // Default idle state
  return {
    mood: 'happy',
    messages: [
      "Hey Nitu! Ready to study? 🌸",
      "Let's crush some chapters today! 📖",
      "You're going to smash that 600+! 💪",
      `Level ${lv.n}! Keep earning XP! ⚡`,
      "Start a task and I'll cheer you on! 🎀",
      "Every page you read counts! 📚✨",
      "Believe in yourself! You've got this! 🌟",
    ],
      stickers: [
        { image: stickerBoba, label: 'boba!' },
        { image: stickerDripper, label: 'snack' },
        { image: stickerIcecream, label: 'treat' },
      ]
  };
};

// ─── Main Mascot Component ───
export const Mascot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);

  const xp = useStore(state => state.xp);
  const streak = useStore(state => state.streak);
  const scores = useStore(state => state.scores);
  const dailyTasks = useStore(state => state.dailyTasks);
  const questsDone = useStore(state => state.questsDone);

  const doneTasks = dailyTasks?.filter(t => t.done).length || 0;
  const scoresLen = scores?.length || 0;

  const mascotState = useMemo(() => getMascotState({ xp, streak, scores, dailyTasks, questsDone }), [
    xp, streak, scoresLen, doneTasks, questsDone
  ]);

  // Rotate messages
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % mascotState.messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [mascotState.messages.length]);

  // Poll focus timer state every 2 seconds
  const [, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 2000);
    return () => clearInterval(interval);
  }, []);

  const currentMessage = mascotState.messages[messageIndex % mascotState.messages.length];
  const mascotImage = MASCOT_IMAGES[mascotState.mood] || MASCOT_IMAGES.happy;

  // Sticker positions around the mascot window
  const stickerPositions = [
    { top: '-16px', right: '-40px' },
    { top: '50%', right: '-45px' },
    { top: '-10px', left: '50%' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-[9999]">
      {/* Collapsed state: just the mascot face as a button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative w-[64px] h-[64px] rounded-full bg-[#FFF0EC] border-2 border-[#FFB5C5] shadow-[0_8px_30px_rgba(255,181,197,0.3)] hover:shadow-[0_12px_40px_rgba(255,181,197,0.5)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden"
          title="Talk to your study buddy!"
        >
          <img src={mascotImage} alt="Study Buddy" className="w-[56px] h-[56px] object-cover rounded-full" />
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral rounded-full border-2 border-white animate-pulse" />
          {/* Mini speech hint */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-full text-[9px] font-bold text-text-dark whitespace-nowrap shadow-sm border border-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
            click me! 💬
          </div>
        </button>
      )}

      {/* Expanded state: the retro window with mascot */}
      {isOpen && (
        <div className="animate-in fade-in slide-in-from-bottom-5 duration-300 relative">
          {/* Floating stickers around the window */}
          {mascotState.stickers.map((sticker, i) => (
            <StickerCallout
              key={`${sticker.label}-${i}`}
              emoji={sticker.emoji}
              label={sticker.label}
              position={stickerPositions[i] || {}}
              delay={i * 0.5}
            />
          ))}

          {/* Retro OS window */}
          <div className="w-[220px] bg-white/80 backdrop-blur-xl rounded-[16px] border-[1.5px] border-[#FFB5C5]/60 shadow-[0_12px_40px_rgba(255,181,197,0.25)] overflow-hidden">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#FFE8EE] border-b border-[#FFB5C5]/30">
              <span className="text-[9px] font-bold text-[#D4788C] tracking-wide">nitu_buddy.png</span>
              <div className="flex items-center gap-1.5">
                <div className="w-[10px] h-[10px] rounded-full bg-[#FFD1DC] border border-[#FFB5C5]/50" />
                <div className="w-[10px] h-[10px] rounded-full bg-[#FFE4A0] border border-[#FFD080]/50" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-[10px] h-[10px] rounded-full bg-[#FFB5C5] hover:bg-[#FF8FA3] transition-colors flex items-center justify-center text-[6px] text-white font-bold leading-none"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Speech bubble */}
            <div className="px-3 pt-2.5">
              <div className="relative bg-[#FFF5F7] rounded-xl px-3 py-2 border border-[#FFE0E8]">
                <p className="text-[11px] font-semibold text-text-dark leading-snug min-h-[28px]">
                  {currentMessage}
                </p>
                {/* Speech bubble pointer */}
                <div className="absolute -bottom-[6px] left-6 w-3 h-3 bg-[#FFF5F7] border-r border-b border-[#FFE0E8] rotate-45" />
              </div>
            </div>

            {/* Mascot image */}
            <div className="flex items-center justify-center py-3">
              <img
                src={mascotImage}
                alt="Study Buddy"
                className="w-[120px] h-[120px] object-contain drop-shadow-sm transition-all duration-500"
              />
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#FFF5F7] border-t border-[#FFE0E8]">
              <span className="text-[8px] font-bold text-[#D4788C] uppercase tracking-wider">
                {mascotState.mood === 'studying' ? '📖 Studying...' :
                 mascotState.mood === 'cheering' ? '🎉 Cheering!' :
                 mascotState.mood === 'proud' ? '👑 So proud!' :
                 '🌸 Ready!'}
              </span>
              <div className="flex gap-1">
                <div className="w-[6px] h-[6px] rounded-full bg-[#3ECFA0] animate-pulse" />
                <div className="w-[6px] h-[6px] rounded-full bg-[#FFB5C5]" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
