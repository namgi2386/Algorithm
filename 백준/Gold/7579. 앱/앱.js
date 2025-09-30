const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, plusArr, costArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let [N, M] = initN;
let sumCost = costArr.reduce((a, b) => a + b, 0);

let dp = Array(sumCost + 1).fill(0);

for (let i = 0; i < N; i++) {
  let point = plusArr[i];
  let cost = costArr[i];
  for (let j = sumCost; j >= cost; j--) {
    dp[j] = Math.max(dp[j], dp[j - cost] + point);
  }
}
for (let i = 0; i < dp.length; i++) {
  if (dp[i] >= M) {
    console.log(i);
    break;
  }
}
