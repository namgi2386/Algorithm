const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n").map(line => Number(line.trim()));
const [L, A, B, C, D] = lines;

const korDays = Math.ceil(A / C);
const mathDays = Math.ceil(B / D);
const neededDays = Math.max(korDays, mathDays);

console.log(L - neededDays);