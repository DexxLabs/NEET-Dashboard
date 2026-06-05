export const getLogicalDate = () => {
  const now = new Date();
  if (now.getHours() < 3) {
    now.setDate(now.getDate() - 1);
  }
  return now.toDateString(); // e.g., "Thu Jun 06 2026"
};

export const getDaysToExam = () => {
  const now = new Date();
  if (now.getHours() < 3) {
    now.setDate(now.getDate() - 1);
  }
  now.setHours(0, 0, 0, 0);

  const examDate = new Date(2026, 5, 21); // June 21, 2026
  const diffTime = examDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};
