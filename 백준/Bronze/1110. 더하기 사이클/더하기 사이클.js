const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let N = Number(inputValue);
const M = N;
let cnt = 0;

while (true) {
  const a = Math.floor(N / 10);
  const b = N % 10;
  const sum = a + b;
  N = (b * 10) + (sum % 10);
  cnt++;
  if (N === M) break;
}
console.log(cnt);