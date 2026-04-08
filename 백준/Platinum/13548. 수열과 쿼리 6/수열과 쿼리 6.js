const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr, M, ...queries] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
M = Number(M);
queries = queries.map((c, i) => [c[0] - 1, c[1] - 1, i]);
const DN = Math.sqrt(N);
queries.sort((a, b) => {
  const [da, db] = [Math.floor(a[0] / DN), Math.floor(b[0] / DN)];
  if (da !== db) return da - db;
  return da % 2 === 0 ? a[1] - b[1] : b[1] - a[1];
});
// queries sorting
// console.log("queries:", queries);

const answer = new Uint32Array(M).fill(0);
const dp = new Uint32Array(100001).fill(0); // 5가 현재 3개 존재 중
const dpForCnt = new Uint32Array(100001).fill(0); // 7개인 값이 3개 존재 중

const initialPosition = queries[0];
let prevLeft = initialPosition[0];
let prevRight = initialPosition[1];
let maxCnt = 0;
for (let i = prevLeft; i <= prevRight; i++) {
  const node = arr[i];
  dpForCnt[dp[node]]--;
  if (++dp[node] >= maxCnt) {
    maxCnt = dp[node];
  }
  dpForCnt[dp[node]]++;
}
answer[initialPosition[2]] = maxCnt;
// initialize
// console.log("init:", prevLeft, prevRight, maxCnt);

const fncPlus = (idx) => {
  const node = arr[idx];
  dpForCnt[dp[node]]--;
  if (++dp[node] > maxCnt) {
    maxCnt = dp[node];
  }
  dpForCnt[dp[node]]++;
};
const fncMinus = (idx) => {
  const node = arr[idx];

  dpForCnt[dp[node]]--;
  dp[node]--;
  dpForCnt[dp[node]]++;
  if (dpForCnt[maxCnt] === 0) maxCnt--;
};

for (let i = 1; i < M; i++) {
  const [nodeLeft, nodeRight, nodeIdx] = queries[i];
  while (nodeLeft < prevLeft) fncPlus(--prevLeft);
  while (nodeLeft > prevLeft) fncMinus(prevLeft++);
  while (nodeRight > prevRight) fncPlus(++prevRight);
  while (nodeRight < prevRight) fncMinus(prevRight--);
  answer[nodeIdx] = maxCnt;
}

console.log(answer.join("\n"));
