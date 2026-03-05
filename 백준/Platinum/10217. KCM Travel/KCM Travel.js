const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
let idx = 0;
const T = +lines[idx++];
const results = [];

for (let tc = 0; tc < T; tc++) {
  const [N, M, K] = lines[idx++].split(" ").map(Number);
  const graph = Array.from({ length: N + 1 }, () => []);

  for (let i = 0; i < K; i++) {
    const [u, v, c, d] = lines[idx++].split(" ").map(Number);
    graph[u].push([v, c, d]);
  }

  const dp = Array.from({ length: N + 1 }, () => Array(M + 1).fill(Infinity));
  dp[1][0] = 0;

  // 비용 기준으로 DP 테이블 순회
  for (let cost = 0; cost <= M; cost++) {
    for (let cur = 1; cur <= N; cur++) {
      if (dp[cur][cost] === Infinity) continue;

      const curTime = dp[cur][cost];

      for (const [next, edgeCost, edgeTime] of graph[cur]) {
        const nextCost = cost + edgeCost;
        const nextTime = curTime + edgeTime;

        if (nextCost > M) continue;

        if (dp[next][nextCost] > nextTime) {
          dp[next][nextCost] = nextTime;
        }
      }
    }
  }

  let answer = Math.min(...dp[N]);
  results.push(answer === Infinity ? "Poor KCM" : answer);
}

process.stdout.write(results.join("\n"));