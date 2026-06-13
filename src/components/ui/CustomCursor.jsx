import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../store/useTheme';

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const theme = useTheme(state => state.theme);
  
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (dotRef.current) dotRef.current.style.display = 'none';
      return;
    }

    const dot = dotRef.current;

    const onMove = (e) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
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
    };
  }, []);

  return (
    <div 
      ref={dotRef} 
      className={`fixed top-0 left-0 w-[8px] h-[8px] rounded-full z-[10001] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block ${theme === 'kawaii' ? 'bg-[#FF91A4]' : 'bg-coral'}`}
      style={{ willChange: 'transform' }}
    />
  );
};
