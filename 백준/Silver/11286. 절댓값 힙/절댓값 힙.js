const path = (process.platform === "linux" ? "/dev/stdin" : "input.txt");
const inputValue = require("fs").readFileSync(path).toString().trim();
const [N, ...inputs] = inputValue.split("\n").map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }
  size() {
    return this.heap.length;
  }
  swap(idx1, idx2) {
    [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
  }
  compare(a, b) {
    if (a[1] !== b[1]) return a[1] < b[1];
    return a[0] < b[0];
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
    let index = this.heap.length - 1;
    let parentIdx = Math.floor((index - 1) / 2);
    while (
      parentIdx >= 0 &&
      this.compare(this.heap[index], this.heap[parentIdx])
    ) {
      this.swap(index, parentIdx);
      index = parentIdx;
      parentIdx = Math.floor((index - 1) / 2);
    }
  }
  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    let leftIdx = index * 2 + 1;
    let rightIdx = index * 2 + 2;
    while (
      (leftIdx < length &&
        this.compare(this.heap[leftIdx], this.heap[index])) ||
      (rightIdx < length && this.compare(this.heap[rightIdx], this.heap[index]))
    ) {
      let smallerIdx = leftIdx;
      if (
        this.heap[rightIdx] &&
        this.compare(this.heap[rightIdx], this.heap[smallerIdx])
      ) {
        smallerIdx = rightIdx;
      }
      this.swap(index, smallerIdx);
      index = smallerIdx;
      leftIdx = index * 2 + 1;
      rightIdx = index * 2 + 2;
    }
  }
}

let heap = new MinHeap();
const answer = [];
for (let i = 0; i < N; i++) {
  const num = parseInt(inputs[i]);
  const absNum = Math.abs(num);
  if (num === 0) {
    const result = heap.pop();
    answer.push(result ? result[0] : 0);
  } else {
    heap.push([num, absNum]);
  }
}
console.log(answer.join("\n"));
