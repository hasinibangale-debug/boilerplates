require('dotenv').config();
const connectDB = require('./config/db');

const userRoutes = require('./routes/userRoutes');
const habitRoutes = require('./routes/habitRoutes');

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);


app.get('/', (req, res) => {
  res.send('HabitFlow backend is running!');
});

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});