const Habit = require('../models/Habit');

const createHabit = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      color,
      frequency,
      timer,
    } = req.body;

    const habit = await Habit.create({
      userId: req.user.userId,
      title,
      description,
      category,
      color,
      frequency,
      timer,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      userId: req.user.userId,
      deletedAt: null,
    });

    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      deletedAt: null,
    });

    if (!habit) {
      return res.status(404).json({
        message: 'Habit not found',
      });
    }

    const {
      title,
      description,
      category,
      color,
      frequency,
      timer,
    } = req.body;

    habit.title = title;
    habit.description = description;
    habit.category = category;
    habit.color = color;
    habit.frequency = frequency;
    habit.timer = timer;

    const updatedHabit = await habit.save();

    res.status(200).json(updatedHabit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.user.userId,
      deletedAt: null,
    });

    if (!habit) {
      return res.status(404).json({
        message: 'Habit not found',
      });
    }

    habit.deletedAt = new Date();

    const deletedHabit = await habit.save();

    res.status(200).json(deletedHabit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
};
