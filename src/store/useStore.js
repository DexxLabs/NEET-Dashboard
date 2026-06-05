import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { db } from '../firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { INITIAL_STATE, DEFAULT_TASKS } from '../utils/constants';
import { getLogicalDate } from '../utils/dateUtils';

const checkBadges = (state, partial = {}) => {
  const s = { ...state, ...partial };
  const newBadges = { ...s.badges };
  let newXP = s.xp;
  let toastMsg = null;

  if (s.streak >= 3 && !newBadges.streak3) { newBadges.streak3 = true; toastMsg = '🏅 Badge: On Fire!'; }
  if (s.streak >= 7 && !newBadges.streak7) { newBadges.streak7 = true; toastMsg = '🌟 Badge: Star Streak!'; }
  
  if (s.scores.length > 0) {
    const last = s.scores[s.scores.length - 1];
    if (last.total >= 500 && !newBadges.s500) { newBadges.s500 = true; toastMsg = '⚡ Badge: Lightning — 500 scored!'; }
    if (last.total >= 550 && !newBadges.s550) { newBadges.s550 = true; toastMsg = '🚀 Badge: Rocket — 550 scored!'; }
    if (last.total >= 600 && !newBadges.s600) { newBadges.s600 = true; toastMsg = '👑 QUEEN BADGE! 600+ LEGEND!'; }
    if (last.bio >= 340 && !newBadges.bio) { newBadges.bio = true; toastMsg = '🌿 Bio Beast Badge unlocked!'; }
  }
  
  if (s.questsDone >= 5 && !newBadges.allq) {
    newBadges.allq = true; 
    newXP += 100;
    toastMsg = '🌟 ALL QUESTS DONE! +100 Bonus XP!';
  }

  return { badges: newBadges, xp: newXP, newToastMsg: toastMsg };
};

