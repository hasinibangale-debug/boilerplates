const authMiddleware = require('../middleware/authMiddleware');
const express = require('express');
const { createUser, loginUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'You are authenticated',
    user: req.user,
  });
});

module.exports = router;