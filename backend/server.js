// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Use environment variable for port or fallback to 3001
const port = process.env.PORT || 3001;

// Configure CORS with specific options
app.use(cors({
    origin: '*', // In production, replace with your frontend URL
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Root route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

// API Routes
app.post('/api/helloUser', (req, res) => {
    console.log('Received helloUser request:', req.body);
    const { username } = req.body;
    
    if (!username || typeof username !== 'string') {
        console.log('Invalid username:', username);
        return res.status(400).json({ error: 'Username must be a valid string' });
    }
    
    const greeting = `Hello ${username}`;
    console.log('Sending response:', greeting);
    res.json({ message: greeting });
});

app.post('/api/checkAnswer', (req, res) => {
    console.log('Received checkAnswer request:', req.body);
    const { answer } = req.body;
    
    if (answer === undefined || typeof answer !== 'number') {
        console.log('Invalid answer:', answer);
        return res.status(400).json({ error: 'Answer must be a valid number' });
    }
    
    const result = answer === (2 + 2) ? "You are Correct!!" : "That is Wrong";
    console.log('Sending response:', result);
    res.json({ message: result });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

// Handle 404
app.use((req, res) => {
    console.log('404 - Route not found:', req.path);
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`API routes available:`);
    console.log(`- POST /api/helloUser`);
    console.log(`- POST /api/checkAnswer`);
});