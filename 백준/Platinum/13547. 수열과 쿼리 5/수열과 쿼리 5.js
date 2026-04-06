const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr, M, ...queries] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
M = Number(M);
const DN = Math.sqrt(N);
queries = queries.map((c, i) => [c[0], c[1], i]);
queries.sort((a, b) => {
  const [da, db] = [Math.floor(a[0] / DN), Math.floor(b[0] / DN)];
  if (da === db) {
    return a[1] - b[1];
  } else {
    return da - db;
  }
});
// console.log("queries:", queries);
const answer = new Array(M);
const MAX = 1000001;
let map = new Array(MAX).fill(0);
const initPosition = queries[0];
let cnt = 0;
let prevLeft = initPosition[0];
let prevRight = initPosition[1];
for (let i = prevLeft; i <= prevRight; i++) {
  const node = arr[i - 1];
  if (map[node] === 0) cnt++;
  map[node]++;
}

function fncPlus(left, right) {
  for (let i = left; i <= right; i++) {
    const node = arr[i - 1];
    if (map[node] === 0) cnt++;
    map[node]++;
  }
}
function fncMinus(left, right) {
  for (let i = left; i <= right; i++) {
    const node = arr[i - 1];
    if (map[node] === 1) cnt--;
    map[node]--;
  }
}

answer[initPosition[2]] = cnt;

for (let i = 1; i < M; i++) {
  const [nodeLeft, nodeRight, nodeIdx] = queries[i];

  // 1: 늘어남 2: 줄어듬 3: 많이 줄어듬
  const isLeftExpanded = nodeLeft < prevLeft ? 1 : nodeLeft < prevRight ? 2 : 3;
  const isRightExpanded =
    nodeRight < prevLeft ? 1 : nodeRight < prevRight ? 2 : 3;
  if ((isLeftExpanded === 1 && isRightExpanded === 1) || isLeftExpanded === 3) {
    // prev 전부 지우고 node 전부 넣기
    fncMinus(prevLeft, prevRight);
    cnt = 0;
    fncPlus(nodeLeft, nodeRight);
    answer[nodeIdx] = cnt; // 기록
    prevLeft = nodeLeft;
    prevRight = nodeRight;
    continue;
  }
  if (isLeftExpanded === 1) {
    // node 왼쪽 전부 넣기
    fncPlus(nodeLeft, prevLeft - 1);
  } else if (isLeftExpanded === 2) {
    // prevLeft 부터 nodeLeft까지 빼기
    if (prevLeft !== nodeLeft) {
      fncMinus(prevLeft, nodeLeft - 1);
    }
  }
  if (isRightExpanded === 2) {
    // nodeRight 부터 prevRight까지 빼기
    if (nodeRight !== prevRight) {
      fncMinus(nodeRight + 1, prevRight);
    }
  } else if (isRightExpanded === 3) {
    // prevRight부터 nodeRight 까지 더하기
    if (prevRight !== nodeRight) {
      fncPlus(prevRight + 1, nodeRight);
    }
  }

  answer[nodeIdx] = cnt; // 기록
  prevLeft = nodeLeft;
  prevRight = nodeRight;
}
console.log(answer.join("\n"));
