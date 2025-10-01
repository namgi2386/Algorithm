const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, mArr, pArr, rArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let [N, T] = initN;

let fracArr = Array.from({ length: N }, (c, i) => i);
fracArr.sort((a, b) => rArr[a] * pArr[b] - rArr[b] * pArr[a]);

const dp = Array.from({ length: N + 1 }, () => Array(T + 1).fill(0));

for (let i = N - 1; i >= 0; i--) {
  let idx = fracArr[i];
  for (let t = 0; t < T + 1; t++) {
    // default = 스킵
    dp[i][t] = dp[i + 1][t];
    let tempTimer = t + rArr[idx];
    if (tempTimer <= T) {
      let point = mArr[idx] - pArr[idx] * tempTimer;
      if (point > 0) {
        // 스킵 vs 선택
        dp[i][t] = Math.max(dp[i][t], dp[i + 1][tempTimer] + point);
      }
    }
  }
}
console.log(dp[0][0]);
