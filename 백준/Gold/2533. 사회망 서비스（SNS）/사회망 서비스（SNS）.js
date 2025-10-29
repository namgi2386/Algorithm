const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map((c) => c.split(" ").map(Number));
N = Number(N);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b] = arr[i];
  graph[a].push(b);
  graph[b].push(a);
}
const dp = Array.from({ length: N + 1 }, () => [0, 1]);

function dfs(node, papa) {
  // console.log(node, graph[node]);

  for (const next of graph[node]) {
    if (next === papa) continue;
    dfs(next, node);
    // console.log("in:", node, dp[node], dp[next]);

    dp[node][0] += dp[next][1];
    dp[node][1] += Math.min(dp[next][0], dp[next][1]);
  }
}
dfs(1, -1);
// console.log(dp);

console.log(Math.min(...dp[1]));
