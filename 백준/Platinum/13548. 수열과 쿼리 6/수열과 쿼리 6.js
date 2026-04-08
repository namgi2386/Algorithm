const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr, M, ...queries] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
M = Number(M);
queries = queries.map((c, i) => [c[0], c[1], i]);
const DN = Math.sqrt(N);
queries.sort((a, b) => {
  const [da, db] = [Math.floor(a[0] / DN), Math.floor(b[0] / DN)];
  return da === db ? a[1] - b[1] : da - db;
});
// queries sorting
// console.log("queries:", queries);

const answer = new Array(M).fill(0);
const dp = new Array(100001).fill(0);

const initialPosition = queries[0];
let prevLeft = initialPosition[0];
let prevRight = initialPosition[1];
let maxCnt = 0;
let maxNum = 0;
for (let i = prevLeft; i <= prevRight; i++) {
  const node = arr[i - 1];
  if (++dp[node] >= maxCnt) {
    maxNum = node;
    maxCnt = dp[node];
  }
}
answer[initialPosition[2]] = maxCnt;
// initialize
// console.log("init:", prevLeft, prevRight, maxCnt, maxNum);

function fncPlus(left, right) {
  for (let i = left; i <= right; i++) {
    const node = arr[i - 1];
    if (++dp[node] > maxCnt) {
      maxCnt = dp[node];
      maxNum = node;
    }
  }
}
function fncMinus(left, right) {
  let haveToReload = false;
  for (let i = left; i <= right; i++) {
    const node = arr[i - 1];
    dp[node]--;
    if (node === maxNum) haveToReload = true;
  }
  return haveToReload;
}
function fncReload(left, right) {
  maxNum = 0;
  maxCnt = 0;
  for (let i = left; i <= right; i++) {
    const node = arr[i - 1];
    if (dp[node] > maxCnt) {
      maxCnt = dp[node];
      maxNum = node;
    }
  }
}

for (let i = 1; i < M; i++) {
  const [nodeLeft, nodeRight, nodeIdx] = queries[i];
  if (nodeLeft < prevLeft) {
    // 더하기
    fncPlus(nodeLeft, prevLeft - 1);
  } else if (nodeLeft > prevLeft) {
    // 빼기
    const haveToReload = fncMinus(prevLeft, nodeLeft - 1);
    if (haveToReload) fncReload(nodeLeft, nodeRight);
  }
  if (nodeRight > prevRight) {
    // 더하기
    fncPlus(prevRight + 1, nodeRight);
  } else if (nodeRight < prevRight) {
    // 빼기
    const haveToReload = fncMinus(nodeRight + 1, prevRight);
    if (haveToReload) fncReload(nodeLeft, nodeRight);
  }
  prevLeft = nodeLeft;
  prevRight = nodeRight;
  answer[nodeIdx] = maxCnt;
}
console.log(answer.join("\n"));
