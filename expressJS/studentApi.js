const express = require('express');
const app = express();
app.use(express.json());

// students (name, marks, city) {id auto-increment}

let students = [
    { id: 1, name: 'Kirito', marks: 85, city: 'Aincrad' },
    { id: 2, name: 'Yuji', marks: 92, city: 'Shibuya' },
];

// add student via post
