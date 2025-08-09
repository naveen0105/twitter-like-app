require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'https://cosmic-mandazi-845855.netlify.app'
}));
app.use(express.json());

let tweets = [];

app.get('/tweets', (req, res) => {
  console.log('GET /tweets called');
  res.json(tweets);
});

app.post('/tweets', (req, res) => {
  console.log('POST /tweets called with:', req.body);
  const { content } = req.body;
  if (!content) {
    console.log('Tweet content missing in request');
    return res.status(400).json({ error: 'Tweet content is required' });
  }
  tweets.unshift({ content });
  console.log('Tweet added:', content);
  res.status(201).json({ message: 'Tweet posted successfully' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
