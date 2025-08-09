require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
  origin: 'https://cosmic-mandazi-845855.netlify.app'
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const tweetSchema = new mongoose.Schema({
  content: { type: String, required: true },
  date: { type: Date, default: Date.now }
});
const Tweet = mongoose.model('Tweet', tweetSchema);

app.get('/tweets', async (req, res) => {
  console.log('GET /tweets called');
  try {
    const tweets = await Tweet.find().sort({ date: -1 });
    res.json(tweets);
  } catch (err) {
    console.error('Error fetching tweets:', err);
    res.status(500).json({ error: 'Failed to fetch tweets' });
  }
});

app.post('/tweets', async (req, res) => {
  console.log('POST /tweets called with:', req.body);
  try {
    const { content } = req.body;
    if (!content) {
      console.log('Tweet content missing in request');
      return res.status(400).json({ error: 'Tweet content is required' });
    }
    const tweet = new Tweet({ content });
    await tweet.save();
    console.log('Tweet saved:', content);
    res.status(201).json(tweet);
  } catch (err) {
    console.error('Error saving tweet:', err);
    res.status(500).json({ error: 'Failed to save tweet' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
