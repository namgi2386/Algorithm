const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, chooArr, M, variArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
M = Number(M);
// 양팔저울 무게차가 variArr값과 같아야한다.
// 0 무게도 가능하다. 즉, 추하나=vari하나 일 수 있다.
let sumChoo = chooArr.reduce((a, b) => a + b, 0);
let dp = Array(sumChoo + 1).fill(false);
dp[0] = true;
for (let i = 0; i < N; i++) {
  let choo = chooArr[i];
  for (let j = dp.length - 1; j >= 0; j--) {
    if (dp[j] && j + choo < dp.length) {
      // console.log("dp:", i, j, dp);

      dp[j + choo] = true;
    }
  }
}
// console.log(dp.join(" "));

let answer = [];
for (let i = 0; i < M; i++) {
  let vari = variArr[i];
  let variAnswer = false;
  for (let j = 0; j < dp.length; j++) {
    if (dp[j] && j + vari < dp.length && dp[j + vari]) {
      variAnswer = true;
      break;
    }
  }
  answer.push(variAnswer ? "Y" : "N");
}
console.log(answer.join(" "));
