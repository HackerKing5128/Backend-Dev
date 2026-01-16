const fs = require('fs');

// Writing to a file (synchronously)
// fs.writeFileSync('example.txt', "Hello, Duniya!");

// Reading from a file (synchronously)
const data = fs.readFileSync('example.txt', 'utf-8');
console.log(data);