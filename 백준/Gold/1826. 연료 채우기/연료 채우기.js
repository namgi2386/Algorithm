const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, ...arr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
let [home, initPower] = arr.pop().split(" ").map(Number);
arr = arr.map((c) => c.split(" ").map(Number)).sort((a, b) => a[0] - b[0]);

class MaxHeap {
  // 수정: MinHeap -> MaxHeap
  constructor() {
    this.heap = [];
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  push(val) {
    this.heap.push(val);
    // console.log("push1", this.heap);

    this.bubbleUp();
    // console.log("push2", this.heap);
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    // console.log("in1:", stack.heap);
    let maxNum = this.heap[0]; // 수정: minNum -> maxNum
    this.heap[0] = this.heap.pop();
    // console.log("in2:", stack.heap);
    this.bubbleDown();
    // console.log("in3:", stack.heap);

    return maxNum; // 수정: minNum -> maxNum
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    // console.log("bbu:", idx, Math.floor((idx - 1) / 2));

    while (idx > 0) {
      let mom = Math.floor((idx - 1) / 2);
      if (this.heap[mom] >= this.heap[idx]) break; // 수정: <= -> >=
      this.swap(idx, mom);
      idx = mom;
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let larger = left; // 수정: smaller -> larger
      if (right < this.heap.length && this.heap[right] > this.heap[left]) {
        // 수정: < -> >
        larger = right; // 수정: smaller -> larger
      }
      // console.log("?", idx, larger, this.heap); // 수정: smaller -> larger

      if (this.heap[idx] > this.heap[larger]) {
        // 수정: < -> >, smaller -> larger
        return;
      }
      this.swap(idx, larger); // 수정: smaller -> larger
      idx = larger; // 수정: smaller -> larger
    }
  }
  size() {
    return this.heap.length;
  }
}

let heap = new MaxHeap();

let position = initPower;
let idx = 0;
let answer = 0;
while (position < home) {
  // console.log(heap.size());

  while (idx < N && arr[idx][0] <= position) {
    heap.push(arr[idx][1]);
    idx++;
  }
  if (heap.size() === 0) {
    answer = -1;
    break;
  }
  position += heap.pop();
  answer++;
}
console.log(answer);
