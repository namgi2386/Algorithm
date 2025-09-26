const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
M = Math.floor(((N - 1) * N) / 2);

initArr = initArr.map((c) => c.split(" ").map(parseFloat));
let arr = [];
for (let i = 0; i < N; i++) {
  for (let j = i; j < N; j++) {
    if (i !== j) {
      let [sx, sy] = initArr[i];
      let [ex, ey] = initArr[j];
      let weight = Math.sqrt((sx - ex) * (sx - ex) + (sy - ey) * (sy - ey));
      arr.push([i, j, weight]);
    }
  }
}

arr.sort((a, b) => a[2] - b[2]);
// console.log(arr);

let parent = Array.from({ length: N + 1 }, (_, i) => i);

function find(a) {
  if (parent[a] === a) return a;
  parent[a] = find(parent[a]);
  return parent[a];
}
function union(a, b) {
  let S = find(a);
  let E = find(b);
  parent[S] = E;
}

let answer = 0;
for (let i = 0; i < M; i++) {
  let [s, e, w] = arr[i];
  let S = find(s);
  let E = find(e);
  // console.log(s, e, S, E, i, N);

  if (S !== E) {
    union(S, e);
    answer += w;
    // console.log(answer - w, "+", w, "=", answer, ":", parent);
  }
}
console.log(answer.toFixed(3));
