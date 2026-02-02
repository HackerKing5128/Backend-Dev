// express server setup
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Duniya!');
});
app.get('/about', (req, res) => {
    res.send('This is the about page.');
});

// name and age query parameters
app.get('/search', (req, res) => {
    const name = req.query.name;
    const age = req.query.age;
    res.send(`Hello ${name}, your age is ${age}`);
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

