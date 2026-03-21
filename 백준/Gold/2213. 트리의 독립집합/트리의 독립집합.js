const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

//  1    10     [0 10]
//  2    30     [10 30]                   [130 120]
// 3 6  40 20   [30 50]  [30 30]      [20 60]  [70 20]
// 4 7  10 70   [50 40]  [30 100]     [20 10]  [0 70]
// 5    20      [50 70]               [0 20]

let [N, costs, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < arr.length; i++) {
  const [a, b] = arr[i];
  graph[a].push(b);
  graph[b].push(a);
}

const dp = Array.from({ length: N + 1 }, () => [0, 0]);
function dfs(prev, node) {
  if (graph[node].length === 1 && node !== 1) {
    // 단말노드
    dp[node][1] = costs[node - 1];
    return;
  }
  for (let next of graph[node]) {
    if (next === prev) continue;
    dfs(node, next);
    // node 선택안함
    if (dp[next][0] >= dp[next][1]) {
      dp[node][0] += dp[next][0];
    } else {
      dp[node][0] += dp[next][1];
    }
    // node 선택함 = next는 선택 하면 안됨
    dp[node][1] += dp[next][0];
  }
  dp[node][1] += costs[node - 1];
}
dfs(-1, 1);

const stack = [];
const answer = [];

if (dp[1][0] >= dp[1][1]) {
  console.log(dp[1][0]);
  stack.push([-1, 1, 0]);
} else {
  console.log(dp[1][1]);
  stack.push([-1, 1, 1]);
  answer.push(1);
}

while (stack.length > 0) {
  const [prev, node, type] = stack.pop();
  for (const next of graph[node]) {
    if (prev === next) continue;
    if (type === 0) {
      // node 선택 안함
      if (dp[next][0] >= dp[next][1]) {
        stack.push([node, next, 0]);
      } else {
        stack.push([node, next, 1]);
        answer.push(next);
      }
    } else if (type === 1) {
      // node 선택함
      stack.push([node, next, 0]);
    }
  }
}
console.log(answer.sort((a, b) => a - b).join(" "));
