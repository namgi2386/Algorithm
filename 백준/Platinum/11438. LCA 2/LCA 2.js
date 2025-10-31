const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N); // 100,000
let tree = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  const [a, b] = initArr[i];
  tree[a].push(b);
  tree[b].push(a);
}

class Queue {
  constructor() {
    this.queue = new Map();
    this.idx = 0;
    this.peek = 0;
  }
  push(val) {
    this.queue.set(this.idx++, val);
  }
  shift() {
    if (this.idx === this.peek) return null;
    return this.queue.get(this.peek++);
  }
  size() {
    return this.idx - this.peek;
  }
}
const MAX_LOG = Math.ceil(Math.log2(N)) + 1;
function bfs() {
  // sparse table: parent[node][k] = node의 2^k번째 조상
  const parent = Array.from({ length: N + 1 }, () => Array(MAX_LOG).fill(0));
  //
  const visited = new Array(N + 1).fill(false);
  const level = new Array(N + 1).fill(-1);
  const queue = new Queue();
  queue.push(1);
  visited[1] = true;
  level[1] = 0;
  while (queue.size() > 0) {
    const node = queue.shift();
    for (const next of tree[node]) {
      if (visited[next]) continue;
      visited[next] = true;
      level[next] = level[node] + 1;
      parent[next][0] = node;
      queue.push(next);
    }
  }
  return { parent, level };
}
// fillSparseTable
function fillSparseTable() {
  for (let k = 1; k < MAX_LOG; k++) {
    for (let node = 1; node <= N; node++) {
      parent[node][k] = parent[parent[node][k - 1]][k - 1];
    }
  }
}
function LCA(a, b) {
  // a를 더 깊은 노드로
  if (level[a] < level[b]) [a, b] = [b, a];

  // 깊이 맞추기
  const diff = level[a] - level[b];
  for (let k = 0; k < MAX_LOG; k++) {
    if ((diff >> k) & 1) {
      a = parent[a][k];
    }
  }

  // 이미 같으면 return
  if (a === b) return a;

  // 이진 점프로 LCA 직전까지 올라가기
  for (let k = MAX_LOG - 1; k >= 0; k--) {
    if (parent[a][k] !== parent[b][k]) {
      a = parent[a][k];
      b = parent[b][k];
    }
  }

  return parent[a][0];
}
const M = Number(initArr[N - 1]); // 100,000
const { parent, level } = bfs();
fillSparseTable();

let answer = [];

for (let i = N; i < N + M; i++) {
  const [a, b] = initArr[i];
  const lca = LCA(a, b);

  answer.push(lca);
}
console.log(answer.join("\n"));
