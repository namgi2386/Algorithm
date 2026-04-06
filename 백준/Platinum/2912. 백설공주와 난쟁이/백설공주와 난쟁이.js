const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, hats, M, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, H] = initN;
M = Number(M);
arr = arr.map((c, i) => [c[0], c[1], i]);
const DN = Math.sqrt(N);
arr.sort((a, b) => {
  const [da, db] = [Math.floor(a[0] / DN), Math.floor(b[0] / DN)];
  if (da === db) {
    return a[1] - b[1];
  }
  return da - db;
});
const answer = new Array(M).fill(0);
const map = new Array(10001).fill(0);
let maxLen = 0;
let maxColor = 0;
const initialPoint = arr[0];
const initialLen = initialPoint[1] - initialPoint[0] + 1;
for (let i = initialPoint[0]; i <= initialPoint[1]; i++) {
  const color = hats[i - 1];
  map[color]++;
  if (maxLen < map[color]) {
    maxLen = map[color];
    maxColor = color;
  }
}
if (maxLen * 2 > initialLen) answer[initialPoint[2]] = maxColor;
// 초기세팅 완
// console.log("init:", initialPoint, maxColor, maxLen, map.slice(0, 10));

function fncPlus(left, right) {
  for (let i = left; i <= right; i++) {
    const color = hats[i - 1];
    map[color]++;
    // console.log("p:", maxLen, map.slice(0, 10));

    if (maxLen < map[color]) {
      maxLen = map[color];
      maxColor = color;
    }
  }
}
function fncMinus(left, right) {
  let isNeedToReload = false;
  for (let i = left; i <= right; i++) {
    const color = hats[i - 1];
    map[color]--;
    if (maxColor === color) isNeedToReload = true;
  }
  if (isNeedToReload) {
    maxLen = 0;
    maxColor = 0;
    for (let j = 1; j <= H; j++) {
      if (map[j] > maxLen) {
        maxColor = j;
        maxLen = map[j];
      }
    }
  }
}

let prevLeft = initialPoint[0];
let prevRight = initialPoint[1];
for (let i = 1; i < M; i++) {
  const [nodeLeft, nodeRight, nodeIdx] = arr[i];
  const len = nodeRight - nodeLeft + 1;
  if (nodeLeft < prevLeft) {
    // nodeLeft 부터 prevLeft -1 까지 더하기
    fncPlus(nodeLeft, prevLeft - 1);
  } else if (prevLeft < nodeLeft) {
    // prevLeft 부터 nodeLeft -1 까지 빼기
    fncMinus(prevLeft, nodeLeft - 1);
  }
  if (nodeRight < prevRight) {
    // nodeRight +1 부터 prevRight 까지 빼기
    fncMinus(nodeRight + 1, prevRight);
  } else if (prevRight < nodeRight) {
    // prevRight +1 부터 nodeRight 까지 더하기
    fncPlus(prevRight + 1, nodeRight);
  }
  prevLeft = nodeLeft;
  prevRight = nodeRight;
  if (maxLen * 2 > len) answer[nodeIdx] = maxColor;
  // console.log(arr[i], maxColor, maxLen, ":", answer[nodeIdx]);
}

console.log(
  answer
    .map((c) => {
      if (c === 0) return "no";
      return `yes ${c}`;
    })
    .join("\n"),
);
