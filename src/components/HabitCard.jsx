import React, { useState, useEffect } from 'react';
import { Flame, Check } from 'lucide-react';

const HabitCard = ({ habit, isCompleted, streak, onToggleComplete, onSaveNote,savedNote }) => {
  const { title, color } = habit;
  const [note, setNote] = useState(savedNote || '');
  useEffect(() => {
  setNote(savedNote || '');
}, [savedNote]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between gap-4">
      {/* Left section: Color accent & Habit Info */}
      <div className="flex items-start gap-3">
        {/* Color Pill/Indicator */}
        <div 
          className="w-3 h-10 rounded-full flex-shrink-0 mt-1" 
          style={{ backgroundColor: color || '#6366f1' }}
        />
        
        <div>
          <h4 className="font-semibold text-gray-800 text-base">{title}</h4>
          
          <div className="flex items-center gap-1 text-amber-500 text-xs font-medium mt-1">
            <Flame className="w-3.5 h-3.5 fill-amber-500" />
            <span>{streak} day{streak !== 1 ? 's' : ''} streak</span>
          </div>
        </div>
      </div>

      {/* Step 3D: Note Input Section (Appears only when completed) */}
      {isCompleted && (
        <div className="flex-1">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="How did it go today?"
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
          />
          <button
            type="button"
            onClick={() => onSaveNote?.(habit.id, note)}
            className="mt-2 px-3 py-2 text-xs font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Save Note
          </button>
        </div>
      )}

      {/* Right section: Completion Checkbox Button */}
      <button
        onClick={() => onToggleComplete?.(habit.id)}
        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
          isCompleted
            ? 'bg-green-100 text-green-700 border border-green-200'
            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
        }`}
      >
        <div
          className={`w-4 h-4 rounded border flex items-center justify-center ${
            isCompleted
              ? 'bg-green-600 border-green-600 text-white'
              : 'border-gray-400 bg-white'
          }`}
        >
          {isCompleted && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
        <span>{isCompleted ? 'Completed' : 'Complete'}</span>
      </button>
    </div>
  );
};

export default HabitCard;