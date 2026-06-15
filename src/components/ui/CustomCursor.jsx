import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../store/useTheme';

export const CustomCursor = () => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const chaserWrapperRef = useRef(null);
  const kittyImgRef = useRef(null);
  const theme = useTheme(state => state.theme);
  
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (wrapperRef.current) wrapperRef.current.style.display = 'none';
      if (chaserWrapperRef.current) chaserWrapperRef.current.style.display = 'none';
      return;
    }

    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    
    // Physics state for leaning
    let currentRotation = 0;
    let rotationVelocity = 0;
    let lastX = window.innerWidth / 2;

    const onMove = (e) => {
      // Move the cursor dot instantly
      gsap.set(wrapper, { x: e.clientX, y: e.clientY });

      // Make Hello Kitty chase the cursor with a delay
      if (chaserWrapperRef.current) {
        gsap.to(chaserWrapperRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.7, // the requested slight delay
          ease: "power2.out"
        });

        // Add momentum based on movement speed (lean into the run)
        const dx = e.clientX - lastX;
        rotationVelocity += dx * 0.4;
      }
      
      lastX = e.clientX;
    };

    const tick = () => {
      if (!kittyImgRef.current) return;
      
      // Spring physics: pull back upright
      rotationVelocity -= currentRotation * 0.12; // stiffness
      rotationVelocity *= 0.82; // damping
      
      currentRotation += rotationVelocity;
      
      // Hard bounds with bounce
      if (currentRotation > 45) {
        currentRotation = 45;
        rotationVelocity *= -0.4;
      } else if (currentRotation < -45) {
        currentRotation = -45;
        rotationVelocity *= -0.4;
      }
      
      gsap.set(kittyImgRef.current, { rotation: currentRotation });
    };

    gsap.ticker.add(tick);

    const onDown = () => {
      gsap.to(dot, { scale: 2.5, duration: 0.15 });
      if (kittyImgRef.current) {
        gsap.to(kittyImgRef.current, { scale: 0.8, duration: 0.15 });
      }
    };

    const onUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.15 });
      if (kittyImgRef.current) {
        gsap.to(kittyImgRef.current, { scale: 1, duration: 0.4, ease: "elastic.out(1.5, 0.4)" });
      }
    };

    document.body.addEventListener('pointermove', onMove);
    document.body.addEventListener('pointerdown', onDown);
    document.body.addEventListener('pointerup', onUp);

    return () => {
      document.body.removeEventListener('pointermove', onMove);
      document.body.removeEventListener('pointerdown', onDown);
      document.body.removeEventListener('pointerup', onUp);
      gsap.ticker.remove(tick);
    };
  }, [theme]); // re-run if theme changes so refs attach properly

  return (
    <>
      {/* The Dot Wrapper (moves instantly) */}
      <div 
        ref={wrapperRef} 
        className="fixed top-0 left-0 z-[10002] pointer-events-none hidden md:block"
        style={{ willChange: 'transform' }}
      >
        <div 
          ref={dotRef}
          className={`absolute w-[8px] h-[8px] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm ${theme === 'kawaii' ? 'bg-[#FF91A4]' : theme === 'cozy' ? 'bg-[#B5302A]' : 'bg-coral'}`} 
        />
      </div>

      {/* The Chasing Hello Kitty (Cozy Theme Only) */}
      {theme === 'cozy' && (
        <div 
          ref={chaserWrapperRef}
          className="fixed top-0 left-0 z-[10001] pointer-events-none hidden md:block"
          style={{ willChange: 'transform' }}
        >
          <img 
            ref={kittyImgRef}
            src="/hellokitty.png" 
            alt="Hello Kitty" 
            className="w-[32px] drop-shadow-[0_4px_6px_rgba(58,46,42,0.25)]"
            draggable="false"
            style={{ 
              transform: 'translate(-50%, 6px)', // perfectly centered below the cursor
              transformOrigin: 'bottom center', // lean from her feet
              willChange: 'transform'
            }}
          />
        </div>
      )}
    </>
  );
};
