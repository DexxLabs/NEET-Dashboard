import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../store/useTheme';
import { useMascot } from '../../store/useMascot';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const chaserRef = useRef(null);
  const kittyInnerRef = useRef(null);
  const theme = useTheme(state => state.theme);
  const message = useMascot(state => state.message);
  
  // Track last message for smooth fade-out
  const [lastMessage, setLastMessage] = useState('');
  useEffect(() => {
    if (message) setLastMessage(message);
  }, [message]);

  useEffect(() => {
    // Mobile touch devices fallback
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (chaserRef.current) chaserRef.current.style.display = 'none';
      return;
    }

    // Force clear any stuck HMR styles from previous imperative code
    if (dotRef.current) {
      dotRef.current.style.display = 'block';
      dotRef.current.style.left = '0px';
      dotRef.current.style.top = '0px';
    }
    if (chaserRef.current) {
      chaserRef.current.style.display = 'block';
      chaserRef.current.style.left = '0px';
      chaserRef.current.style.top = '0px';
    }

    let lastX = window.innerWidth / 2;
    let rotation = 0;
    let animationFrame;
    
    // State for smooth trailing
    let currentX = window.innerWidth / 2;
    let currentY = window.innerHeight / 2;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let isDown = false;

    const onMove = (e) => {
      // Instantly position the dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) scale(${isDown ? 2.5 : 1})`;
      }

      // Update target for the chaser to move towards
      targetX = e.clientX;
      targetY = e.clientY;

      // Calculate leaning physics based on horizontal movement speed
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      
      // Add lean based on horizontal movement
      rotation += dx * 0.5;
      
      // Hard cap the rotation
      if (rotation > 45) rotation = 45;
      if (rotation < -45) rotation = -45;
    };

    const physicsLoop = () => {
      // 1. Spring back rotation to upright
      rotation *= 0.85; // Damping
      
      if (kittyInnerRef.current) {
        kittyInnerRef.current.style.transform = `rotate(${rotation}deg)`;
      }
      
      // 2. LERP (Linear Interpolation) for buttery smooth position trailing
      // Reduced the multiplier to make her slower and increase the delay
      currentX += (targetX - currentX) * 0.035;
      currentY += (targetY - currentY) * 0.035;
      
      if (chaserRef.current) {
        chaserRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      
      animationFrame = requestAnimationFrame(physicsLoop);
    };

    const onDown = () => {
      isDown = true;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(2.5)`;
    };

    const onUp = () => {
      isDown = false;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%) scale(1)`;
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    physicsLoop();

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      cancelAnimationFrame(animationFrame);
    };
  }, [theme]);

  return (
    <>
      {/* The Dot Wrapper */}
      <div 
        ref={dotRef} 
        className={`fixed z-[10002] pointer-events-none w-[8px] h-[8px] rounded-full transition-transform duration-150 ease-out hidden md:block ${
          theme === 'kawaii' ? 'bg-[#FF91A4]' : theme === 'cozy' ? 'bg-[#B5302A]' : 'bg-coral'
        }`}
        style={{ 
          top: 0, left: 0,
          transform: 'translate3d(-50%, -50%, 0) scale(1)', 
          willChange: 'transform' 
        }}
      />

      {/* The Chasing Hello Kitty */}
      {theme === 'cozy' && (
        <div 
          ref={chaserRef}
          className="fixed z-[10001] pointer-events-none"
          style={{ 
            top: 0, left: 0,
            willChange: 'transform',
            transform: 'translate3d(-100px, -100px, 0)' // Start off screen
          }}
        >
          {/* Mascot Speech Bubble */}
          <div 
            className="absolute bottom-[-15px] left-0 min-w-[120px] max-w-[220px] bg-[#F5F0E8] text-[#3A2E2A] text-[12px] font-bold p-2 px-3 rounded-xl border-[1.5px] border-[#D8CEBC] shadow-[0_4px_12px_rgba(58,46,42,0.1)] mb-2 text-center transition-all duration-300 ease-out origin-bottom" 
            style={{ 
              fontFamily: "'Courier Prime','Courier New',monospace",
              opacity: message ? 1 : 0,
              transform: `translateX(-50%) scale(${message ? 1 : 0.8}) translateY(${message ? '0' : '10px'})`
            }}
          >
            {lastMessage}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#F5F0E8] border-b-[1.5px] border-r-[1.5px] border-[#D8CEBC] rotate-45"></div>
          </div>

          <div 
            ref={kittyInnerRef}
            className="absolute"
            style={{ 
              left: '-24px', // 48px width / 2
              top: '-10px',
              transformOrigin: 'bottom center',
              transition: 'transform 0.1s linear' // smooth out the frame ticks
            }}
          >
            <img 
              src="/hellokitty.png" 
              alt="Hello Kitty Companion" 
              className="w-[48px] drop-shadow-[0_4px_6px_rgba(58,46,42,0.25)]"
              draggable="false"
            />
          </div>
        </div>
      )}
    </>
  );
};
