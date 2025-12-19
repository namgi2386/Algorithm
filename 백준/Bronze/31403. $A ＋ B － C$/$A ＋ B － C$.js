const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [a, b, c] = inputValue.split("\n").map((c) => c.trim());

console.log(Number(a) + Number(b) - Number(c));
console.log(Number(a + b) - Number(c));
