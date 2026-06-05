import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  
  useEffect(() => {
    // Only apply on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      if (outerRef.current) outerRef.current.style.display = 'none';
      if (innerRef.current) innerRef.current.style.display = 'none';
      return;
    }

    const cursorOuter = outerRef.current;
    const cursorInner = innerRef.current;
    
    let isStuck = false;
    let mouse = { x: -100, y: -100 };

    let cursorOuterOriginalState = {
      width: 24,
      height: 24,
    };

    const updateCursorFixedPosition = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handlePointerDown = () => {
      gsap.to(cursorInner, { scale: 2, duration: 0.15 });
    };

    const handlePointerUp = () => {
      gsap.to(cursorInner, { scale: 1, duration: 0.15 });
    };

    document.body.addEventListener('pointermove', updateCursorFixedPosition);
    document.body.addEventListener('pointerdown', handlePointerDown);
    document.body.addEventListener('pointerup', handlePointerUp);

    let raf;
    const updateCursor = () => {
      gsap.set(cursorInner, {
        x: mouse.x,
        y: mouse.y,
      });

      if (!isStuck) {
        gsap.to(cursorOuter, {
          duration: 0.15,
          x: mouse.x - cursorOuterOriginalState.width / 2,
          y: mouse.y - cursorOuterOriginalState.height / 2,
        });
      }
      raf = requestAnimationFrame(updateCursor);
    };
    updateCursor();

    const handleMouseEnter = (e) => {
      isStuck = true;
      const targetBox = e.currentTarget.getBoundingClientRect();
      const style = window.getComputedStyle(e.currentTarget);
      const borderRadius = style.borderRadius !== '0px' ? style.borderRadius : '8px';
      
      gsap.to(cursorOuter, {
        duration: 0.2,
        x: targetBox.left,
        y: targetBox.top,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: borderRadius,
        backgroundColor: 'rgba(247, 134, 96, 0.15)', // Coral with opacity
        borderColor: 'transparent'
      });
    };

    const handleMouseLeave = () => {
      isStuck = false;
      gsap.to(cursorOuter, {
        duration: 0.2,
        width: cursorOuterOriginalState.width,
        height: cursorOuterOriginalState.height,
        borderRadius: '50%',
        backgroundColor: 'transparent',
        borderColor: 'rgba(247, 134, 96, 0.8)' // Coral border
      });
    };

    const attachHoverEvents = () => {
      const interactives = document.querySelectorAll('button, a, select, input, .cursor-pointer, [role="button"]');
      interactives.forEach(el => {
        el.removeEventListener('pointerenter', handleMouseEnter);
        el.removeEventListener('pointerleave', handleMouseLeave);
        el.addEventListener('pointerenter', handleMouseEnter);
        el.addEventListener('pointerleave', handleMouseLeave);
      });
    };
    
    // Observe DOM mutations to attach to newly added elements
    const observer = new MutationObserver(() => {
      attachHoverEvents();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    attachHoverEvents();

    return () => {
      document.body.removeEventListener('pointermove', updateCursorFixedPosition);
      document.body.removeEventListener('pointerdown', handlePointerDown);
      document.body.removeEventListener('pointerup', handlePointerUp);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={outerRef} 
        className="fixed top-0 left-0 w-[24px] h-[24px] rounded-full border-[1.5px] border-coral z-[10001] pointer-events-none hidden md:block"
        style={{ willChange: 'transform, width, height' }}
      />
      <div 
        ref={innerRef} 
        className="fixed top-0 left-0 w-[8px] h-[8px] rounded-full bg-coral z-[10001] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ willChange: 'transform' }}
      />
    </>
  );
};
