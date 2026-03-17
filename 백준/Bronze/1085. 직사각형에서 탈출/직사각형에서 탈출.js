const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [a, b, c, d] = inputValue.split(" ").map(Number);
console.log(Math.min(a, b, c - a, d - b));
