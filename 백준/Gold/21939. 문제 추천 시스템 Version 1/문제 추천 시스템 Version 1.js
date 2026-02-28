const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n");

const N = Number(inputValue[0]);

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
  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][0] > this.heap[idx][0]) {
        this.swap(idx, parent);
        idx = parent;
      } else if (
        this.heap[parent][0] === this.heap[idx][0] &&
        this.heap[parent][1] > this.heap[idx][1]
      ) {
        this.swap(idx, parent);
        idx = parent;
      } else {
        break;
      }
    }
  }
  //    0
  //  1   2
  // 3 4
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let smaller = left;
      if (idx * 2 + 2 < this.heap.length) {
        if (this.heap[left][0] > this.heap[right][0]) {
          smaller = right;
        } else if (
          this.heap[left][0] === this.heap[right][0] &&
          this.heap[left][1] > this.heap[right][1]
        ) {
          smaller = right;
        }
      }
      if (this.heap[smaller][0] < this.heap[idx][0]) {
        this.swap(idx, smaller);
        idx = smaller;
      } else if (
        this.heap[smaller][0] === this.heap[idx][0] &&
        this.heap[smaller][1] < this.heap[idx][1]
      ) {
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
  peek() {
    if (this.heap.length === 0) return null;
    return this.heap[0];
  }
  bubbleUp() {
    let idx = this.heap.length - 1;
    while (idx > 0) {
      let parent = Math.floor((idx - 1) / 2);
      if (this.heap[parent][0] < this.heap[idx][0]) {
        this.swap(idx, parent);
        idx = parent;
      } else if (
        this.heap[parent][0] === this.heap[idx][0] &&
        this.heap[parent][1] < this.heap[idx][1]
      ) {
        this.swap(idx, parent);
        idx = parent;
      } else {
        break;
      }
    }
  }
  //    0
  //  1   2
  // 3 4
  bubbleDown() {
    let idx = 0;
    while (idx * 2 + 1 < this.heap.length) {
      let left = idx * 2 + 1;
      let right = idx * 2 + 2;
      let bigger = left;
      if (idx * 2 + 2 < this.heap.length) {
        if (this.heap[left][0] < this.heap[right][0]) {
          bigger = right;
        } else if (
          this.heap[left][0] === this.heap[right][0] &&
          this.heap[left][1] < this.heap[right][1]
        ) {
          bigger = right;
        }
      }
      if (this.heap[bigger][0] > this.heap[idx][0]) {
        this.swap(idx, bigger);
        idx = bigger;
      } else if (
        this.heap[bigger][0] === this.heap[idx][0] &&
        this.heap[bigger][1] > this.heap[idx][1]
      ) {
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

// 현재 "point" 자동정렬 자료구조
const minHeap = new MinHeap();
const maxHeap = new MaxHeap();
for (i = 1; i <= N; i++) {
  const [idx, point] = inputValue[i].split(" ").map(Number);
  minHeap.push([point, idx, 0]);
  maxHeap.push([point, idx, 0]); // point와 idx로 정렬 하는데, time 정보를 포함한다.
}

const M = Number(inputValue[N + 1]);
const deletedSet = new Set();
for (let i = 0; i < M; i++) {
  const [commend, ...etc] = inputValue[i + N + 2].split(" ");

  if (commend === "add") {
    const [idx, point] = [Number(etc[0]), Number(etc[1])];
    minHeap.push([point, idx, i + 1]);
    maxHeap.push([point, idx, i + 1]);
  } else if (commend === "recommend") {
    if (Number(etc[0]) === 1) {
      // 최댓값
      while (true) {
        const [maxPoint, maxIdx, maxTimer] = maxHeap.peek();
        if (deletedSet.has(maxIdx)) {
          deletedSet.delete(maxIdx);
          maxHeap.pop();
          continue;
        }
        console.log(maxIdx);
        break;
      }
    } else if (Number(etc[0]) === -1) {
      // 최솟값
      while (true) {
        const [minPoint, minIdx, minTimer] = minHeap.peek();
        if (deletedSet.has(minIdx)) {
          deletedSet.delete(minIdx);
          minHeap.pop();
          continue;
        }
        console.log(minIdx);
        break;
      }
    }
  } else if (commend === "solved") {
    const solvedIDX = Number(etc[0]);
    deletedSet.add(solvedIDX);
  }
}
