import {
  Flame,
  CheckCircle2,
  Trophy,
  ListTodo,
} from 'lucide-react';

import StatCard from '../components/StatCard';
import HabitCard from '../components/HabitCard';
import { useHabit } from '../context/HabitContext';

const today = new Date().toISOString().split('T')[0];

const Dashboard = () => {
  const { habits, completions, toggleCompletion } = useHabit();

  const completedCount = completions.filter(
    (completion) => completion.date === today && completion.completed
  ).length;

  const handleToggleComplete = (habitId) => {
    toggleCompletion(habitId, today);
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Good morning 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Let's make today count.
        </p>
      </div>

      {/* Quote */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
        <p className="text-sm text-indigo-500 font-medium mb-2">
          Quote of the Day
        </p>

        <p className="text-lg font-medium text-gray-800">
          "Small steps every day lead to big changes."
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <StatCard
          title="Current Streak"
          value="12 days"
          icon={Flame}
        />

        <StatCard
          title="Today's Completion"
          value={`${completedCount} / ${habits.length}`}
          icon={CheckCircle2}
        />

        <StatCard
          title="Best Streak"
          value="24 days"
          icon={Trophy}
        />

        <StatCard
          title="Total Habits"
          value={habits.length}
          icon={ListTodo}
        />

      </div>

      {/* Today's Habits */}
      <section>

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Today's Habits
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Complete your scheduled habits for today.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-500">
            {completedCount}/{habits.length} completed
          </span>

        </div>

        <div className="space-y-3">

          {habits.map((habit) => {
            const todayCompletion = completions.find(
              (completion) =>
                completion.habitId === habit.id && completion.date === today
            );

            return (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={todayCompletion ? todayCompletion.completed : false}
                onToggleComplete={handleToggleComplete}
              />
            );
          })}

        </div>

      </section>

      {/* Calendar Preview */}
      <section>

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Your Progress
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              See how consistently you've been completing your habits.
            </p>
          </div>

          <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
            View Calendar →
          </button>

        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">

          <p className="text-center text-gray-500">
            Calendar preview coming next.
          </p>

        </div>

      </section>

    </div>
  );
};

export default Dashboard;