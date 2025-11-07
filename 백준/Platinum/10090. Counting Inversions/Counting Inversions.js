const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

N = Number(N);

const sorted = [...arr].sort((a, b) => a - b);
const compress = new Map();
sorted.forEach((val, _) => {
  if (!compress.has(val)) {
    compress.set(val, compress.size + 1);
  }
});
arr = arr.map((val) => compress.get(val));

const fenwickTree = Array(N + 1).fill(0);
function updateFanwick(idx) {
  while (idx <= N) {
    fenwickTree[idx]++;
    idx += idx & -idx;
  }
}
function queryFanwinck(idx) {
  let sum = 0;
  while (idx > 0) {
    sum += fenwickTree[idx];
    idx -= idx & -idx;
  }
  return sum;
}
let answerFenwick = 0;
for (let i = N - 1; i >= 0; i--) {
  const num = arr[i];
  answerFenwick += queryFanwinck(num - 1);
  updateFanwick(num);
}
console.log(answerFenwick);
