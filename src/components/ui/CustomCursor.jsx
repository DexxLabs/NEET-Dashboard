import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '../../store/useTheme';
import { useMascot } from '../../store/useMascot';

export const CustomCursor = () => {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const chaserWrapperRef = useRef(null);
  const kittyImgRef = useRef(null);
  const theme = useTheme(state => state.theme);
  const isDetached = useMascot(state => state.isDetached);
  const message = useMascot(state => state.message);
  
  // Track last known mouse position for smooth re-attachment
  const lastMousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  
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
    let lastX = lastMousePos.current.x;

    const onMove = (e) => {
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      // Move the cursor dot instantly
      gsap.set(wrapper, { x: e.clientX, y: e.clientY });

      // Only chase if not detached to the focus timer
      if (!useMascot.getState().isDetached && chaserWrapperRef.current) {
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

  // Handle Mascot Detaching / Attaching animation
  useEffect(() => {
    if (!chaserWrapperRef.current) return;

    let updateEvent;

    if (isDetached) {
      const updatePosition = (duration = 0) => {
        const timerEl = document.getElementById('focus-timer');
        if (timerEl && chaserWrapperRef.current) {
          const rect = timerEl.getBoundingClientRect();
          // Tween her to sit on the top-right corner of the focus timer
          gsap.to(chaserWrapperRef.current, {
            x: rect.right - 50,
            y: rect.top - 10,
            duration: duration,
            ease: duration > 0 ? "power3.inOut" : "none"
          });
        }
      };

      updatePosition(1.2); // smooth initial flight

      updateEvent = () => updatePosition(0); // instant follow on scroll/resize
      window.addEventListener('scroll', updateEvent, true); // true for capture phase to catch all scrolls
      window.addEventListener('resize', updateEvent);
    } else {
      // Re-attach: tween back to the last known mouse position so she catches up smoothly
      gsap.to(chaserWrapperRef.current, {
        x: lastMousePos.current.x,
        y: lastMousePos.current.y,
        duration: 0.8,
        ease: "power2.out"
      });
    }

    return () => {
      if (updateEvent) {
        window.removeEventListener('scroll', updateEvent, true);
        window.removeEventListener('resize', updateEvent);
      }
    };
  }, [isDetached]);

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
          className="fixed top-0 left-0 z-[10001] pointer-events-none hidden md:flex flex-col items-center justify-end"
          style={{ willChange: 'transform' }}
        >
          {/* Mascot Speech Bubble */}
          {message && (
            <div className="absolute bottom-[40px] left-1/2 -translate-x-1/2 min-w-[120px] max-w-[220px] bg-[#F5F0E8] text-[#3A2E2A] text-[12px] font-bold p-2 px-3 rounded-xl border-[1.5px] border-[#D8CEBC] shadow-[0_4px_12px_rgba(58,46,42,0.1)] mb-2 text-center animate-in fade-in slide-in-from-bottom-2 duration-300" style={{ fontFamily: "'Courier Prime','Courier New',monospace" }}>
              {message}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#F5F0E8] border-b-[1.5px] border-r-[1.5px] border-[#D8CEBC] rotate-45"></div>
            </div>
          )}

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
