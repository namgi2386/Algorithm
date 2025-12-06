const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initBoard] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
const [N, M, R] = initN;

const dp = Array.from({ length: 257 }, () => [0, 0]);
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const num = initBoard[i][j];
    for (let k = 0; k < num; k++) {
      dp[k][0] += num - k;
    }
    for (let k = num + 1; k < 257; k++) {
      dp[k][1] += k - num;
    }
  }
}

let answer = [Infinity, 0];
for (let i = 0; i < 257; i++) {
  const [dic, fil] = dp[i];
  const maxBlock = dic + R;
  if (maxBlock < fil) break;
  const cost = dic * 2 + fil;
  if (answer[0] >= cost) {
    answer[0] = cost;
    answer[1] = i;
  }
}
console.log(answer.join(" "));
