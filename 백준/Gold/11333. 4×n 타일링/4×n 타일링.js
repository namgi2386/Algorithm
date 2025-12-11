const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const arr = inputValue.split("\n").map(Number);
const MOD = 1000000007n;
const N = 3336;
const dp = new Array(N + 1).fill(0n);
dp[1] = 3n;
let idx = 1n;
for (let i = 2; i <= N; i++) {
  idx += 1n;
  dp[i] = idx * 2n; // i full
  let dIdx = 1n;
  for (let d = 1; d < i; d++) {
    const num = d === 1 ? 3n : dIdx * 2n;
    dp[i] = (dp[i] + dp[i - d] * num) % MOD;
    dIdx += 1n;
  }
  dp[i] = dp[i] % MOD;
}

for (let i = 1; i <= arr[0]; i++) {
  const num = arr[i] % 3 === 0 ? arr[i] / 3 : 0;
  console.log(dp[num].toString());
}
