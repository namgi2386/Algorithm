const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, mArr, pArr, rArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let [N, T] = initN;

let fracArr = Array.from({ length: N }, (c, i) => i);
// 시간누적 배낭DP 핵심 sorting
fracArr.sort((a, b) => rArr[a] * pArr[b] - rArr[b] * pArr[a]);

// i번문제, j시간으로 2차원 배낭DP 생성
const dp = Array.from({ length: N + 1 }, () => Array(T + 1).fill(0));

// 배낭DP특, 뒤에서부터 업데이트함
for (let i = N - 1; i >= 0; i--) {
  let idx = fracArr[i]; // 현재 고려할 문제 index
  for (let t = 0; t < T + 1; t++) {
    dp[i][t] = dp[i + 1][t]; // default = 스킵
    let tempTimer = t + rArr[idx]; // 시간지남
    let point = mArr[idx] - pArr[idx] * tempTimer; // 점수계산식
    // 시간over아님 and 추가점수양수
    if (tempTimer <= T && point > 0) {
      // i번문제 스킵 후 i+1문제 풀었을 때의 점수와
      // i번문제 선택한 후 i+1문제 풀었을 때의 점수 비교를 통해
      // i번문제의 "선택 or 스킵"을 결정한다.
      dp[i][t] = Math.max(dp[i][t], dp[i + 1][tempTimer] + point);
    }
  }
}
console.log(dp[0][0]);
