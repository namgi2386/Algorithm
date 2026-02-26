const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue.split("\n").map((c, i) => {
  if (i === 0) {
    return c;
  }
  return Number(c);
});
const [N, M] = initN.split(" ").map(Number);
const dp = Array.from({ length: M + 1 }, () => [0, 0]);
let trigger = true;
for (let i = 0; i < N; i++) {
  const num = arr[i];
  if (trigger) {
    dp[num][0]++;
    trigger = false;
  } else {
    dp[M - num + 1][1]++;
    trigger = true;
  }
}
let answerArr = new Array(M + 2).fill(0);
let answerArr2 = new Array(M + 2).fill(0);
for (let i = 2; i <= M; i++) {
  answerArr[i] = answerArr[i - 1] + dp[i][1]; // 종유석 (긴거부터)
}
for (let i = M; i >= 1; i--) {
  answerArr2[i] = answerArr2[i + 1] + dp[i][0]; // 석순
}
let answerNum = N + 1;
let answerCnt = 0;
for (let i = 1; i < M + 1; i++) {
  const c = answerArr[i] + answerArr2[i];
  if (answerNum > c) {
    answerNum = c;
    answerCnt = 1;
  } else if (answerNum === c) {
    answerCnt++;
  }
}
console.log(`${answerNum} ${answerCnt}`);
