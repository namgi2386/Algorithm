const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [a, b, c] = arr[i];
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}
const MOD = Infinity;

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx][1] <= this.heap[idx][1]) break;
      [this.heap[parentIdx], this.heap[idx]] = [
        this.heap[idx],
        this.heap[parentIdx],
      ];
      idx = parentIdx;
    }
  }

  bubbleDown() {
    let idx = 0;
    const length = this.heap.length;
    while (true) {
      let smallest = idx;
      const left = 2 * idx + 1;
      const right = 2 * idx + 2;

      if (left < length && this.heap[left][1] < this.heap[smallest][1]) {
        smallest = left;
      }
      if (right < length && this.heap[right][1] < this.heap[smallest][1]) {
        smallest = right;
      }
      if (smallest === idx) break;

      [this.heap[idx], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[idx],
      ];
      idx = smallest;
    }
  }

  size() {
    return this.heap.length;
  }
}
let stack = new MinHeap();
stack.push([1, 0, 0]);
// let stack = [[1, 0, 0]];
const visited = Array.from({ length: N + 1 }, () => [MOD, MOD]);
visited[0] = [MOD, MOD];
visited[1] = [MOD, MOD];
while (stack.size() > 0) {
  const [node, len, type] = stack.pop();
  if (visited[node][type] < len) continue;
  for (const [next, cost] of graph[node]) {
    const realCost = type === 0 ? cost / 2 : cost * 2;
    const nextType = type === 0 ? 1 : 0;
    if (visited[next][nextType] <= realCost + len) continue;
    visited[next][nextType] = realCost + len;
    stack.push([next, realCost + len, type === 0 ? 1 : 0]);
  }
}
// visited.map((c) => c.sort((a, b) => a - b));
// console.log(visited);

stack = new MinHeap();
stack.push([1, 0]);
const rabbited = new Array(N + 1).fill(MOD);
rabbited[0] = MOD;
rabbited[1] = MOD;
while (stack.size() > 0) {
  const [node, len] = stack.pop();
  if (rabbited[node] < len) continue;
  for (const [next, cost] of graph[node]) {
    if (rabbited[next] <= len + cost) continue;
    // if (visited[next][1] <= len + cost) continue;
    rabbited[next] = len + cost;
    stack.push([next, cost + len]);
  }
}

// console.log(rabbited);
// console.log(visited);
let answer = 0;
for (let i = 2; i <= N; i++) {
  const a = rabbited[i];
  const b = Math.min(visited[i][0], visited[i][1]);
  if (a < b) answer++;
}
console.log(answer);
