const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, initArr, M, ...initVarificationArr] = inputValue
  .split("\n")
  .map((c) => c.trim());
[N, M] = [Number(N), Number(M)];
let arr = initArr.split(" ").map(Number);
let variArr = initVarificationArr.map((c) => c.trim().split(" ").map(Number));

let dp = Array.from({ length: N }).map(() => new Array(N).fill(0));

for (let i = 0; i < N; i++) {
  for (let k = 0; k < 2; k++) {
    let t = Math.min(i, N - 1 - i);
    for (let e = 0; e < t + 1; e++) {
      if (arr[i - e] === arr[i + k + e]) {
        dp[i - e][i + k + e] = 1;
      } else {
        break;
      }
    }
  }
}
let answer = [];
for (let i = 0; i < M; i++) {
  let [r, c] = variArr[i];
  answer.push(dp[r - 1][c - 1]);
}
console.log(answer.join("\n"));