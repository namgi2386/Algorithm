const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, M, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, maxW] = initN.split(" ").map(Number);
M = Number(M);
initArr = initArr.map((c) => c.split(" ").map(Number));
initArr.sort((a, b) => {
  if (a[1] !== b[1]) return a[1] - b[1];
  else a[0] - b[0];
});

// 1번-N번 역까지 적재 예약할 arr
const arr = Array(N + 1).fill(0);
let answer = 0;
for (const [s, e, w] of initArr) {
  // 이미 s - e 사이에 적재되기로 예약된 중량 중 최대중량
  let maxResorvedW = 0;
  for (let i = s; i < e; i++) {
    maxResorvedW = Math.max(maxResorvedW, arr[i]);
  }
  // 적재해서 s-e를 이동하기에 가능한 중량
  const canResorveW = Math.min(w, maxW - maxResorvedW);
  // s - e구간에 적재 예약하기
  for (let i = s; i < e; i++) {
    arr[i] += canResorveW;
  }
  answer += canResorveW;
}
console.log(answer);
