import React, { useEffect, useState } from 'react';
import { useStore } from '../../store/useStore';

export const Toast = () => {
  const toastQueue = useStore((state) => state.toastQueue);
  const popToast = useStore((state) => state.popToast);
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
      className={`fixed bottom-6 left-1/2 bg-blue text-white py-3.5 px-6 rounded-pill font-baloo font-bold text-[15px] z-[9999] border-[3px] border-yellow whitespace-nowrap pointer-events-none transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${show ? '-translate-x-1/2 translate-y-0' : '-translate-x-1/2 translate-y-[120px]'}`}
    >
      {currentToast}
    </div>
  );
};
