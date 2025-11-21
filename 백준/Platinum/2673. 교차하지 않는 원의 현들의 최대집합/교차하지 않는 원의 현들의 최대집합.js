const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map((c) => c.split(" ").map(Number));

const dp = Array.from({ length: 101 }, () => new Array(101).fill(0));
const line = Array.from({ length: 101 }, () => new Array(101).fill(false));

for (let i = 0; i < N; i++) {
  const [a, b] = arr[i];
  line[a][b] = true;
  line[b][a] = true;
}
// 측정길이 1 - 100
for (let len = 1; len < 101; len++) {
  // 시작지점
  for (let s = 1; s <= 101 - len; s++) {
    // 분기점
    for (let k = s; k < s + len; k++) {
      // 시작지점 부터 측정길이 만큼까지에 대해 탐색할건데
      // 가능한 모든 분기점에 대해 Math.max 하여 최댓값을 찾는다
      // 분기점기준 왼쪽 + 오른쪽 + 전체line존재여부
      dp[s][s + len] = Math.max(
        dp[s][s + len],
        dp[s][k] + dp[k][s + len] + line[s][s + len]
      );
    }
  }
}
console.log(dp[1][100]);
