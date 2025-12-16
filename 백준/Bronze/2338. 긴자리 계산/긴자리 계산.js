const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [a, b] = inputValue.split("\n").map(BigInt);

console.log([a + b, a - b, a * b].join("\n"));
