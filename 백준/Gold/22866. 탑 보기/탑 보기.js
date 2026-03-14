const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
let stack = [];
const dp = Array.from({ length: N }, () => [-1, -1, 0]);
for (let i = N - 1; i >= 0; i--) {
  const node = arr[i];
  while (stack.length > 0) {
    const [peek, idx] = stack.pop();
    if (peek > node) {
      stack.push([peek, idx]);
      dp[i][2] += stack.length;
      dp[i][1] = idx;
      break;
    }
  }
  stack.push([node, i]);
}
stack = [];
for (let i = 0; i < N; i++) {
  const node = arr[i];
  while (stack.length > 0) {
    const [peek, idx] = stack.pop();
    if (peek > node) {
      stack.push([peek, idx]);
      dp[i][2] += stack.length;
      dp[i][0] = idx;
      break;
    }
  }
  stack.push([node, i]);
}
for (let i = 0; i < N; i++) {
  const [a, b, c] = dp[i];
  if (c === 0) {
    console.log(0);
    continue;
  }
  if (a === -1) {
    console.log(`${c} ${b + 1}`);
  } else if (b === -1) {
    console.log(`${c} ${a + 1}`);
  } else {
    const e = i - a;
    const f = b - i;
    if (e <= f) {
      console.log(`${c} ${a + 1}`);
    } else {
      console.log(`${c} ${b + 1}`);
    }
  }
}
