const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
initN = Number(initN);
let arr = initArr.map((c) => c.split(" ").map(Number));
let answer = Infinity;
for (let s = 0; s < 3; s++) {
  let dp = Array.from({ length: initN }, () => new Array(3).fill(Infinity));
  dp[0][s] = arr[0][s];

  for (let i = 1; i < initN; i++) {
    let [a, b, c] = [...dp[i - 1]];
    // 순회를 dp로 하기 (살짝 reduce느낌?)
    dp[i][0] = arr[i][0] + Math.min(b, c);
    dp[i][1] = arr[i][1] + Math.min(a, c);
    dp[i][2] = arr[i][2] + Math.min(a, b);
  }
  for (let cc = 0; cc < 3; cc++) {
    if (cc !== s) answer = Math.min(dp[initN - 1][cc], answer);
  }
}
console.log(answer);
