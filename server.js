const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let tweets = [];

app.get('/tweets', (req, res) => {
    res.json(tweets);
});

app.post('/tweets', (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === '') {
        return res.status(400).json({ error: 'Tweet cannot be empty' });
    }
    const newTweet = { id: Date.now(), text, likes: 0 };
    tweets.push(newTweet);
    res.status(201).json(newTweet);
});

app.post('/tweets/:id/like', (req, res) => {
    const tweet = tweets.find(t => t.id === parseInt(req.params.id));
    if (!tweet) {
        return res.status(404).json({ error: 'Tweet not found' });
    }
    tweet.likes++;
    res.json(tweet);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
