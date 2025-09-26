const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, M, ...arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
M = Number(M);
arr = arr.map((c) => c.split(" ").map(Number));
arr.sort((a, b) => a[2] - b[2]);
let parent = Array.from({ length: N + 1 }, (_, i) => i);
//console.log(arr);

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
console.log(answer);
