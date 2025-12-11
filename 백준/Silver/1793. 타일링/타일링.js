const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const arr = inputValue.split("\n").map(Number);
const N = Math.max(...arr);
const dp = new Array(N + 1).fill(0n);
dp[0] = 1n;
dp[1] = 1n;
dp[2] = 3n;
for (let i = 3; i <= N; i++) {
  dp[i] = dp[i - 1] + dp[i - 2] * 2n;
}
for (let i = 0; i < arr.length; i++) {
  console.log(dp[arr[i]] + "");
}
