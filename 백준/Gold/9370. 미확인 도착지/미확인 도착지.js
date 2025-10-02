const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [T, ...initArr] = inputValue.split("\n").map((c) => c.trim());
T = Number(T);
initArr = initArr.map((c) => c.split(" ").map(Number));

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
      if (this.heap[parentIdx][1] < this.heap[idx][1]) break;
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
      if (
        right < this.heap.length &&
        this.heap[left][1] > this.heap[right][1]
      ) {
        small = right;
      }
      if (this.heap[idx][1] < this.heap[small][1]) break;
      this.swap(idx, small);
      idx = small;
    }
  }
  size() {
    return this.heap.length;
  }
}

function dijkstra(start, graph, N) {
  const dist = Array(N + 1).fill(Infinity);
  const heap = new MinHeap();

  dist[start] = 0;
  heap.push([start, 0]);

  while (heap.size() > 0) {
    const [ cur, curDist] = heap.pop();

    if (dist[cur] < curDist) continue;

    for (const [next, cost] of graph[cur]) {
      const nextDist = curDist + cost;
      if (nextDist < dist[next]) {
        dist[next] = nextDist;
        heap.push([next, nextDist]);
      }
    }
  }
  return dist;
}

let initIdx = 0;
let answer = [];
for (let tc = 0; tc < T; tc++) {
  let [N, M, candidatesNum] = initArr[initIdx];
  let [start, gap1, gap2] = initArr[initIdx + 1];
  let roadArr = initArr.slice(initIdx + 2, initIdx + 2 + M);
  let cnadidates = [
    ...initArr.slice(initIdx + 2 + M, initIdx + 2 + M + candidatesNum).flat(),
  ];
  initIdx += 2 + M + candidatesNum;
  // console.log("init1:", N, M, candidatesNum, start, gap1, gap2);
  // console.log("init2:", roadArr);
  // console.log("init3:", cnadidates);

  let graph = Array.from({ length: N + 1 }, () => []);
  let gapCost = 0;
  for (let i = 0; i < M; i++) {
    let [s, e, w] = roadArr[i];
    graph[s].push([e, w]);
    graph[e].push([s, w]);
    if ((s === gap1 && e === gap2) || (s === gap2 && e === gap1)) {
      gapCost = w;
    }
  }

  const distFromStart = dijkstra(start, graph, N);
  const distFromGap1 = dijkstra(gap1, graph, N);
  const distFromGap2 = dijkstra(gap2, graph, N);

  let tempAnswer = [];
  for (let i = 0; i < candidatesNum; i++) {
    let fin = cnadidates[i];
    let shortCut = distFromStart[fin];
    let p1 = distFromStart[gap1] + gapCost + distFromGap2[fin];
    let p2 = distFromStart[gap2] + gapCost + distFromGap1[fin];

    if (shortCut !== Infinity && (shortCut === p1 || shortCut === p2)) {
      tempAnswer.push(fin);
    }
  }
  tempAnswer.sort((a, b) => a - b);
  answer.push(tempAnswer.join(" "));
}
console.log(answer.join("\n"));
