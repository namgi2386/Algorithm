const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

let [N, M] = initN;

class Queue {
  constructor() {
    this.queue = new Map();
    this.peek = 0;
    this.idx = 0;
  }
  push(val) {
    this.queue.set(this.idx++, val);
  }
  shift() {
    if (this.peek === this.idx) return null;
    return this.queue.get(this.peek++);
  }
  size() {
    return this.idx - this.peek;
  }
}

let graph = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));

for (let i = 0; i < M; i++) {
  const [a, b] = initArr[i];
  graph[a][b] += 1;
}

function findWay() {
  let parent = new Array(N + 1).fill(-1);
  let visited = new Array(N + 1).fill(false);
  visited[1] = true;
  let queue = new Queue();
  queue.push(1);
  while (queue.size() > 0) {
    const position = queue.shift();
    if (position === 2) return parent;
    for (let i = 2; i < N + 1; i++) {
      const capacity = graph[position][i];

      if (capacity === 0) continue;
      if (visited[i]) continue;

      parent[i] = position;
      visited[i] = true;
      queue.push(i);
    }
  }
  return null;
}

function fnc() {
  let parent = findWay();
  if (parent === null) return -1;
  let position = 2;
  let minCost = Infinity;
  for (let v = position; v !== 1; v = parent[v]) {
    const u = parent[v];
    minCost = Math.min(minCost, graph[u][v]);
  }
  for (let v = position; v !== 1; v = parent[v]) {
    const u = parent[v];
    graph[u][v] -= minCost;
    graph[v][u] += minCost;
  }
  return minCost;
}
let answer = 0;
while (true) {
  let minCost = fnc();
  if (minCost === -1) break;
  answer += minCost;
}
console.log(answer);
