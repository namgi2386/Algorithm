const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let arr = inputValue.split("");
let N = arr.length;

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
// console.log(dp.join("\n"));
let cdp = new Array(N).fill(Infinity);
cdp[0] = 1;
for (let i = 1; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    if (dp[j][i] === 1) {
      if (j === 0) {
        cdp[i] = 1;
      } else {
        cdp[i] = Math.min(cdp[i], cdp[j - 1] + 1);
      }
    }
  }
}
console.log(cdp[N - 1]);
