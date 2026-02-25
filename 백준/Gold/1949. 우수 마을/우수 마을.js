const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, cities, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);

const graph = Array.from({ length: N + 1 }, () => []);
for (const [a, b] of arr) {
  graph[a].push(b);
  graph[b].push(a);
}

const dp = Array.from({ length: N + 1 }, () => [0, 0]);

function dfs(node, parent) {
  dp[node][0] = 0;
  dp[node][1] = cities[node - 1];

  for (const child of graph[node]) {
    if (child === parent) continue;
    dfs(child, node);
    dp[node][0] += Math.max(dp[child][0], dp[child][1]);
    dp[node][1] += dp[child][0];
  }
}

dfs(1, 0);
console.log(Math.max(dp[1][0], dp[1][1]));
