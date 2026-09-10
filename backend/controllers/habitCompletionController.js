const HabitCompletion = require('../models/HabitCompletion');
const Habit = require('../models/Habit');

// Toggle completion status for a habit on a given date
const toggleCompletion = async (req, res) => {
  try {
    const { habitId, date } = req.body;
    const userId = req.user.userId;
const habit = await Habit.findOne({
  _id: habitId,
  userId,
  deletedAt: null,
});

if (!habit) {
  return res.status(404).json({
    message: 'Habit not found or does not belong to this user',
  });
}
    let completion = await HabitCompletion.findOne({
      userId,
      habitId,
      date,
    });
    


    if (completion) {
      completion.completed = !completion.completed;
      await completion.save();
    } else {
      completion = await HabitCompletion.create({
        userId,
        habitId,
        date,
        completed: true,
      });
    }

    res.status(200).json(completion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all completions for the authenticated user
const getCompletions = async (req, res) => {
  try {
    const completions = await HabitCompletion.find({
      userId: req.user.userId,
    });

    res.status(200).json(completions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update note for a habit completion
const updateNote = async (req, res) => {
  try {
    const { habitId, date, note } = req.body;
    const userId = req.user.userId;

    const completion = await HabitCompletion.findOne({
      userId,
      habitId,
      date,
    });

    if (!completion) {
      return res.status(404).json({
        message: 'Completion not found',
      });
    }

    completion.note = note;

    await completion.save();

    res.status(200).json(completion);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  toggleCompletion,
  getCompletions,
  updateNote,
};