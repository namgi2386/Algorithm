const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, K] = initN;

const arr = new Array(N);
for (let tc = 0; tc < N; tc++) {
  arr[tc] = initArr[tc * 2 + 1];
}
const startLen = arr[0].length;

let answer = false;
for (let i = 0; i < startLen - K + 1; i++) {
  const target = arr[0].slice(i, i + K);
  const reverse = target.slice().reverse();
  let ok = true;
  for (const next of arr) {
    if (!kmp(next, target) && !kmp(next, reverse)) {
      ok = false;
      break;
    }
  }
  if (ok) {
    answer = true;
    break;
  }
}
console.log(answer ? "YES" : "NO");

function getFail(target) {
  const failure = new Array(K).fill(0);
  let j = 0;
  for (let i = 1; i < K; i++) {
    while (j > 0 && target[i] !== target[j]) {
      j = failure[j - 1];
    }
    if (target[i] === target[j]) {
      failure[i] = ++j;
    }
  }
  return failure;
}
function kmp(text, target) {
  const len = text.length;
  const failure = getFail(target);

  let j = 0;
  for (let i = 0; i < len; i++) {
    while (j > 0 && text[i] !== target[j]) {
      j = failure[j - 1];
    }
    if (text[i] === target[j]) {
      if (j === K - 1) {
        return true;
      }
      j++;
    }
  }
  return false;
}
// console.log("idx:", [0, 1, 2, 3, 4, 5]);
// const temp = [1, 2, 3, 1, 2, 4];
// console.log("arr:", temp);

// console.log("fai:", getFail(temp));
// console.log(kmp([3, 2, ...temp, 4], temp));
