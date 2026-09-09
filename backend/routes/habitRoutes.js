const express = require('express');
const { createHabit, getHabits,updateHabit,deleteHabit } = require('../controllers/habitController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createHabit);
router.get('/', authMiddleware, getHabits);
router.put('/:id', authMiddleware, updateHabit);
router.delete('/:id', authMiddleware, deleteHabit);

module.exports = router;