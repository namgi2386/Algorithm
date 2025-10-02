const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, M, Target] = initN.split(" ").map(Number);
let arr = initArr.map((c) => c.split(" ").map(Number));

let graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  let [s, e, w] = arr[i];
  graph[s].push([e, w]);
}
// console.log("graph:", graph);

class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  init(arr) {
    arr.sort((a, b) => a - b);
    this.heap.push(...arr);
  }
  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();

    return value;
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      if (this.heap[parentIdx][1] < this.heap[idx][1]) break;
      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let small = left;
      if (
        right < this.heap.length &&
        this.heap[left][1] > this.heap[right][1]
      ) {
        small = right;
      }
      if (this.heap[idx][1] < this.heap[small][1]) break;
      this.swap(idx, small);
      idx = small;
    }
  }
  size() {
    return this.heap.length;
  }
}

function run(start, end) {
  let dist = Array(N + 1).fill(Infinity);
  let heap = new MinHeap();
  heap.push([start, 0]);
  while (heap.size() > 0) {
    let [idx, cost] = heap.pop();
    if (idx === end) return cost;

    for (let i = 0; i < graph[idx].length; i++) {
      let [nextIdx, weight] = graph[idx][i];
      if (dist[nextIdx] > weight + cost) {
        dist[nextIdx] = weight + cost;
        heap.push([nextIdx, weight + cost]);
      }
    }
  }
}
let answer = 0;
for (let i = 1; i < N + 1; i++) {
  answer = Math.max(answer, run(i, Target) + run(Target, i));
}
console.log(answer);
