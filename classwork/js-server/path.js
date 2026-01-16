const path = require('path');

console.log(`File Name: ${path .basename(__filename)}`);
console.log(`Directory Name: ${path .dirname(__filename)}`);
console.log(`Extension: ${path .extname(__filename)}`);


const fullpath = path .join(__dirname, 'public', 'index.html');
console.log(`Full Path: ${fullpath}`);