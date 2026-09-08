import React, { createContext, useContext, useState } from 'react';
import { mockTodayHabits } from '../mock/habitData';
import { mockCompletions } from '../mock/completionData';

// Create Context
const HabitContext = createContext(null);

// Provider Component
export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(mockTodayHabits);
  const [completions, setCompletions] = useState(mockCompletions);

  // Add a new habit
  const addHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  // Delete a habit by ID
  const deleteHabit = (idToDelete) => {
    setHabits((prevHabits) =>
      prevHabits.filter((habit) => habit.id !== idToDelete)
    );
  };

  // Update an existing habit by ID
  const updateHabit = (idToUpdate, updatedData) => {
    setHabits((prevHabits) =>
      prevHabits.map((habit) =>
        habit.id === idToUpdate ? { ...habit, ...updatedData } : habit
      )
    );
  };
  const toggleCompletion = (habitId, date) => {
  setCompletions((prevCompletions) => {
    // Check if a record already exists for this habit and date
    const existingCompletion = prevCompletions.find(
      (item) => item.habitId === habitId && item.date === date
    );

    if (existingCompletion) {
      // CASE 1: Record exists -> Toggle its completed status
      return prevCompletions.map((item) =>
        item.habitId === habitId && item.date === date
          ? { ...item, completed: !item.completed }
          : item
      );
    } else {
      // CASE 2: No record exists -> Create a new completion object
      const newCompletion = {
        id: Date.now(),
        habitId,
        date,
        completed: true,
        note: '',
      };
      return [...prevCompletions, newCompletion];
    }
  });
};
  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        updateHabit,
        completions,
        toggleCompletion,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

// Custom Hook
export const useHabit = () => {
  const context = useContext(HabitContext);

  if (!context) {
    throw new Error('useHabit must be used within a HabitProvider');
  }

  return context;
};