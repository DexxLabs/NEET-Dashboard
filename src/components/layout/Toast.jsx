import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';

export const Toast = () => {
  const toastQueue = useStore((state) => state.toastQueue);
  const popToast = useStore((state) => state.popToast);
  const theme = useTheme((state) => state.theme);
  const [currentToast, setCurrentToast] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (toastQueue.length > 0 && !currentToast) {
      setCurrentToast(toastQueue[0]);
      setShow(true);
      
      const hideTimer = setTimeout(() => {
        setShow(false);
        const nextTimer = setTimeout(() => {
          setCurrentToast(null);
          popToast();
        }, 400);
        return () => clearTimeout(nextTimer);
      }, 2600);
      
      return () => clearTimeout(hideTimer);
    }
  }, [toastQueue, currentToast, popToast]);

  return (
    <div 
      className={`fixed bottom-6 left-1/2 py-3.5 px-6 font-bold text-[15px] z-[9999] border-[3px] whitespace-nowrap pointer-events-none transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${show ? '-translate-x-1/2 translate-y-0' : '-translate-x-1/2 translate-y-[120px]'} ${theme === 'kawaii' ? 'bg-[#FDE8E8] border-[#F4B8C1] text-[#5A3A3A] font-sans rounded-none shadow-[4px_4px_0_rgba(90,58,58,0.2)]' : 'bg-blue text-white border-yellow rounded-pill font-baloo'}`}
    >
      {currentToast}
    </div>
  );
};
