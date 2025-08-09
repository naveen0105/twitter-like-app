require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
  origin: 'https://689750ddf8ae570be6a92062--cosmic-mandazi-845855.netlify.app'
}));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const tweetSchema = new mongoose.Schema({
  content: String,
  date: { type: Date, default: Date.now }
});
const Tweet = mongoose.model('Tweet', tweetSchema);

app.get('/tweets', async (req, res) => {
  const tweets = await Tweet.find().sort({ date: -1 });
  res.json(tweets);
});

app.post('/tweets', async (req, res) => {
  const tweet = new Tweet({ content: req.body.content });
  await tweet.save();
  res.json(tweet);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
