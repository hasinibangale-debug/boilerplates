import React, { useState } from 'react';
import { useHabit } from '../context/HabitContext';

function Habits() {
  const { habits, addHabit, deleteHabit, updateHabit } = useHabit();

  // Create Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    color: '#4f46e5',
    frequency: '',
    timer: '',
  });

  // Edit Form State
  const [editingHabitId, setEditingHabitId] = useState(null);
  const [deletingHabitId, setDeletingHabitId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    category: '',
    color: '#4f46e5',
    frequency: '',
    timer: '',
  });

  // Handle Create Form Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Start Editing a Habit
  const startEditing = (habit) => {
    setEditingHabitId(habit.id);

    setEditFormData({
      title: habit.title || '',
      description: habit.description || '',
      category: habit.category || '',
      color: habit.color || '#4f46e5',
      frequency: habit.frequency ? String(habit.frequency) : '',
      timer: habit.timer ? String(habit.timer) : '',
    });
  };

  // Handle Edit Form Changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save Updated Habit
  const handleUpdate = (e) => {
    e.preventDefault();

    updateHabit(editingHabitId, {
      ...editFormData,
      frequency: Number(editFormData.frequency),
      timer: editFormData.timer ? Number(editFormData.timer) : null,
    });

    cancelEdit();
  };

  // Cancel Editing
  const cancelEdit = () => {
    setEditingHabitId(null);

    setEditFormData({
      title: '',
      description: '',
      category: '',
      color: '#4f46e5',
      frequency: '',
      timer: '',
    });
  };

  // Create New Habit
  const handleSubmit = (e) => {
    e.preventDefault();

    const newHabit = {
      id: Date.now(),
      title: formData.title,
      description: formData.description,
      category: formData.category,
      color: formData.color,
      frequency: Number(formData.frequency),
      timer: formData.timer ? Number(formData.timer) : null,
      createdAt: new Date().toISOString(),
    };

    addHabit(newHabit);

    setFormData({
      title: '',
      description: '',
      category: '',
      color: '#4f46e5',
      frequency: '',
      timer: '',
    });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Habits</h1>

      {/* Habit Creation Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-sm space-y-4 mb-8"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Habit Name
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Read 20 Minutes"
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>

          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. Read before going to bed"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="" disabled>
              Select a category
            </option>

            <option value="Health">Health</option>
            <option value="Personal Development">
              Personal Development
            </option>
            <option value="Enjoyment">Enjoyment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Color
          </label>

          <input
            type="color"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className="h-10 w-20 p-1 border border-gray-300 rounded cursor-pointer bg-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Frequency
          </label>

          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="" disabled>
              Select frequency
            </option>

            <option value="7">Every day</option>
            <option value="5">5 days a week</option>
            <option value="3">3 days a week</option>
            <option value="1">Once a week</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Timer (Optional, in minutes)
          </label>

          <div className="relative flex items-center">
            <input
              type="number"
              name="timer"
              min="0"
              value={formData.timer}
              onChange={handleChange}
              placeholder="e.g. 15"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />

            <span className="absolute right-3 text-sm text-gray-400 pointer-events-none">
              mins
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded hover:bg-indigo-700 transition-colors"
        >
          Add Habit
        </button>
      </form>

      {/* Habit List Section */}
      <ul className="space-y-2">
        {habits
            .filter((habit) => !habit.deletedAt)
            .map((habit) => (
          <li
            key={habit.id}
            className="p-4 bg-white rounded shadow-sm border-l-4 space-y-3"
            style={{ borderColor: habit.color || '#4f46e5' }}
          >
            {/* EDIT MODE */}
            {editingHabitId === habit.id ? (
              <form onSubmit={handleUpdate} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Description
                  </label>

                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Category
                    </label>

                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="" disabled>
                        Select category
                      </option>

                      <option value="Health">Health</option>
                      <option value="Personal Development">
                        Personal Development
                      </option>
                      <option value="Enjoyment">Enjoyment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Color
                    </label>

                    <input
                      type="color"
                      name="color"
                      value={editFormData.color}
                      onChange={handleEditChange}
                      className="h-9 w-full p-1 border border-gray-300 rounded cursor-pointer bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Frequency
                    </label>

                    <select
                      name="frequency"
                      value={editFormData.frequency}
                      onChange={handleEditChange}
                      required
                      className="w-full p-2 border border-gray-300 rounded text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="" disabled>
                        Select frequency
                      </option>

                      <option value="7">Every day</option>
                      <option value="5">5 days a week</option>
                      <option value="3">3 days a week</option>
                      <option value="1">Once a week</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Timer (mins)
                    </label>

                    <input
                      type="number"
                      name="timer"
                      min="0"
                      value={editFormData.timer}
                      onChange={handleEditChange}
                      placeholder="e.g. 15"
                      className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  <button
                    type="submit"
                    className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded hover:bg-green-700 transition-colors"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                {/* NORMAL HABIT VIEW */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{habit.title}</p>

                    {habit.description && (
                      <p className="text-sm text-gray-500">
                        {habit.description}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => startEditing(habit)}
                      className="px-2 py-1 text-xs font-semibold bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeletingHabitId(habit.id)}
                      className="px-2 py-1 text-xs font-semibold bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* DELETE CONFIRMATION */}
                {deletingHabitId === habit.id && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-700 mb-3">
                      Are you sure you want to delete this habit?
                    </p>

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => {
                          deleteHabit(habit.id);
                          setDeletingHabitId(null);
                        }}
                        className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded hover:bg-red-700"
                      >
                        Delete
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingHabitId(null)}
                        className="px-3 py-1 bg-gray-400 text-white text-xs font-semibold rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Habits;