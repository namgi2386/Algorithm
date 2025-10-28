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

let graph = Array.from({ length: 2 * N + 1 }, () =>
  new Array(2 * N + 1).fill(0)
);
for (let i = 3; i <= N; i++) {
  graph[i][i + N] = 1;
}
for (let i = 0; i < M; i++) {
  const [a, b] = initArr[i];
  if (a === 1) {
    graph[a][b] = 1;
  } else {
    graph[a + N][b] = 1;
  }
  if (b === 1) {
    graph[b][a] = 1;
  } else {
    graph[b + N][a] = 1;
  }
}
function findWay(start, end) {
  let parent = new Array(2 * N + 1).fill(-1);
  let visited = new Array(2 * N + 1).fill(false);
  let queue = new Queue();
  visited[start] = true;
  queue.push(start);
  while (queue.size() > 0) {
    const position = queue.shift();
    if (position === end) return parent;
    for (let next = 1; next < 2 * N + 1; next++) {
      const capacity = graph[position][next];

      if (capacity === 0) continue;
      if (visited[next]) continue;

      parent[next] = position;
      visited[next] = true;
      queue.push(next);
    }
  }
  return null;
}

let answer = 0;
while (true) {
  let parent = findWay(1, 2);
  if (parent === null) break;
  for (let v = 2; v !== 1; v = parent[v]) {
    const u = parent[v];
    graph[u][v]--;
    graph[v][u]++;
  }
  answer++;
}
console.log(answer);
