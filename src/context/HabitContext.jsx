import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { mockTodayHabits } from '../mock/habitData';
import { mockCompletions } from '../mock/completionData';

// Create Context
const HabitContext = createContext(null);

// Provider Component
export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState(() => {
  const savedHabits = localStorage.getItem('habitflow-habits');

  return savedHabits ? JSON.parse(savedHabits) : mockTodayHabits;
});
  const [completions, setCompletions] = useState(() => {
  const savedCompletions = localStorage.getItem('habitflow-completions');

  return savedCompletions ? JSON.parse(savedCompletions) : mockCompletions;
});
  useEffect(() => {
  localStorage.setItem('habitflow-habits', JSON.stringify(habits));
}, [habits]);

useEffect(() => {
  localStorage.setItem(
    'habitflow-completions',
    JSON.stringify(completions)
  );
}, [completions]);


  // Add a new habit
  const addHabit = (newHabit) => {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  };

  // Delete a habit by ID
  const deleteHabit = (idToDelete) => {
  setHabits((prevHabits) =>
    prevHabits.map((habit) =>
      habit.id === idToDelete
        ? { ...habit, deletedAt: new Date().toISOString() }
        : habit
    )
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
const updateNote = (habitId, date, note) => {
  setCompletions((prevCompletions) =>
    prevCompletions.map((item) =>
      item.habitId === habitId && item.date === date
        ? { ...item, note }
        : item
    )
  );
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
        updateNote,
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