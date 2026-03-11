const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, M, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
M = Number(M);

// 설계 17분, union-find 15분
// 1. 그룹 나누기
// 2. a -> all 연결해보기

const graph = Array.from({ length: N + 1 }, () => []);
const parent = new Array(N + 1);
for (let i = 0; i < N + 1; i++) {
  parent[i] = i;
}
function find(a) {
  if (parent[a] === a) {
    return a;
  }
  return find(parent[a]);
}
function union(a, b) {
  const papa = parent[a];
  parent[a] = b;
  if (papa === a) return;
  union(papa, b);
}
for (let i = 0; i < M; i++) {
  const [a, b] = arr[i];
  graph[a].push(b);
  graph[b].push(a);

  const pa = find(a);
  const pb = find(b);
  if (pa === a && pb !== b) {
    parent[a] = pb;
  } else if (pa !== a && pb === b) {
    parent[b] = pa;
  } else if (pa === a && pb === b) {
    parent[b] = pa;
  } else {
    union(a, pb);
  }
}
for (let i = 1; i < N + 1; i++) {
  const enst = find(i);
  parent[i] = enst;
}
// console.log(parent);

const answer = new Map();

for (let i = 1; i < N + 1; i++) {
  const pi = parent[i];
  const stack = [[i, 0]];
  const visited = new Map();
  visited.set(i, 0);
  while (stack.length > 0) {
    const [node, dist] = stack.pop();

    for (let next of graph[node]) {
      if (visited.has(next)) {
        if (visited.get(next) < dist + 1) continue;
      }
      visited.set(next, dist + 1);
      stack.push([next, dist + 1]);
    }
  }
  let maxDistAns = [...visited];

  let real = 0;
  for (let i = 0; i < maxDistAns.length; i++) {
    real = Math.max(real, maxDistAns[i][1]);
  }

  if (answer.has(pi)) {
    if (answer.get(pi)[1] > real) {
      answer.set(pi, [i, real]);
    }
  } else {
    answer.set(pi, [i, real]);
  }
}
console.log(answer.size);
console.log(
  [...answer]
    .map((c) => c[1][0])
    .sort((a, b) => a - b)
    .join("\n"),
);
