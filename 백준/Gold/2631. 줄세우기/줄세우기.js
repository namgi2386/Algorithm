const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [N, ...arr] = inputValue.split("\n").map(Number);

const dp = new Array(N).fill(1);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}
console.log(N - Math.max(...dp));
