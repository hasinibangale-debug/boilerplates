const express = require('express');

const {
  toggleCompletion,
  getCompletions,
  updateNote,
} = require('../controllers/habitCompletionController');

const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all completions for the logged-in user
router.get('/', authMiddleware, getCompletions);

// Toggle completion status for a habit
router.post('/toggle', authMiddleware, toggleCompletion);

// Update note for a habit completion
router.put('/note', authMiddleware, updateNote);
module.exports = router;