const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, M] = initN.split(" ").map(Number);

let parent = Array(N * M).fill(-1);

function find(a) {
  if (parent[a] === -1) return a;
  parent[a] = find(parent[a]);
  return parent[a];
}

function union(a, b) {
  let x = find(a);
  let y = find(b);
  if (x !== y) {
    parent[x] = y;
  }
}
function where(type, r, c) {
  switch (type) {
    case "U":
      return [r - 1, c];
    case "D":
      return [r + 1, c];
    case "L":
      return [r, c - 1];
    case "R":
      return [r, c + 1];
    default:
      return null;
  }
}

function solution() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      let [nextR, nextC] = where(initArr[i][j], i, j);
      let [pIdx, nIdx] = [i * M + j, nextR * M + nextC];
      if (find(pIdx) !== find(nIdx)) union(pIdx, nIdx);
      // console.log(i, j, nextR, nextC, parent.join(","));
    }
  }

  let answer = 0;
  for (let i = 0; i < N * M; i++) {
    if (parent[i] === -1) answer++;
  }

  return answer;
}
console.log(solution());
