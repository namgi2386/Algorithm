const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const arr = inputValue.split("\n").map(Number);
let n = arr.shift();
arr.forEach((c) => (n -= c));
console.log(n);
