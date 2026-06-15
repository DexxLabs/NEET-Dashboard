import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../store/useTheme';

const COZY_MESSAGES = [
  'loading warm vibes...',
  'placing stickers...',
  'brewing something cozy...',
  'almost there, guddi...',
];

// ─── Cozy Boot Screen ────────────────────────────────────────────
const CozyBootScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'fly'

  useEffect(() => {
    // Progress bar fills over ~2s
    const progInterval = setInterval(() => {
      setProgress(p => {
        const next = p + (Math.random() * 18 + 8);
        return next >= 100 ? 100 : next;
      });
    }, 150);

    // Rotate status messages every 500ms
    const msgInterval = setInterval(() => {
      setMsgIndex(i => (i + 1) % COZY_MESSAGES.length);
    }, 500);

    // After 2.3s, start fly-away
    const flyTimer = setTimeout(() => {
      setPhase('fly');
      clearInterval(progInterval);
      clearInterval(msgInterval);
      // Signal complete after fly animation (300ms)
      setTimeout(() => {
        localStorage.setItem('nitu-cozy-booted', 'true');
        sessionStorage.removeItem('nitu-cozy-just-toggled');
        onComplete();
      }, 350);
    }, 2300);

    return () => {
      clearInterval(progInterval);
      clearInterval(msgInterval);
      clearTimeout(flyTimer);
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[200000] flex items-center justify-center"
      style={{ background: '#1A1610' }}
    >
      <div
        style={{
          background: '#F5F0E8',
          border: '1.5px solid #D8CEBC',
          borderRadius: '8px',
          padding: '28px 32px',
          width: '280px',
          fontFamily: "'Courier Prime','Courier New',monospace",
          animation: phase === 'fly'
            ? 'cozy-boot-fly 300ms ease-in forwards'
            : 'none',
        }}
      >
        {/* Hello Kitty-style sticker (SVG fallback for boot screen) */}
        <div className="flex justify-center mb-4">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {/* Strawberry hat */}
            <ellipse cx="50" cy="30" rx="28" ry="22" fill="#B5302A" />
            <ellipse cx="50" cy="12" rx="16" ry="8" fill="#3A6B35" />
            <circle cx="44" cy="32" r="2" fill="#8B1A14" />
            <circle cx="56" cy="28" r="1.5" fill="#8B1A14" />
            <circle cx="50" cy="38" r="1.5" fill="#8B1A14" />
            {/* Face */}
            <ellipse cx="50" cy="62" rx="26" ry="24" fill="#FEFEFE" stroke="#D8CEBC" strokeWidth="1.5" />
            {/* Ears */}
            <ellipse cx="30" cy="46" rx="7" ry="9" fill="#FEFEFE" stroke="#D8CEBC" strokeWidth="1.5" />
            <ellipse cx="70" cy="46" rx="7" ry="9" fill="#FEFEFE" stroke="#D8CEBC" strokeWidth="1.5" />
            {/* Red bow on right ear */}
            <ellipse cx="71" cy="40" rx="5" ry="3" fill="#B5302A" transform="rotate(-15 71 40)" />
            <ellipse cx="63" cy="38" rx="5" ry="3" fill="#B5302A" transform="rotate(15 63 38)" />
            <circle cx="67" cy="39" r="2" fill="#8B1A14" />
            {/* Eyes */}
            <circle cx="43" cy="60" r="3" fill="#3A2E2A" />
            <circle cx="57" cy="60" r="3" fill="#3A2E2A" />
            {/* Nose */}
            <ellipse cx="50" cy="67" rx="2.5" ry="1.5" fill="#F0C0A0" />
            {/* Whiskers */}
            <line x1="24" y1="65" x2="44" y2="67" stroke="#D8CEBC" strokeWidth="1" />
            <line x1="24" y1="69" x2="44" y2="69" stroke="#D8CEBC" strokeWidth="1" />
            <line x1="56" y1="67" x2="76" y2="65" stroke="#D8CEBC" strokeWidth="1" />
            <line x1="56" y1="69" x2="76" y2="69" stroke="#D8CEBC" strokeWidth="1" />
          </svg>
        </div>

        {/* Title */}
        <div className="text-center font-bold text-[16px] mb-4" style={{ color: '#3A2E2A' }}>
          cozy.grid v1.0
        </div>

        {/* Progress bar */}
        <div style={{ background: '#EDE8DE', borderRadius: '3px', height: '6px', overflow: 'hidden', marginBottom: '10px' }}>
          <div
            style={{
              background: '#B5302A',
              height: '100%',
              borderRadius: '3px',
              width: `${Math.min(100, progress)}%`,
              transition: 'width 0.15s ease-out',
            }}
          />
        </div>

        {/* Status message */}
        <div className="text-center text-[11px]" style={{ color: 'rgba(58,46,42,0.6)', minHeight: '16px' }}>
          {COZY_MESSAGES[msgIndex]}
        </div>
      </div>
    </div>
  );
};

// ─── Kawaii Boot Screen ──────────────────────────────────────────
const KawaiiBootScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 15 + Math.random() * 20;
      });
    }, 100);

    const switchTimer = setTimeout(() => {
      onComplete();
    }, 1200);

    return () => { clearInterval(interval); clearTimeout(switchTimer); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-[#FDE8E8] transition-opacity duration-300">
      <div className="bg-white border-2 border-[#F4B8C1] shadow-[4px_4px_0_rgba(244,184,193,0.5)] w-full max-w-[360px] flex flex-col">
        <div className="bg-[#F4B8C1] px-2 py-1 flex items-center justify-between border-b-2 border-[#F4B8C1]">
          <div className="text-[#5A3A3A] font-bold text-[12px] tracking-wide font-sans">kawaii_dialog.exe</div>
          <div className="flex gap-1 opacity-50 pointer-events-none">
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px]">_</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px]">□</button>
            <button className="w-3.5 h-3.5 bg-white border border-[#5A3A3A] shadow-[1px_1px_0_#5A3A3A] flex items-center justify-center text-[8px]">✕</button>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">✨</div>
            <div className="text-[#5A3A3A] font-bold text-[14px] font-sans">
              Booting kawaii.exe...
            </div>
          </div>
          <div className="w-full h-6 bg-[#FDE8E8] border-2 border-[#F4B8C1] shadow-[inset_2px_2px_0_rgba(90,58,58,0.1)] p-0.5">
            <div className="h-full bg-[#7DDFC3] transition-all duration-100 ease-out" style={{ width: `${Math.min(100, progress)}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Default Boot Screen ──────────────────────────────────────────
const DefaultBootScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); return 100; }
        return p + 20 + Math.random() * 20;
      });
    }, 100);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 800); // Shorter duration for default

    return () => { clearInterval(interval); clearTimeout(completeTimer); };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-cream transition-opacity duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-blue animate-pulse"></div>
        <div className="text-blue font-baloo font-bold text-2xl tracking-wide">
          Initializing Default...
        </div>
      </div>
      
      <div className="w-64 h-3 bg-cream-dark rounded-full overflow-hidden">
        <div 
          className="h-full bg-coral transition-all duration-100 ease-out rounded-full" 
          style={{ width: `${Math.min(100, progress)}%` }} 
        />
      </div>
    </div>
  );
};


// ─── Main BootScreen router ──────────────────────────────────────
export const BootScreen = () => {
  const { bootingTo, theme, completeBoot } = useTheme();
  
  // Track local state to decide if we should run cozy boot sequence on refresh
  const [runCozyRefreshBoot, setRunCozyRefreshBoot] = useState(false);
  const handledRef = useRef(false);

  useEffect(() => {
    // Determine if we need to run cozy boot on mount (refreshing page on cozy theme)
    if (theme === 'cozy' && !handledRef.current && bootingTo === null) {
      const alreadyBooted = localStorage.getItem('nitu-cozy-booted') === 'true';
      const justToggled   = sessionStorage.getItem('nitu-cozy-just-toggled') === 'true';

      if (!alreadyBooted || justToggled) {
        handledRef.current = true;
        setRunCozyRefreshBoot(true);
      }
    }
  }, [theme, bootingTo]);

  // If there's an active manual boot transition initiated by toggleTheme
  if (bootingTo === 'kawaii') {
    return <KawaiiBootScreen onComplete={completeBoot} />;
  }

  if (bootingTo === 'default') {
    return <DefaultBootScreen onComplete={completeBoot} />;
  }

  if (bootingTo === 'cozy') {
    return <CozyBootScreen onComplete={completeBoot} />;
  }

  // Handle refresh on cozy
  if (runCozyRefreshBoot) {
    return <CozyBootScreen onComplete={() => setRunCozyRefreshBoot(false)} />;
  }

  return null;
};