export const useStore = create(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      doneQuests: {},
      isHydrated: false,

      fetchFromFirebase: () => {
        if (!db) {
          set({ isHydrated: true });
          return;
        }
        onSnapshot(doc(db, "users", "nitu_progress"), (snap) => {
          if (snap.exists()) {
            window.__isUpdatingFromFirebase = true;
            const data = snap.data();
            
            // Ensure any newly added tasks appear immediately
            if (data.dailyTasks && data.dailyTasks.length < DEFAULT_TASKS.length) {
              const existingIds = data.dailyTasks.map(t => t.id);
              const missingTasks = DEFAULT_TASKS.filter(t => !existingIds.includes(t.id));
              data.dailyTasks = [...data.dailyTasks, ...missingTasks];
            }

            set({ ...data, isHydrated: true });
            // Let the synchronous subscriptions run before unlocking
            setTimeout(() => { window.__isUpdatingFromFirebase = false; }, 10);
          } else {
            set({ isHydrated: true });
          }
        }, (err) => {
          console.error("Firebase fetch error:", err);
          set({ isHydrated: true });
        });
      },

      showToast: (msg) => {
        set((state) => ({ toastQueue: [...state.toastQueue, msg] }));
      },
      popToast: () => {
        set((state) => ({ toastQueue: state.toastQueue.slice(1) }));
      },

      checkDayShift: () => {
        set((state) => {
          const currentLogicalDate = getLogicalDate();
          if (state.lastLoginDate !== currentLogicalDate) {
            let newStreak = state.streak;
            
            // Calculate yesterday's logical date
            const now = new Date();
            if (now.getHours() < 3) now.setDate(now.getDate() - 1);
            now.setDate(now.getDate() - 1); // Yesterday
            const yesterdayLogicalDate = now.toDateString();

            // If last login wasn't exactly yesterday, OR she logged in yesterday but didn't claim her streak
            if (state.lastLoginDate && (state.lastLoginDate !== yesterdayLogicalDate || !state.streakClaimedToday)) {
              newStreak = 0; // Streak broken
            }

            return {
              lastLoginDate: currentLogicalDate,
              doneQuests: {},
              questsDone: 0,
              dailyTasks: [...DEFAULT_TASKS],
              streakClaimedToday: false,
              streak: newStreak
            };
          }
          return state;
        });
      },

      toggleChapter: (chapterId) => {
        set((state) => {
          const isDone = !!state.completedChapters[chapterId];
          return {
            completedChapters: { ...state.completedChapters, [chapterId]: !isDone }
          };
        });
      },

      updateDailyTask: (id, updates) => {
        set((state) => ({
          dailyTasks: state.dailyTasks.map(t => t.id === id ? { ...t, ...updates } : t)
        }));
      },

      toggleDailyTask: (id, xp) => {
        set((state) => {
          const task = state.dailyTasks.find(t => t.id === id);
          if (!task) return state;
          
          const isDone = task.done;
          let newXP = isDone ? Math.max(0, state.xp - xp) : state.xp + xp;
          let newStreak = state.streak;
          let newStreakClaimed = state.streakClaimedToday;
          
          const newTasks = state.dailyTasks.map(t => t.id === id ? { ...t, done: !isDone } : t);
          const totalDone = newTasks.filter(t => t.done).length;
          
          let streakToast = null;
          if (!isDone) {
             get().showToast(`🎉 +${xp} XP! Keep going Nitu!`);
             if (totalDone >= 2 && !state.streakClaimedToday && state.streak < 15) {
               newStreak = state.streak + 1;
               newStreakClaimed = true;
               streakToast = `🔥 Streak! Day ${newStreak} done!`;
             }
          }

          const partial = { xp: newXP, streak: newStreak, streakClaimedToday: newStreakClaimed, dailyTasks: newTasks };
          const badgeUpdates = checkBadges(state, partial);
          
          if (streakToast) setTimeout(() => get().showToast(streakToast), 1300);
          if (badgeUpdates.newToastMsg) setTimeout(() => get().showToast(badgeUpdates.newToastMsg), 2600);

          return { ...partial, badges: badgeUpdates.badges, xp: badgeUpdates.xp };
        });
      },

      toggleQuest: (questId, xp) => {
        set((state) => {
          const isDone = !!state.doneQuests[questId];
          const newDone = { ...state.doneQuests, [questId]: !isDone };
          
          let newXP = isDone ? Math.max(0, state.xp - xp) : state.xp + xp;
          let newQuestsDone = isDone ? Math.max(0, state.questsDone - 1) : state.questsDone + 1;
          
          if (!isDone) get().showToast(`✅ Quest done! +${xp} XP!`);

          const partial = { xp: newXP, questsDone: newQuestsDone, doneQuests: newDone };
          const badgeUpdates = checkBadges(state, partial);
          
          if (badgeUpdates.newToastMsg) setTimeout(() => get().showToast(badgeUpdates.newToastMsg), 1200);

          return { ...partial, badges: badgeUpdates.badges, xp: badgeUpdates.xp };
        });
      },

      logScore: (bio, phy, che) => {
        set((state) => {
          const total = bio + phy + che;
          const newScore = { date: getLogicalDate(), bio, phy, che, total };
          const partial = { scores: [...state.scores, newScore], xp: state.xp + 50 };
          
          get().showToast(`📊 Logged! Total: ${total}/720 · +50 XP`);
          
          const badgeUpdates = checkBadges(state, partial);
          if (badgeUpdates.newToastMsg) setTimeout(() => get().showToast(badgeUpdates.newToastMsg), 1500);

          return { ...partial, badges: badgeUpdates.badges, xp: badgeUpdates.xp };
        });
      }
    }),
    {
      name: 'nituNeet2025',
    }
  )
);

// Subscribe to store changes to push to Firebase in the background
useStore.subscribe(async (state) => {
  if (!db || !state.isHydrated || window.__isUpdatingFromFirebase) return; // Prevent infinite loop

  
  try {
    const dataToSync = {
      xp: state.xp,
      streak: state.streak,
      badges: state.badges,
      completedChapters: state.completedChapters,
      scores: state.scores,
      lastLoginDate: state.lastLoginDate,
      dailyTasks: state.dailyTasks,
      doneQuests: state.doneQuests,
      questsDone: state.questsDone,
      streakClaimedToday: state.streakClaimedToday,
      lastUpdated: new Date().toISOString()
    };
    
    await setDoc(doc(db, "users", "nitu_progress"), dataToSync);
  } catch (err) {
    console.error("Firebase sync error:", err);
  }
});
