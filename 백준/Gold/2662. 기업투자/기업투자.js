const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let [N, M] = initN;

let costArr = Array.from({ length: M + 1 }, () => new Array(N + 1).fill(0));

for (let i = 1; i < M + 1; i++) {
  for (let j = 0; j < N; j++) {
    costArr[i][j + 1] = initArr[j][i];
  }
}
//
// console.log("init:");
// costArr.forEach((c) => {
//   console.log(c);
// });
// console.log("--");
//

let dp = Array.from({ length: M + 1 }, () => new Array(N + 1).fill(0));
const track = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));
//
// dp.forEach((c) => {
//   console.log(c);
// });
// console.log("--");
//
for (let i = 1; i < M + 1; i++) {
  for (let j = 0; j < N + 1; j++) {
    for (let k = 0; k < j + 1; k++) {
      const value = dp[i - 1][j - k] + costArr[i][k];
      if (value > dp[i][j]) {
        dp[i][j] = value;
        track[i][j] = k;
      }
    }
  }
}
//
// dp.forEach((c) => {
//   console.log(c);
// });
// console.log("--");
//
//
// track.forEach((c) => {
//   console.log(c);
// });
// console.log("--");
//

console.log(dp[M][N]);

const result = [];
let remain = N;
for (let i = M; i >= 1; i--) {
  result.push(track[i][remain]);
  remain -= track[i][remain];
}

// 1번 기업부터 출력해야 하므로 reverse
result.reverse();
console.log(result.join(" "));
