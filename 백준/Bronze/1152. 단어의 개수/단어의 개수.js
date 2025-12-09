const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const words = inputValue.split(' ').filter(word => word !== '');
console.log(words.length);
