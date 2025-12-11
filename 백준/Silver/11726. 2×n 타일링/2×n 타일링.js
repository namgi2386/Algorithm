const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const N = Number(inputValue);
const MOD = 10007;

const dp = new Array(N + 1).fill(0);
dp[1] = 1;
dp[2] = 2;
for (let i = 3; i <= N; i++) {
  dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
}
console.log(dp[N]);

// 111 1
// 21  1
// 12  1
// 11  2
// 2   2