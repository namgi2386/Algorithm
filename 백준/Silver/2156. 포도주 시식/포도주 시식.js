const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim())
  .map(Number);

const dp = Array.from({ length: N + 1 }, () => [0, 0, 0, 0, 0, 0]);
//  0    1     2     3    4     5
// oxx , xox , xxo , oox, oxo, xoo
dp[0][2] = arr[0];
dp[1][1] = dp[0][2];
dp[1][5] = dp[0][2] + arr[1];

for (let i = 1; i < N; i++) {
  dp[i][0] = Math.max(dp[i - 1][1], dp[i - 1][3]);
  dp[i][1] = Math.max(dp[i - 1][2], dp[i - 1][4]);
  dp[i][2] = dp[i - 1][0] + arr[i];
  dp[i][3] = dp[i - 1][5];
  dp[i][4] = Math.max(dp[i - 1][1], dp[i - 1][3]) + arr[i];
  dp[i][5] = Math.max(dp[i - 1][2], dp[i - 1][4]) + arr[i];
}

process.stdout.write(Math.max(...dp[N - 1]).toString());
