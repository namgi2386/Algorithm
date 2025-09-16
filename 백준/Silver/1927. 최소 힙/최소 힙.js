const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [N, ...inputs] = inputValue.split("\n").map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  push(value) {
    this.heap.push(value);
    this.bubbleUp();
  }
  pop() {
    if (this.heap.length === 0) return ['',0];
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
      if (this.heap[idx][1] >= this.heap[parentIdx][1]) break;
      this.swap(idx, parentIdx);
      idx = parentIdx;
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smallerIdx = left;
      if (
        right < this.heap.length &&
        this.heap[right][1] < this.heap[left][1]
      ) {
        smallerIdx = right;
      }
      if (this.heap[idx][1] <= this.heap[smallerIdx][1]) break;
      this.swap(idx, smallerIdx);
      idx = smallerIdx;
    }
  }
}

let myHeap = new MinHeap();
let result = [];
for (let i = 0; i < N; i++) {
  if (inputs[i] === 0) {
    result.push(myHeap.pop()[1]);
  } else {
    myHeap.push(["", inputs[i]]);
  }
}
console.log(result.join("\n"));

//     0
//  1     2
// 3 4   5 6
// [ value , num ]
