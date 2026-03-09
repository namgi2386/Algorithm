const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [N, R, C, M] = inputValue.split(" ").map(Number);
console.log(Math.min(N, Math.floor(R / M) * Math.floor(C / M)));
