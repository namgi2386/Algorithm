const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n");
N = Number(N);
arr = arr.map((c) => c.split(" ").map(Number));
arr.sort((a, b) => a[0] - b[0]);
// console.log(arr);

class Heap {
  constructor() {
    this.heap = [];
  }
  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    let top = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return top;
  }
  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      const mom = Math.floor((idx - 1) / 2);
      if (this.heap[mom] <= this.heap[idx]) break;
      this.swap(idx, mom);
      idx = mom;
    }
  }
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smaller = left;
      if (right < this.heap.length && this.heap[left] > this.heap[right])
        smaller = right;
      if (this.heap[idx] <= this.heap[smaller]) break;
      this.swap(idx, smaller);
      idx = smaller;
    }
  }
  peek() {
    return this.heap[0];
  }
  size() {
    return this.heap.length;
  }
}
// 1
// 2 3
// 45 67
let room = new Heap();

room.push(arr[0][1]);
for (let i = 1; i < N; i++) {
  let [s, e] = arr[i];
  if (room.peek() <= s) room.pop();
  room.push(e);
}
console.log(room.size());
