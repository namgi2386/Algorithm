const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
const loads = [];

for (let i = 0; i < N; i++) {
  const p = Number(initArr[i]);
  loads.push([N, i, p]);
  loads.push([i, N, p]);
}
const board = initArr.slice(N);
for (let i = 0; i < N; i++) {
  for (let j = i + 1; j < N; j++) {
    if (i === j) continue;
    loads.push([i, j, board[i][j]]);
    loads.push([j, i, board[i][j]]);
  }
}

loads.sort((a, b) => a[2] - b[2]);

const parents = Array.from({ length: N + 1 }, (_, i) => i);

function find(idx) {
  if (parents[idx] === idx) return idx;
  parents[idx] = find(parents[idx]);
  return parents[idx];
}
let answer = 0;
for (let idx = 0; idx < loads.length; idx++) {
  const [i, j, c] = loads[idx];
  const [I, J] = [find(i), find(j)];

  if (I !== J) {
    parents[I] = J;
    answer += c;
  }
}
console.log(answer);
