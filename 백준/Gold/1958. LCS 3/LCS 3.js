const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [Arr, Brr, Crr] = inputValue.split("\n").map((c) => c.trim().split(""));
const [x, y, z] = [Arr.length, Brr.length, Crr.length];
let dp = Array.from({ length: x + 1 }).map(() =>
  Array.from({ length: y + 1 }).map(() => new Array(z + 1).fill(0))
);

for (let i = 1; i < x + 1; i++) {
  for (let j = 1; j < y + 1; j++) {
    for (let k = 1; k < z + 1; k++) {
      if (Arr[i - 1] === Brr[j - 1] && Brr[j - 1] === Crr[k - 1]) {
        // console.log("??");
        dp[i][j][k] = dp[i - 1][j - 1][k - 1] + 1;
      } else {
        // console.log("else:");
        dp[i][j][k] = Math.max(
          dp[i - 1][j][k],
          dp[i][j - 1][k],
          dp[i][j][k - 1]
        );
      }
    }
  }
}
// console.log(dp);

console.log(dp[x][y][z]);
