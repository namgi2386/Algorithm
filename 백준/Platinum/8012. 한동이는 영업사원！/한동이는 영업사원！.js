const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n");
N = Number(N);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b] = arr[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}
const parent = Array.from({ length: N + 1 }, () => []);
const stack = [1];
const visited = new Array(N + 1).fill(false);
visited[0] = true;
visited[1] = true;
parent[1].push(1);
while (stack.length > 0) {
  const node = stack.pop();
  for (const next of graph[node]) {
    if (visited[next]) continue;
    visited[next] = true;
    parent[next] = [...parent[node]];
    parent[next].push(next);
    stack.push(next);
  }
}
function LCA(a, b) {
  let idx = Math.min(parent[a].length, parent[b].length);
  while (idx > 0) {
    const pa = parent[a][idx - 1];
    const pb = parent[b][idx - 1];

    if (pa === pb) {
      return pa;
    } else {
      idx--;
    }
  }
  return null;
}

const M = Number(arr[N - 1]);
let prev = 1; // 이전 노드
let answer = 0;
for (let i = 0; i < M; i++) {
  const node = Number(arr[N + i]); // 방문순서대로 뽑기
  const foundLca = LCA(prev, node);
  answer += parent[prev].length + parent[node].length;
  answer -= parent[foundLca].length * 2;
  // console.log(
  //   prev,
  //   "=>",
  //   node,
  //   "=",
  //   foundLca,
  //   ":",
  //   parent[prev].length,
  //   parent[node].length,
  //   answer,
  // );

  prev = node;
}
console.log(answer);
