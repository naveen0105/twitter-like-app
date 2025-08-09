require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://689750ddf8ae570be6a92062--cosmic-mandazi-845855.netlify.app'], // add your Netlify URL here
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Example test route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Connect to MongoDB (example)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Use Render's PORT or default to 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
