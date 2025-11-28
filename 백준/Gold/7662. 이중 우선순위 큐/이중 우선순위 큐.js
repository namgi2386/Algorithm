const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Heap {
  constructor(compareFunc) {
    this.heap = [];
    this.compareFunc = compareFunc;
  }
  
  compare(a, b) {
    return this.compareFunc(this.heap[a], this.heap[b]);
  }
  
  push(n) {
    this.heap.push(n);
    let childIdx = this.heap.length - 1;
    
    while (Math.floor((childIdx - 1) / 2) >= 0) {
      const parentIdx = Math.floor((childIdx - 1) / 2);
      if (this.compare(childIdx, parentIdx)) break;
      [this.heap[parentIdx], this.heap[childIdx]] = [this.heap[childIdx], this.heap[parentIdx]];
      childIdx = parentIdx;
    }
  }
  
  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const popped = this.heap[0];
    this.heap[0] = this.heap.pop();
    
    let parentIdx = 0;
    while (parentIdx * 2 + 1 < this.heap.length) {
      let childIdx = parentIdx * 2 + 1;
      if (childIdx + 1 < this.heap.length && this.compare(childIdx, childIdx + 1)) {
        childIdx++;
      }
      if (this.compare(childIdx, parentIdx)) break;
      [this.heap[parentIdx], this.heap[childIdx]] = [this.heap[childIdx], this.heap[parentIdx]];
      parentIdx = childIdx;
    }
    
    return popped;
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
  
  top() {
    return this.heap[0];
  }
  
  reset() {
    this.heap = [];
  }
}

class DoubleEndedPQueue {
  constructor() {
    this.maxHeap = new Heap((a, b) => a < b);  // 최대힙
    this.minHeap = new Heap((a, b) => a > b);  // 최소힙
    this.map = new Map();  // 값의 개수 추적
  }
  
  push(value) {
    this.maxHeap.push(value);
    this.minHeap.push(value);
    this.map.set(value, (this.map.get(value) || 0) + 1);
  }
  
  popMax() {
    const popped = this.maxHeap.pop();
    if (popped !== null) {
      this.map.set(popped, this.map.get(popped) - 1);
      this.clear();
    }
  }
  
  popMin() {
    const popped = this.minHeap.pop();
    if (popped !== null) {
      this.map.set(popped, this.map.get(popped) - 1);
      this.clear();
    }
  }
  
  // 핵심: Lazy Deletion
  clear() {
    while (!this.minHeap.isEmpty() && this.map.get(this.minHeap.top()) === 0) {
      this.minHeap.pop();
    }
    while (!this.maxHeap.isEmpty() && this.map.get(this.maxHeap.top()) === 0) {
      this.maxHeap.pop();
    }
  }
  
  getResult() {
    this.clear();
    if (this.maxHeap.isEmpty() || this.minHeap.isEmpty()) {
      return "EMPTY";
    }
    return `${this.maxHeap.top()} ${this.minHeap.top()}`;
  }
  
  reset() {
    this.maxHeap.reset();
    this.minHeap.reset();
    this.map.clear();
  }
}

const depq = new DoubleEndedPQueue();
const answer = [];
let index = 0;
let endLine = 0;

rl.on('line', (line) => {
  // 첫 줄 (테스트케이스 개수)
  if (index === 0) {
    index++;
    return;
  }
  
  // 새 테스트케이스 시작
  if (index > endLine) {
    endLine = Number(line) + index++;
    depq.reset();
    return;
  }
  
  // 명령어 처리
  const [cmd, value] = line.split(' ');
  
  if (cmd === 'I') {
    depq.push(Number(value));
  } else {
    Number(value) === 1 ? depq.popMax() : depq.popMin();
  }
  
  // 테스트케이스 종료
  if (index === endLine) {
    answer.push(depq.getResult());
  }
  
  index++;
});

rl.on('close', () => {
  console.log(answer.join('\n'));
  process.exit();
});