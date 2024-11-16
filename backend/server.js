// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.post('/api/helloUser', (req, res) => {
    const { username } = req.body;
    
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Username must be a valid string' });
    }
    
    const greeting = `Hello ${username}`;
    res.json({ message: greeting });
});

app.post('/api/checkAnswer', (req, res) => {
    const { answer } = req.body;
    
    if (answer === undefined || typeof answer !== 'number') {
        return res.status(400).json({ error: 'Answer must be a valid number' });
    }
    
    const result = answer === (2 + 2) ? "You are Correct!!" : "That is Wrong";
    res.json({ message: result });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});