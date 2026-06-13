import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTheme = create(
  persist(
    (set) => ({
      theme: 'default', // 'default' | 'kawaii'
      isBooting: false,

      toggleTheme: () => {
        set({ isBooting: true });
        setTimeout(() => {
          set((state) => ({
            theme: state.theme === 'default' ? 'kawaii' : 'default',
          }));
          setTimeout(() => {
            set({ isBooting: false });
          }, 1200);
        }, 1200);
      },
    }),
    { name: 'nitu-theme' }
  )
);
