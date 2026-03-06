const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const N = Number(inputValue[0]);
const M = Number(inputValue[N + 1]);
const MOD = 501;
const board = Array.from({ length: MOD }, () => new Array(MOD).fill(0));

for (let i = 0; i < N; i++) {
  let [x1, y1, x2, y2] = inputValue[i + 1];
  if (x1 > x2) [x1, x2] = [x2, x1];
  if (y1 > y2) [y1, y2] = [y2, y1];
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      board[x][y] = 1;
    }
  }
}

for (let i = 0; i < M; i++) {
  let [x1, y1, x2, y2] = inputValue[N + 2 + i];
  if (x1 > x2) [x1, x2] = [x2, x1];
  if (y1 > y2) [y1, y2] = [y2, y1];
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      board[x][y] = 2;
    }
  }
}

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
    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return result;
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][2] > this.heap[idx][2]) {
        this.swap(idx, parent);
        idx = parent;
      } else {
        break;
      }
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smaller = left;
      if (
        idx * 2 + 2 < this.heap.length &&
        this.heap[left][2] > this.heap[right][2]
      ) {
        smaller = right;
      }
      if (this.heap[idx][2] > this.heap[smaller][2]) {
        this.swap(idx, smaller);
        idx = smaller;
      } else {
        break;
      }
    }
  }
  size() {
    return this.heap.length;
  }
}

const heap = new MinHeap();

function isValid(a, b) {
  return 0 <= a && a < MOD && 0 <= b && b < MOD;
}
const dx = [0, 0, 1, -1];
const dy = [1, -1, 0, 0];

heap.push([0, 0, 0]); // x , y , cost
let answer = -1;
while (heap.size() > 0) {
  const [x, y, cost] = heap.pop();
  if (x === 500 && y === 500) {
    answer = cost;
    break;
  }
  for (let d = 0; d < 4; d++) {
    const [nx, ny] = [x + dx[d], y + dy[d]];
    if (!isValid(nx, ny)) continue;
    const nc = board[nx][ny];
    if (nc === 2) continue;
    board[nx][ny] = 2;
    heap.push([nx, ny, cost + nc]);
  }
}
console.log(answer);
