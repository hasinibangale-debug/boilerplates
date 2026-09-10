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


export const calculateOverallStreak = (completions) => {
  const completedDates = new Set(
    completions
      .filter((completion) => completion.completed)
      .map((completion) => completion.date)
  );

  let streak = 0;
  const currentDate = new Date();

  while (true) {
    const dateString = currentDate.toISOString().split('T')[0];

    if (!completedDates.has(dateString)) {
      break;
    }

    streak++;

    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};
export const calculateBestStreak = (completions) => {
  const completedDates = new Set(
    completions
      .filter((completion) => completion.completed)
      .map((completion) => completion.date)
  );

  let bestStreak = 0;

  completedDates.forEach((dateString) => {
    const currentDate = new Date(dateString);

    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1);

    const previousDateString = previousDate
      .toISOString()
      .split('T')[0];

    // Only start counting when this is the first
    // completed day in a streak.
    if (!completedDates.has(previousDateString)) {
      let streak = 1;

      const nextDate = new Date(currentDate);
      nextDate.setDate(nextDate.getDate() + 1);

      while (true) {
        const nextDateString = nextDate
          .toISOString()
          .split('T')[0];

        if (!completedDates.has(nextDateString)) {
          break;
        }

        streak++;
        nextDate.setDate(nextDate.getDate() + 1);
      }

      bestStreak = Math.max(bestStreak, streak);
    }
  });

  return bestStreak;
};