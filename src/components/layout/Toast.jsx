import React from 'react';
import { useStore } from '../../store/useStore';
import { useTheme } from '../../store/useTheme';

export const Toast = () => {
  const toastQueue = useStore((state) => state.toastQueue);
  const popToast = useStore((state) => state.popToast);
  const theme = useTheme((state) => state.theme);
  const [currentToast, setCurrentToast] = React.useState(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (toastQueue.length > 0 && !currentToast) {
      setCurrentToast(toastQueue[0]);
      setShow(true);
    }
  }, [toastQueue, currentToast]);

  React.useEffect(() => {
    let nextTimer;
    if (currentToast) {
      const hideTimer = setTimeout(() => {
        setShow(false);
        nextTimer = setTimeout(() => { setCurrentToast(null); popToast(); }, 400);
      }, 2000);
      return () => { clearTimeout(hideTimer); if (nextTimer) clearTimeout(nextTimer); };
    }
  }, [currentToast, popToast]);

  const toastStyle =
    theme === 'kawaii'
      ? 'bg-[#FDE8E8] border-[#F4B8C1] text-[#5A3A3A] font-sans rounded-none shadow-[4px_4px_0_rgba(90,58,58,0.2)] border-[3px]'
      : theme === 'cozy'
      ? 'border-[3px] font-mono'
      : 'bg-blue text-white border-yellow rounded-pill font-baloo border-[3px]';

  const cozyStyle = theme === 'cozy'
    ? { background: 'rgba(255,255,255,0.95)', border: '1.5px solid #D8CEBC', borderRadius: '6px', color: '#B5302A', fontFamily: "'Courier Prime','Courier New',monospace", boxShadow: '0 4px 16px rgba(58,46,42,0.12)' }
    : {};

  return (
    <div
      className={`fixed bottom-6 left-1/2 py-3.5 px-6 font-bold text-[15px] z-[9999] whitespace-nowrap pointer-events-none transition-transform duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${show ? '-translate-x-1/2 translate-y-0' : '-translate-x-1/2 translate-y-[120px]'} ${toastStyle}`}
      style={cozyStyle}
    >
      {currentToast}
    </div>
  );
};
