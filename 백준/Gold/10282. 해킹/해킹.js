const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [TC, ...initArr] = inputValue.split("\n");
TC = Number(TC.trim());
initArr = initArr.map((c) => c.trim().split(" ").map(Number));
let index = 0;

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
    let index = this.heap.length - 1;
    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);
      if (this.heap[index][1] >= this.heap[parent][1]) {
        return;
      }
      this.swap(index, parent);
      index = parent;
    }
  }
  bubbleDown() {
    let index = 0;
    while (index * 2 + 1 < this.heap.length) {
      const left = index * 2 + 1;
      let smaller = left;
      if (index * 2 + 2 < this.heap.length) {
        const right = index * 2 + 2;
        if (this.heap[left][1] > this.heap[right][1]) {
          smaller = right;
        }
      }
      if (this.heap[smaller][1] >= this.heap[index][1]) {
        return;
      }
      this.swap(index, smaller);
      index = smaller;
    }
  }
  size() {
    return this.heap.length;
  }
}
let answers = [];
for (let tc = 0; tc < TC; tc++) {
  const [N, M, StartIdx] = initArr[index++];
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 0; i < M; i++) {
    const [a, b, s] = initArr[index++];
    graph[b].push([a, s]);
  }
  graph.map((c) => c.sort((a, b) => a[1] - b[1]));
  const queue = new MinHeap();
  const visited = new Array(N + 1).fill(false);
  let [answerCnt, answerTime] = [0, 0];
  queue.push([StartIdx, 0]);
  while (queue.size() > 0) {
    // console.log("prev:", queue);

    const [node, time] = queue.pop();
    if (visited[node]) continue;
    visited[node] = true;
    // console.log(node, time, queue);

    answerCnt++;
    answerTime = Math.max(answerTime, time);
    for (const [next, cost] of graph[node]) {
      if (visited[next]) continue;
      // console.log("in", node, next, time, cost);

      queue.push([next, time + cost]);
    }
  }
  answers.push(`${answerCnt} ${answerTime}`);
}
console.log(answers.join("\n"));
