import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../store/useTheme';

export const CustomCursor = () => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const keychainRef = useRef(null);
  const theme = useTheme(state => state.theme);
  
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (wrapperRef.current) wrapperRef.current.style.display = 'none';
      return;
    }

    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    
    let lastX = 0;
    let timeout;

    const onMove = (e) => {
      // Move the entire wrapper instantly
      gsap.set(wrapper, { x: e.clientX, y: e.clientY });

      // Calculate swinging physics for the keychain
      if (keychainRef.current) {
        const dx = e.clientX - lastX;
        let targetRotation = dx * 1.2; // Swing multiplier (positive dx = swings right/left opposite, wait: dragging right means bottom drags left, so negative rotation! Let's use dx * -1.2)
        targetRotation = Math.max(-50, Math.min(50, targetRotation * -1));
        
        gsap.to(keychainRef.current, {
          rotation: targetRotation,
          duration: 0.1,
          ease: "none"
        });

        // Reset to 0 with a bounce if stopped moving
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          gsap.to(keychainRef.current, { rotation: 0, duration: 1.2, ease: "elastic.out(1.5, 0.2)" });
        }, 30);
      }
      
      lastX = e.clientX;
    };

    const onDown = () => {
      gsap.to(dot, { scale: 2.5, duration: 0.15 });
    };

    const onUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.15 });
    };

    document.body.addEventListener('pointermove', onMove);
    document.body.addEventListener('pointerdown', onDown);
    document.body.addEventListener('pointerup', onUp);

    return () => {
      document.body.removeEventListener('pointermove', onMove);
      document.body.removeEventListener('pointerdown', onDown);
      document.body.removeEventListener('pointerup', onUp);
      clearTimeout(timeout);
    };
  }, [theme]); // re-run if theme changes so keychainRef attaches properly

  return (
    <div 
      ref={wrapperRef} 
      className="fixed top-0 left-0 z-[10001] pointer-events-none hidden md:block"
      style={{ willChange: 'transform' }}
    >
      {/* The Dot */}
      <div 
        ref={dotRef}
        className={`absolute w-[8px] h-[8px] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm ${theme === 'kawaii' ? 'bg-[#FF91A4]' : theme === 'cozy' ? 'bg-[#B5302A]' : 'bg-coral'}`} 
      />

      {/* The Dangling Hello Kitty Keychain (Cozy Theme Only) */}
      {theme === 'cozy' && (
        <div 
          ref={keychainRef}
          className="absolute flex flex-col items-center"
          style={{ 
            left: '-20px', 
            top: '4px', 
            width: '40px', 
            transformOrigin: '50% -4px', // hinges perfectly at the cursor dot
            willChange: 'transform'
          }}
        >
          {/* Keychain string */}
          <div className="w-[1.5px] h-[16px] bg-[#B5302A] opacity-50 rounded-full mb-[2px]"></div>
          {/* Hello Kitty */}
          <img 
            src="/hellokitty.png" 
            alt="Hello Kitty" 
            className="w-[36px] drop-shadow-[0_4px_6px_rgba(58,46,42,0.15)]"
            draggable="false"
          />
        </div>
      )}
    </div>
  );
};
