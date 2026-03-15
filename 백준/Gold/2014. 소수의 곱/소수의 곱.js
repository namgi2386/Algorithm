const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;

let stack = [];

function dfs(start, cnt, sum, max) {
  if (cnt === max) {
    stack.push(sum);
    return;
  }
  for (let i = start; i < N; i++) {
    dfs(i, cnt + 1, sum * arr[i], max);
  }
}
function bfs(start, cnt, sum, max) {
  if (cnt === max) {
    stack.push(sum);
    isPossible = true;
    return;
  }
  for (let i = start; i < N; i++) {
    if (sum * arr[i] > maximumNum) continue;
    bfs(i, cnt + 1, sum * arr[i], max);
  }
}
let max = 1;
while (stack.length < M) {
  dfs(0, 0, 1, max);
  max++;
}
let maximumNum = stack[stack.length - 1];
let isPossible = true;
while (isPossible) {
  isPossible = false;
  stack.sort((a, b) => a - b);
  stack = stack.slice(0, M);
  // console.log("in:", stack, stack[M - 1]);

  maximumNum = stack[M - 1];
  bfs(0, 0, 1, max);
  max++;
}
stack.sort((a, b) => a - b);
// console.log(stack, max);

console.log(stack[M - 1]);
