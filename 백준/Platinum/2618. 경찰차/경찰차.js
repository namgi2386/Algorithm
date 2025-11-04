const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
const N = Number(lines[0]);
const M = Number(lines[1]);

const cases = [
  [1, 1],
  [N, N],
];
for (let i = 2; i < 2 + M; i++) {
  const [x, y] = lines[i].split(" ").map(Number);
  cases.push([x, y]);
}
function dist(a, b) {
  return (
    Math.abs(cases[a][0] - cases[b][0]) + Math.abs(cases[a][1] - cases[b][1])
  );
}
// 경찰차1이 i번째 사건까지, 경찰차2가 j번째 사건까지 처리했을 때 최소비용
const dp = Array.from({ length: M + 2 }, () => Array(M + 2).fill(-1));
//
const choice = Array.from({ length: M + 2 }, () => Array(M + 2).fill(0));

function solve(car1, car2) {
  const next = Math.max(car1, car2) + 1;

  if (next === M + 2) return 0; // 모든 사건 처리 완료

  if (dp[car1][car2] !== -1) return dp[car1][car2]; // 이미 해당사건을 처리한 적 있다면 pass

  // 경찰차1이 다음 사건 처리, 이때의 최소비용
  const case1 = solve(next, car2) + dist(car1, next);

  // 경찰차2가 다음 사건 처리, 이때의 최소비용
  const case2 = solve(car1, next) + dist(car2, next);

  if (case1 < case2) {
    dp[car1][car2] = case1;
    choice[car1][car2] = 1;
  } else {
    dp[car1][car2] = case2;
    choice[car1][car2] = 2;
  }

  return dp[car1][car2];
}

const result = solve(0, 1);
// console.log(dp);
// console.log(choice);

console.log(result);

// 경로 추적
let c1 = 0;
let c2 = 1;
const answer = [];
for (let i = 2; i < M + 2; i++) {
  const selected = choice[c1][c2];
  answer.push(selected);
  if (selected === 1) c1 = i;
  else c2 = i;
}

console.log(answer.join("\n"));
