import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
            return {
              lastLoginDate: currentLogicalDate,
              doneQuests: {},
              questsDone: 0,
              dailyTasks: [...DEFAULT_TASKS]
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
          
          const newTasks = state.dailyTasks.map(t => t.id === id ? { ...t, done: !isDone } : t);
          const totalDone = newTasks.filter(t => t.done).length;
          
          let streakToast = null;
          if (!isDone) {
             get().showToast(`🎉 +${xp} XP! Keep going Nitu!`);
             if (totalDone >= 4 && state.streak < 15) { // simplified streak logic based on total done today
               newStreak = state.streak + 1;
               streakToast = `🔥 Streak! Day ${newStreak} done!`;
             }
          }

          const partial = { xp: newXP, streak: newStreak, dailyTasks: newTasks };
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
