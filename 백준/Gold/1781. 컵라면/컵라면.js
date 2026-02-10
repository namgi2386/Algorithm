const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);

class MaxHeap {
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
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] < this.heap[idx]) {
        this.swap(parent, idx);
        idx = parent;
      } else {
        break;
      }
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < N) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let bigger = left;
      if (idx * 2 + 2 < N && this.heap[left] < this.heap[right]) {
        bigger = right;
      }
      if (this.heap[bigger] > this.heap[idx]) {
        this.swap(idx, bigger);
        idx = bigger;
      } else {
        break;
      }
    }
  }
  size() {
    return this.heap.length;
  }
}

arr = arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return b[1] - a[1];
  } else {
    return b[0] - a[0];
  }
}); // 내림차순

let idx = 0;
let heap = new MaxHeap();
let answer = 0;

for (let t = N; t > 0; t--) {
  while (idx < N) {
    if (arr[idx][0] >= t) {
      heap.push(arr[idx][1]);
      idx++;
    } else {
      break;
    }
  }

  if (heap.size() > 0) {
    answer += heap.pop();
  }
}
console.log(answer);

// console.log(answer < 2 ** 31 ? answer : 2 ** 31);
