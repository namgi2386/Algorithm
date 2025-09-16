const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [tc, ...inputs] = inputValue.split("\n");

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
      if (this.heap[parentIdx] < this.heap[idx]) break;
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
      if (right < this.heap.length && this.heap[left] > this.heap[right]) {
        small = right;
      }
      if (this.heap[idx] < this.heap[small]) break;
      this.swap(idx, small);
      idx = small;
    }
  }
  size() {
    return this.heap.length;
  }
}

let result = [];
for (let i = 0; i < inputs.length; i += 2) {
  const N = parseInt(inputs[i]);
  let arr = inputs[i + 1].split(" ").map(Number);
  let myHeap = new MinHeap();
  myHeap.init(arr);
  let totalSum = 0;
  while (myHeap.size() > 1) {
    const num1 = myHeap.pop();
    const num2 = myHeap.pop();
    const sumTwoOfUs = num1 + num2;

    totalSum += sumTwoOfUs;
    myHeap.push(sumTwoOfUs);
  }
  result.push(totalSum);
}
console.log(result.join("\n"));

// 0      1,3,3,4,4,5,5,5,14,17,21,21,32,35,98
// 4      3,4,4,4,5,5,5,14,17,21,21,32,35,98
// 11     4,4,5,5,5,7,14,17,21,21,32,35,98
// 19     5,5,5,7,8,14,17,21,21,32,35,98
// 29     5,7,8,10,14,17,21,21,32,35,98
// 41     8,10,12,14,17,21,21,32,35,98
// 59     12,14,17,18,21,21,32,35,98
// 85     17,18,21,21,26,32,35,98
// 120    21,21,26,32,35,35,98
// 162    26,32,35,35,42,98
// 220    35,35,42,58,98
// 290    42,58,70,98
// 390    70,98,100
// 558    100,168
// 826    268
