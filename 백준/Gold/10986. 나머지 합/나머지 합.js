const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
// 1 초	256 MB
// N: 1,000,000
// M: 1,000
// 각 값: 최대 10억
// 복잡도 최대 5*NlogN정도 가능함
let [N, M] = initN;

// 첫인덱스부터 누적합 끝까지
// 끝 도착시
// 두번째 인덱스부터 누적합 조지기

// KMP인건가?????????????? 조졌내 기억안나는데
initArr[0] %= M;
for (let i = 1; i < N; i++) {
  initArr[i] = (initArr[i - 1] + initArr[i]) % M;
}
let map = new Map();
for (let i = 0; i < N; i++) {
  map.set(initArr[i], (map.get(initArr[i]) || 0) + 1);
}
let answer = 0;
for (const [a, b] of map) {
  answer += Math.floor((b * (b - 1)) / 2);
  if (a === 0) answer += b;
}
console.log(answer);
