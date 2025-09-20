const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
initN = Number(initN);
let arr = initArr.map((c) => c.split(" ").map(Number));

let dp = Array.from({ length: initN }, () => new Array(3).fill(0));
dp[0] = [arr[0][0], arr[0][1], arr[0][2]];

for (let i = 1; i < initN; i++) {
  let [a, b, c] = [...dp[i - 1]];

  dp[i][0] = arr[i][0] + Math.min(b, c);
  dp[i][1] = arr[i][1] + Math.min(a, c);
  dp[i][2] = arr[i][2] + Math.min(a, b);
}

console.log(Math.min(dp[initN - 1][0], dp[initN - 1][1], dp[initN - 1][2]));
