const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
let [minR, maxR] = [Infinity, 0];
let [minC, maxC] = [Infinity, 0];
for (const [r, c] of arr) {
  minR = Math.min(minR, r);
  maxR = Math.max(maxR, r);
  minC = Math.min(minC, c);
  maxC = Math.max(maxC, c);
}
// console.log(maxR, minR, maxC, minC);

console.log(2 * (maxR - minR + maxC - minC));
