const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
M = Number(M);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [a, b, c] = arr[i];
  graph[a].push([b, c]);
}
const dp = Array.from({ length: N + 1 }, () => new Map());

function dfs(node) {
  if (graph[node].length === 0) return;
  for (const [next, cnt] of graph[node]) {
    if (dp[next].size !== 0) continue;
    dfs(next);
  }
  if (dp[node].size !== 0) return;
  for (const [next, cnt] of graph[node]) {
    // 단말노드라면 그냥 더해주기
    if (dp[next].size === 0) {
      dp[node].set(next, (dp[node].get(next) || 0) + cnt);
    }
    // 단말노드 아니라면
    for (const nn of dp[next].keys()) {
      dp[node].set(nn, (dp[node].get(nn) || 0) + dp[next].get(nn) * cnt);
    }
  }
}

dfs(N);

console.log(
  [...dp[N]]
    .sort((a, b) => a[0] - b[0])
    .map((c) => c.join(" "))
    .join("\n"),
);
