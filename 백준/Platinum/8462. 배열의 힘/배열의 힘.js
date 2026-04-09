const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, arr, ...queries] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;
queries = queries.map((c, i) => [c[0], c[1], i]);
const DN = Math.sqrt(N);
queries.sort((a, b) => {
  const [da, db] = [Math.floor(a[0] / DN), Math.floor(b[0] / DN)];
  if (da === db) {
    if (da % 2 === 0) {
      return a[1] - b[1];
    } else {
      return b[1] - a[1];
    }
  } else {
    return da - db;
  }
});
// console.log("queries:", queries); // 1 0 2 순서로 진행
const dp = new Array(1000001).fill(0); // 숫자별 개수
const answer = new Array(M).fill(0n);
let sum = 0n;

let prevLeft = queries[0][0];
let prevRight = queries[0][1];

const add = (num) => {
  const prevCnt = dp[num];
  sum += (2n * BigInt(prevCnt) + 1n) * BigInt(num);
  dp[num]++;
};
const remove = (num) => {
  const prevCnt = dp[num];
  sum -= (2n * BigInt(prevCnt) - 1n) * BigInt(num);
  dp[num]--;
};

for (let i = prevLeft; i <= prevRight; i++) {
  add(arr[i - 1]);
}
answer[queries[0][2]] = sum;
// console.log("initSum:", queries[0], sum);

for (let i = 1; i < M; i++) {
  const [nodeLeft, nodeRight, nodeIdx] = queries[i];
  while (nodeLeft < prevLeft) add(arr[--prevLeft - 1]);
  while (prevLeft < nodeLeft) remove(arr[prevLeft++ - 1]);
  while (prevRight < nodeRight) add(arr[++prevRight - 1]);
  while (nodeRight < prevRight) remove(arr[prevRight-- - 1]);
  answer[nodeIdx] = sum;
}
console.log(answer.map((c) => c.toString()).join("\n"));
