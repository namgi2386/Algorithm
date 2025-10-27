const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);

let failArr = new Array(N).fill(0);
let jIdx = 0; // 기본 fail pointer
for (let i = 1; i < arr.length; i++) {
  while (arr[i] !== arr[jIdx] && jIdx > 0) {
    jIdx = failArr[jIdx - 1];
  }
  if (arr[i] === arr[jIdx]) {
    failArr[i] = ++jIdx;
  }
}

const maxPront = Array(N).fill(0);
let answer = 0;

for (let i = 1; i < N; i++) {
  // 일치하긴함
  if (failArr[i] > 0) {
    const prev = failArr[i] - 1;
    // 재귀반복이라면 이전값으로
    maxPront[i] = failArr[prev] > 0 ? maxPront[prev] : failArr[i];
    const back = i + 1 - maxPront[i];
    if (back >= maxPront[i]) answer += back;
  }
}

console.log(answer);
