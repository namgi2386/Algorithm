const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
const arr = Array.from({ length: N }, () => []);
const dp = Array.from({ length: N }, () =>
  Array.from({ length: 1 << N }, () => new Array(10).fill(-1))
);
for (let i = 0; i < N; i++) {
  arr[i] = initArr[i].split("").map(Number);
}
// 0번 index 시작
// 1번start 부터 9번start까지 dfs 돌려봐
// dp에 해당 index에 도착했을때의 point정보를 저장해두자

let maxLen = 0;
function dfs(node, visited, money, visitedLen, futureLen) {
  let temp = 0;
  for (let next = 1; next < N; next++) {
    if (visited & (1 << next)) continue; // visited 검사
    const nextMoney = arr[node][next]; // 판매가
    if (nextMoney < money) continue; // 비싸서 못감
    const nextDpLen = dp[next][visited + (1 << next)][nextMoney]; // -1 아니라면, nextMoney들고 다 돌아본 결과 최대 연장길이 저장된상태
    if (nextDpLen !== -1) {
      maxLen = Math.max(maxLen, visitedLen + nextDpLen); // 더이상 안가봐도 됨
      continue;
    }
    const ffu = dfs(
      next,
      visited + (1 << next),
      nextMoney,
      visitedLen + 1,
      futureLen
    ); // 다음 사람
    temp = Math.max(temp, ffu);
  }
  // 여기서 더이상 갈 수 있는 곳이 없음.
  dp[node][visited][money] = futureLen + temp;
  // console.log(node, visited, money, visitedLen, futureLen);
  maxLen = Math.max(maxLen, visitedLen);

  return futureLen + temp;
}
dfs(0, 1, 0, 1, 0);
console.log(maxLen);
