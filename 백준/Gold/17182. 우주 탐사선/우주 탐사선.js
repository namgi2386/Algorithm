const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...board] = inputValue.split("\n").map((c) => c.trim());
let [N, K] = initN.split(" ").map(Number);
board = board.map((c) => c.split(" ").map(Number));

// 플로이드-워셜 없이 진행

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
    let ans = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return ans;
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx][0] <= this.heap[idx][0]) return;
      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      if (left >= this.heap.length) return;
      let smaller = left;
      if (
        right < this.heap.length &&
        this.heap[left][0] > this.heap[right][0]
      ) {
        smaller = right;
      }
      if (this.heap[smaller][0] < this.heap[idx][0]) {
        this.swap(smaller, idx);
      }
      idx = smaller;
    }
  }
  size() {
    return this.heap.length;
  }
}

let heap = new MinHeap();
let dist = Array.from({ length: 1 << N }, () => new Array(N).fill(Infinity));

let initVisited = 1 << K;
dist[initVisited][K] = 0;
heap.push([0, K, initVisited]);

let answer = Infinity;

while (heap.size() > 0) {
  let [cost, current, visited] = heap.pop();
  
  if (dist[visited][current] < cost) continue;
  
  if (visited === (1 << N) - 1) {
    answer = Math.min(answer, cost);
    continue;
  }
  
  for (let next = 0; next < N; next++) {
    let nextVisited = visited | (1 << next);
    let nextCost = cost + board[current][next];
    
    if (dist[nextVisited][next] > nextCost) {
      dist[nextVisited][next] = nextCost;
      heap.push([nextCost, next, nextVisited]);
    }
  }
}

console.log(answer);