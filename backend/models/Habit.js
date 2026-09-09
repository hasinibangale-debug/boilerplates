const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    category: {
      type: String,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    frequency: {
      type: Number,
      required: true,
    },

    timer: {
      type: Number,
      default: null,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Habit', habitSchema);