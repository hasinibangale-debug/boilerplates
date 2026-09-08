import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';

function Calendar() {
  const { habits, completions } = useHabit();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const getDateString = (day) => {
    if (!day) return null;

    const monthString = String(month + 1).padStart(2, '0');
    const dayString = String(day).padStart(2, '0');

    return `${year}-${monthString}-${dayString}`;
  };

  const wasHabitActiveOnDate = (habit, dateString) => {
    const createdDate = habit.createdAt
      ? habit.createdAt.split('T')[0]
      : null;

    const deletedDate = habit.deletedAt
      ? habit.deletedAt.split('T')[0]
      : null;

    if (createdDate && dateString < createdDate) {
      return false;
    }

   if (deletedDate && dateString > deletedDate) {
  return false;
}
    return true;
  };

  const hasCompletedHabit = (day) => {
  const dateString = getDateString(day);

  return habits
    .filter((habit) => wasHabitActiveOnDate(habit, dateString))
    .some((habit) =>
      completions.some(
        (completion) =>
          completion.habitId === habit.id &&
          completion.date === dateString &&
          completion.completed
      )
    );
};

  const getCompletedCount = (day) => {
    const dateString = getDateString(day);

    const activeHabits = habits.filter((habit) =>
      wasHabitActiveOnDate(habit, dateString)
    );

    return activeHabits.filter((habit) =>
      completions.some(
        (completion) =>
          completion.habitId === habit.id &&
          completion.date === dateString &&
          completion.completed
      )
    ).length;
  };

  const getActiveHabitCount = (day) => {
    const dateString = getDateString(day);
    return habits.filter((habit) =>
      wasHabitActiveOnDate(habit, dateString)
    ).length;
  };

  return (
    <div className="p-4 bg-white rounded-xl border border-gray-200">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="px-3 py-2 border rounded-lg hover:bg-gray-50"
        >
          ← Previous
        </button>

        <h2 className="text-xl font-semibold">
          {currentDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        </h2>

        <button
          onClick={goToNextMonth}
          className="px-3 py-2 border rounded-lg hover:bg-gray-50"
        >
          Next →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const activeCount = day ? getActiveHabitCount(day) : 0;
          return (
            <div
              key={index}
              onClick={() => day && setSelectedDate(getDateString(day))}
              className={`h-12 border rounded-lg flex items-center justify-center cursor-pointer ${
                day && hasCompletedHabit(day) ? 'bg-green-500 text-white' : ''
              }`}
            >
              <div className="flex flex-col items-center">
                <span>{day}</span>

                {day && activeCount > 0 && (
                  <span
                    className={`text-xs ${
                      hasCompletedHabit(day) ? 'text-white' : 'text-green-600'
                    }`}
                  >
                    {getCompletedCount(day)}/{activeCount}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Date Details View */}
      {selectedDate && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">
            Habits on {selectedDate}
          </h3>

          <div className="mt-3 space-y-2">
            {habits
              .filter((habit) => wasHabitActiveOnDate(habit, selectedDate))
              .map((habit) => {
                const completion = completions.find(
                  (item) =>
                    item.habitId === habit.id &&
                    item.date === selectedDate
                );

                return (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <span>{habit.title}</span>

                    <div className="text-right">
                      <span>
                        {completion?.completed ? '✅ Completed' : '❌ Not completed'}
                      </span>

                      {completion?.note && (
                        <p className="text-sm text-gray-500 mt-1">
                          {completion.note}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;