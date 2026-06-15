import { create } from 'zustand';

export const useMascot = create((set, get) => ({
  isDetached: false,
  message: null,
  
  // Internal timeout reference to clear previous messages
  _timeoutId: null,

  say: (msg, durationMs = 4000) => {
    const { _timeoutId } = get();
    if (_timeoutId) clearTimeout(_timeoutId);
    
    set({ message: msg });
    
    const newTimeout = setTimeout(() => {
      set({ message: null });
    }, durationMs);
    
    set({ _timeoutId: newTimeout });
  },

  detach: () => set({ isDetached: true }),
  
  attach: () => set({ isDetached: false }),
}));
