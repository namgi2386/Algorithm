const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [Arr, Brr] = inputValue.split("\n").map((c) => c.trim().split(""));
const [n, m] = [Arr.length, Brr.length];
let dp = Array.from({ length: n + 1 }).map(() => new Array(m + 1).fill(0));
for (let i = 1; i < n + 1; i++) {
  for (let j = 1; j < m + 1; j++) {
    if (Arr[i - 1] === Brr[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}
//console.log(dp);

console.log(dp[n][m]);
