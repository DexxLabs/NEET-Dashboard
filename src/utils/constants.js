export const LEVELS = [
  { n: 1, name: 'The <em>Curious Scholar</em> 🌸', desc: 'Every block completed is XP in the bank. Keep showing up!', min: 0, max: 200 },
  { n: 2, name: 'The <em>Determined Dreamer</em> 🌙', desc: 'Momentum is building. Those blocks are getting greener!', min: 200, max: 500 },
  { n: 3, name: 'The <em>Relentless Researcher</em> ⚡', desc: 'Mid-game energy. Physics starting to click? Keep going!', min: 500, max: 900 },
  { n: 4, name: 'The <em>Biology Beast</em> 🌿', desc: 'You are clearly not playing around anymore. 550 incoming!', min: 900, max: 1400 },
  { n: 5, name: 'The <em>Chemistry Conqueror</em> 🧪', desc: 'Formula sheets? You know these cold by now!', min: 1400, max: 2000 },
  { n: 6, name: 'The <em>Physics Phantom</em> 🌌', desc: 'Mechanics and Optics bow before you. Unstoppable!', min: 2000, max: 2700 },
  { n: 7, name: 'The <em>Concept Crusher</em> 🔨', desc: 'Every doubt is getting crushed. Your foundation is rock solid!', min: 2700, max: 3500 },
  { n: 8, name: 'The <em>Mock Test Master</em> 📝', desc: 'Mocks are your playground. Time management is on point.', min: 3500, max: 4400 },
  { n: 9, name: 'The <em>Revision Royalty</em> 👑', desc: 'Revising is second nature. You remember everything!', min: 4400, max: 5400 },
  { n: 10, name: 'The <em>Syllabus Slayer</em> ⚔️', desc: 'NCERT is completely at your fingertips. Flawless execution.', min: 5400, max: 6500 },
  { n: 11, name: 'The <em>Focus Fiend</em> 🎯', desc: 'Distractions? What are those? Pure, unadulterated focus.', min: 6500, max: 7700 },
  { n: 12, name: 'The <em>Exam Expert</em> 🏆', desc: 'You breathe exam patterns. PYQs are a breeze.', min: 7700, max: 9000 },
  { n: 13, name: 'The <em>Score Synthesizer</em> 📈', desc: 'Graph is only going up. 650+ is on the horizon.', min: 9000, max: 10400 },
  { n: 14, name: 'The <em>Topper in Training</em> 🏅', desc: 'Just polishing the rough edges. The white coat awaits.', min: 10400, max: 11900 },
  { n: 15, name: 'The <em>NEET Legend</em> 🌟', desc: 'Absolute mastery. The ultimate rank is yours to take!', min: 11900, max: 99999 }
];

export const getLevel = (xp) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].min) return LEVELS[i];
  }
  return LEVELS[0];
};

export const DEFAULT_TASKS = [
  { id: 'dt_phy', subject: 'Physics', chapterId: null, pyqs: 0, done: false, xp: 80, name: '⚡ Physics Goal' },
  { id: 'dt_che', subject: 'Chemistry', chapterId: null, pyqs: 0, done: false, xp: 80, name: '🧪 Chemistry Goal' },
  { id: 'dt_bot', subject: 'Botany', chapterId: null, pyqs: 0, done: false, xp: 50, name: '🌿 Botany Goal' },
  { id: 'dt_zoo', subject: 'Zoology', chapterId: null, pyqs: 0, done: false, xp: 50, name: '🦁 Zoology Goal' },
  { id: 'dt_mock', subject: 'Mock Test', chapterId: null, pyqs: 0, done: false, xp: 150, name: '📝 Full Mock Test' },
  { id: 'dt_fun', subject: 'Self Care', chapterId: null, pyqs: 0, done: false, xp: 50, name: '💖 Spend time doing what you love' }
];

export const INITIAL_STATE = {
  xp: 0,
  streak: 0,
  day: 1,
  scores: [],
  badges: { streak3: false, streak7: false, s500: false, s550: false, s600: false, bio: false, allq: false },
  questsDone: 0,
  toastQueue: [],
  completedChapters: {},
  dailyTasks: [...DEFAULT_TASKS],
  lastLoginDate: null,
  streakClaimedToday: false
};
