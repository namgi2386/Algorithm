const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
let [N, M] = initN;

class MinHeap {
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
    let minNum = this.heap[0];
    this.heap[0] = this.heap.pop();
    // console.log("in2:", stack.heap);
    this.bubbleDown();
    // console.log("in3:", stack.heap);

    return minNum;
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    // console.log("bbu:", idx, Math.floor((idx - 1) / 2));

    while (idx > 0) {
      let mom = Math.floor((idx - 1) / 2);
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
      if (right < this.heap.length && this.heap[right] < this.heap[left]) {
        smaller = right;
      }
      // console.log("?", idx, smaller, this.heap);

      if (this.heap[idx] < this.heap[smaller]) {
        return;
      }
      this.swap(idx, smaller);
      idx = smaller;
    }
  }
  size() {
    return this.heap.length;
  }
  // 0
  // 1 2
  // 34 56
}

// 그래프 만들고
// child 배열 만들고 child 없는 root노드 내림차순으로 출력하고 제거하기
// child 노드 놈들 중 검증
let parent = Array.from({ length: N + 1 }, () => 0);
let child = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  let [s, e] = initArr[i];
  parent[e]++;
  child[s].push(e);
}

let answer = [];
let stack = new MinHeap();

for (let i = 1; i < N + 1; i++) {
  if (parent[i] === 0) {
    stack.push(i);
    parent[i] = -1;
  }
}

// console.log("init:", stack);
while (stack.size() > 0) {
  let idx = stack.pop();
  answer.push(idx);
  for (c of child[idx]) {
    if (--parent[c] === 0) stack.push(c);
  }
}
console.log(answer.join(" "));

// let stack = new MinHeap();
// stack.push(3);
// stack.push(5);
// stack.push(1);
// stack.push(7);
// console.log(stack.pop());
// stack.push(2);
// console.log(stack);

// console.log(stack.pop());
