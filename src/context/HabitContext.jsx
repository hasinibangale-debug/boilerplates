import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import { mockCompletions } from '../mock/completionData';
import api from '../services/api';

// Create Context
const HabitContext = createContext(null);

// Provider Component
export const HabitProvider = ({ children }) => {
  const [habits, setHabits] = useState([]);

  const [completions, setCompletions] = useState(() => {
    const savedCompletions = localStorage.getItem(
      'habitflow-completions'
    );

    return savedCompletions
      ? JSON.parse(savedCompletions)
      : mockCompletions;
  });

  // Fetch habits from MongoDB when app loads
  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await api.get('/habits');

        setHabits(response.data);
      } catch (error) {
        console.error(
          'Failed to fetch habits:',
          error.response?.data?.message || error.message
        );
      }
    };

    fetchHabits();
  }, []);

  // Save completions to localStorage
  useEffect(() => {
    localStorage.setItem(
      'habitflow-completions',
      JSON.stringify(completions)
    );
  }, [completions]);

  // Add a new habit
  const addHabit = async (newHabit) => {
    try {
      const response = await api.post('/habits', {
        title: newHabit.title,
        description: newHabit.description,
        category: newHabit.category,
        color: newHabit.color,
        frequency: newHabit.frequency,
        timer: newHabit.timer,
      });

      setHabits((prevHabits) => [
        ...prevHabits,
        response.data,
      ]);
    } catch (error) {
      console.error(
        'Failed to create habit:',
        error.response?.data?.message || error.message
      );
    }
  };

  // Delete a habit by ID
  const deleteHabit = async (idToDelete) => {
  try {
    await api.delete(`/habits/${idToDelete}`);

    setHabits((prevHabits) =>
      prevHabits.filter(
        (habit) => habit._id !== idToDelete
      )
    );
  } catch (error) {
    console.error(
      'Failed to delete habit:',
      error.response?.data?.message || error.message
    );
  }
};

  // Update an existing habit
  const updateHabit = async (idToUpdate, updatedData) => {
    try {
      const response = await api.put(
        `/habits/${idToUpdate}`,
        {
          title: updatedData.title,
          description: updatedData.description,
          category: updatedData.category,
          color: updatedData.color,
          frequency: updatedData.frequency,
          timer: updatedData.timer,
        }
      );

      setHabits((prevHabits) =>
        prevHabits.map((habit) =>
          habit._id === idToUpdate
            ? response.data
            : habit
        )
      );
    } catch (error) {
      console.error(
        'Failed to update habit:',
        error.response?.data?.message || error.message
      );
    }
  };

  // Toggle completion
  const toggleCompletion = (habitId, date) => {
    setCompletions((prevCompletions) => {
      const existingCompletion = prevCompletions.find(
        (item) =>
          item.habitId === habitId &&
          item.date === date
      );

      if (existingCompletion) {
        return prevCompletions.map((item) =>
          item.habitId === habitId &&
          item.date === date
            ? {
                ...item,
                completed: !item.completed,
              }
            : item
        );
      } else {
        const newCompletion = {
          id: Date.now(),
          habitId,
          date,
          completed: true,
          note: '',
        };

        return [
          ...prevCompletions,
          newCompletion,
        ];
      }
    });
  };

  // Update note
  const updateNote = (habitId, date, note) => {
    setCompletions((prevCompletions) =>
      prevCompletions.map((item) =>
        item.habitId === habitId &&
        item.date === date
          ? {
              ...item,
              note,
            }
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
    throw new Error(
      'useHabit must be used within a HabitProvider'
    );
  }

  return context;
};