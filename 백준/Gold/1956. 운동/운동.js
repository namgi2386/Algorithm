const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = initN.split(" ").map(Number);
initArr = initArr.map((c) => c.split(" ").map(Number));

let floyd = Array.from({ length: N + 1 }, () =>
  new Array(N + 1).fill(Infinity)
);
for (let i = 1; i < N + 1; i++) {
  floyd[i][i] = 0;
}
for (let i = 0; i < M; i++) {
  let [s, e, w] = initArr[i];
  floyd[s][e] = Math.min(floyd[s][e], w);
}
for (let k = 1; k < N + 1; k++) {
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      floyd[i][j] = Math.min(floyd[i][j], floyd[i][k] + floyd[k][j]);
    }
  }
}
let answer = Infinity;
for (let i = 1; i < N + 1; i++) {
  for (let j = 1; j < N + 1; j++) {
    if (i === j) continue;
    answer = Math.min(answer, floyd[i][j] + floyd[j][i]);
  }
}

console.log(answer === Infinity ? -1 : answer);
