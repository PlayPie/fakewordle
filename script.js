
let aChar = [5];

const fs = require('fs');

const fileContent = fs.readFileSync('paroleWordle.txt', 'utf8');

const words = fileContent.split(' ');
