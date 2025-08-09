const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
  origin: ['https://689750ddf8ae570be6a92062--cosmic-mandazi-845855.netlify.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(bodyParser.json());

let tweets = [];

app.get('/tweets', (req, res) => {
  res.json(tweets);
});

app.post('/tweets', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Tweet text is required' });
  }
  const newTweet = { id: tweets.length + 1, text, createdAt: new Date() };
  tweets.unshift(newTweet);
  res.status(201).json(newTweet);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
