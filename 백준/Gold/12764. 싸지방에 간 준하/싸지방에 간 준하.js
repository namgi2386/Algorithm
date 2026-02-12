const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

N = Number(N);
arr = arr.sort((a, b) => a[0] - b[0]);
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
      if (this.heap[idx][0] < this.heap[parent][0]) {
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
        right < this.heap.length &&
        this.heap[left][0] > this.heap[right][0]
      ) {
        smaller = right;
      }
      if (this.heap[idx][0] > this.heap[smaller][0]) {
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

const heap = new MinHeap(); // 현재 사용 가능한 컴퓨터 index 저장
const endHeap = new MinHeap(); // 끝나는 시간 체크
let lastIdx = -1; // 사용중인 컴퓨터 최대 index
const map = new Map(); // 컴퓨터별 사용횟수
for (let i = 0; i < N; i++) {
  const [start, end] = arr[i];
  // 퇴장 처리

  while (endHeap.peek() !== null) {
    const [exitTime, exitIdx] = endHeap.peek();
    if (exitTime <= start) {
      endHeap.pop();
      heap.push([exitIdx, i]);
    } else {
      break;
    }
  }

  // 입장 처리
  if (heap.peek() !== null) {
    // 사용가능한 컴퓨터 있음
    const [cumIdx, _] = heap.pop();
    endHeap.push([end, cumIdx]);
    map.set(cumIdx, map.get(cumIdx) + 1);
  } else {
    // 사용가능한 컴퓨터 없음
    endHeap.push([end, ++lastIdx]);
    map.set(lastIdx, 1);
  }
}
console.log(lastIdx + 1);

console.log([...map.values()].join(" "));
