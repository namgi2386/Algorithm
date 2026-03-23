const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...line] = inputValue.split("\n");
const [N, M] = initN.trim().split(" ").map(Number);
const board = [];
for (let i = 0; i < N; i++) {
  board.push(line[i].trim().split("").map(Number));
}

const dp = Array.from({ length: N + 2 }, () =>
  Array.from({ length: M + 2 }, () => [0, 0]),
);
for (let i = 1; i < N + 1; i++) {
  for (let j = 1; j < M + 1; j++) {
    const node = board[i - 1][j - 1];
    dp[i][j][0] = node === 1 ? dp[i - 1][j - 1][0] + 1 : 0;
    dp[i][j][1] = node === 1 ? dp[i - 1][j + 1][1] + 1 : 0;
  }
}
// for (let i = 1; i <= N; i++) {
//   console.log(dp[i].map((c) => c.join(",")).join("|"));
// }

let answer = 0;
for (let i = N; i > 0; i--) {
  for (let j = 1; j < M + 1; j++) {
    const [left, right] = dp[i][j];
    const smaller = Math.min(left, right);
    if (smaller <= answer) continue;
    for (let k = smaller; k >= 1; k--) {
      const leftUp = dp[i - k + 1][j - k + 1][1];
      if (leftUp < k) continue;
      const rightUp = dp[i - k + 1][j + k - 1][0];
      if (rightUp < k) continue;
      answer = Math.max(answer, k);
      break;
    }
  }
}
console.log(answer);
