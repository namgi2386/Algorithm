const fs = require('fs');
const inputValue = fs.readFileSync('/dev/stdin').toString().trim();
const [a, b] = inputValue.split(' ').map(Number);
console.log(a + b);