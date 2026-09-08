export const calculateStreak = (habitId, completions) => {
  const habitCompletions = completions.filter(
    (completion) => completion.habitId === habitId
  );

  const completedDates = habitCompletions
    .filter((completion) => completion.completed)
    .map((completion) => completion.date);

  const today = new Date();

  let streak = 0;

  const todayString = today.toISOString().split('T')[0];

  if (!completedDates.includes(todayString)) {
    return 0;
  }
  let currentDate = new Date(today);
  while (true) {
  const dateString = currentDate.toISOString().split('T')[0];

  if (completedDates.includes(dateString)) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  } else {
    break;
  }
}
return streak;
};