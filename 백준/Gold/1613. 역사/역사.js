const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = initN.split(" ").map(Number);
let loadArr = initArr.slice(0, M).map((c) => c.split(" ").map(Number));
let variCnt = Number(initArr[M]);
let variArr = initArr.slice(M + 1).map((c) => c.split(" ").map(Number));

let floyd = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(false));

for (let i = 1; i < N + 1; i++) {
  floyd[i][i] = true;
}
for (let i = 0; i < M; i++) {
  let [s, e] = loadArr[i];
  floyd[s][e] = true;
}
for (let k = 1; k < N + 1; k++) {
  for (let i = 1; i < N + 1; i++) {
    for (let j = 1; j < N + 1; j++) {
      if (floyd[i][k] && floyd[k][j]) floyd[i][j] = true;
    }
  }
}
let answer = [];
for (let i = 0; i < variCnt; i++) {
  let [s, e] = variArr[i];
  let a = floyd[s][e];
  let b = floyd[e][s];
  if (!a && !b) answer.push(0);
  else if (a && !b) answer.push(-1);
  else if (!a && b) answer.push(1);
}
console.log(answer.join("\n"));
