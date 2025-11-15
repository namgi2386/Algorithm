const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, arr] = inputValue.split("\n").map((c) => c.split(" ").map(Number));
const [N, M] = initN;

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
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent] > this.heap[idx]) {
        this.swap(parent, idx);
      }
      idx = parent;
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smaller = left;
      if (
        smaller + 1 < this.heap.length &&
        this.heap[smaller] > this.heap[right]
      ) {
        smaller = right;
      }
      if (this.heap[idx] > this.heap[smaller]) {
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
  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }
}
const myHeap = new MinHeap();
const deletedHeap = new MinHeap();
let answer = "";
for (let i = 0; i < N; i++) {
  const num = arr[i];
  if (i >= M) {
    deletedHeap.push(arr[i - M]);
  }
  myHeap.push(num);

  while (deletedHeap.size() > 0 && myHeap.size() > M) {
    const peek = myHeap.peek();
    const deletedPeek = deletedHeap.peek();
    if (peek !== deletedPeek) break;
    deletedHeap.pop();
    myHeap.pop();
  }
  answer += myHeap.peek() + " ";
  if (i % 10000 === 0 || i === N - 1) {
    process.stdout.write(answer);
    answer = "";
  }
}
console.log(answer.trimEnd());
