const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
const N = Number(lines[0]);
const cost = [];
for (let i = 1; i <= N; i++) {
  cost.push(lines[i].split(" ").map(Number));
}
const status = lines[N + 1].trim();
const P = Number(lines[N + 2]);

const INF = 987654321;
const dp = Array(1 << N).fill(-1);

let start = 0;
for (let i = 0; i < N; i++) {
  if (status[i] === "Y") start |= (1 << i);
}

function countBits(n) {
  let cnt = 0;
  while (n > 0) {
    cnt += n & 1;
    n >>= 1;
  }
  return cnt;
}

function solve(visited) {
  const cnt = countBits(visited);
  if (cnt >= P) return 0;

  if (dp[visited] !== -1) return dp[visited];

  dp[visited] = INF;

  for (let i = 0; i < N; i++) {
    if (!(visited & (1 << i))) continue;
    for (let j = 0; j < N; j++) {
      if (visited & (1 << j)) continue;
      dp[visited] = Math.min(dp[visited], solve(visited | (1 << j)) + cost[i][j]);
    }
  }

  return dp[visited];
}

const ans = solve(start);
if (P === 0) process.stdout.write("0");
else if (ans === INF) process.stdout.write("-1");
else process.stdout.write(String(ans));