const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;
const [A, B] = arr.pop();
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [a, b, c] = arr[i];
  graph[a].push([b, c]);
  graph[b].push([a, c]);
}
const [START, END] = [1, N];
// START -> A
// START -> B
// A -> B
// A -> END
// B -> END
// 이거 구하면됨. 우선 플로이드는 안됨 N이 800이라서...
// 다익스트라해야됨
// 힙에 저장될 상태는?
// [node, cost] 두개만 관리하고
// visited에서 최소 cost를 저장하고 있다면 될뜻?

class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const papa = Math.floor((idx - 1) / 2);
      if (this.heap[idx][1] < this.heap[papa][1]) {
        this.swap(idx, papa);
      } else {
        break;
      }
      idx = papa;
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smaller = left;
      if (this.heap.length > right) {
        if (this.heap[left][1] > this.heap[right][1]) {
          smaller = right;
        }
      }
      if (this.heap[idx][1] <= this.heap[smaller][1]) break;
      this.swap(idx, smaller);
      idx = smaller;
    }
  }
  size() {
    return this.heap.length;
  }
}
//  0
// 1 2
//34 56

function dycstra(start, end) {
  const visited = Array(N + 1).fill(Infinity);
  const heap = new MinHeap();
  heap.push([start, 0]);
  visited[start] = 0;
  while (heap.size() > 0) {
    const [node, cost] = heap.pop();
    if (visited[node] < cost) continue;
    graph[node].forEach((next, _) => {
      const [nextIdx, nextCost] = next;
      if (visited[nextIdx] <= cost + nextCost) return;
      visited[nextIdx] = cost + nextCost;
      heap.push([nextIdx, cost + nextCost]);
    });
  }
  return visited[end];
}
const sa = dycstra(START, A);
const sb = dycstra(START, B);
const ab = dycstra(A, B);
const ae = dycstra(A, END);
const be = dycstra(B, END);
const [Away, Bway] = [sa + ab + be, sb + ab + ae];
if (Away === Infinity || Bway === Infinity) {
  console.log("-1");
} else {
  console.log(Math.min(Away, Bway));
}
