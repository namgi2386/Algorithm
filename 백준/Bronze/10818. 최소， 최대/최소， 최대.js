const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue.split("\n").map((c) => c.split(" ").map(Number));
N = Number(N);
console.log(Math.min(...arr), Math.max(...arr));
