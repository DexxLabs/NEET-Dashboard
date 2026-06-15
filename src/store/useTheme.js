import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// localStorage keys:
//   'nitu-theme'            — persisted theme value (managed by zustand persist)
//   'nitu-cozy-booted'      — set to 'true' after the cozy boot sequence completes;
//                             cleared when toggling AWAY from cozy so next switch
//                             replays the full boot sequence
// sessionStorage keys:
//   'nitu-cozy-just-toggled' — set when toggleTheme() switches TO cozy;
//                              read by BootScreen to distinguish toggle vs refresh

export const useTheme = create(
  persist(
    (set, get) => ({
      theme: 'default', // 'default' | 'kawaii' | 'cozy'
      bootingTo: null,  // null | 'default' | 'kawaii' | 'cozy'

      setThemeAction: (nextTheme) => {
        const currentTheme = get().theme;
        if (currentTheme === nextTheme) return;

        // When leaving cozy, clear the boot-flag so next visit replays the sequence
        if (currentTheme === 'cozy') {
          localStorage.removeItem('nitu-cozy-booted');
        }

        // Signal to BootScreen that this is a toggle (not a refresh)
        if (nextTheme === 'cozy') {
          sessionStorage.setItem('nitu-cozy-just-toggled', 'true');
        }

        // Start the boot sequence for the specific theme
        set({ bootingTo: nextTheme });
        
        // Wait a tiny bit to allow boot screen to mount, then change the underlying theme.
        // This ensures the background app is styled correctly when the boot screen disappears.
        setTimeout(() => {
          set({ theme: nextTheme });
        }, 100);
      },

      toggleTheme: () => {
        const currentTheme = get().theme;
        const nextTheme =
          currentTheme === 'default' ? 'kawaii'
          : currentTheme === 'kawaii' ? 'cozy'
          : 'default';
        
        get().setThemeAction(nextTheme);
      },

      completeBoot: () => {
        set({ bootingTo: null });
      }
    }),
    { name: 'nitu-theme' }
  )
);
