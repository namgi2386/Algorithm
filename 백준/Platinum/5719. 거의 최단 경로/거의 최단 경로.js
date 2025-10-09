const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let initArr = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let initIdx = 0;

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

while (true) {
  let [N, M] = initArr[initIdx++]; // node 500 간선 10,000
  if (N === 0 && M === 0) return; // tc종료
  let [S, D] = initArr[initIdx++];
  let graph = Array.from({ length: N + 1 }, () => []);
  for (let i = 0; i < M; i++) {
    let [U, V, P] = initArr[initIdx++];
    graph[U].push([V, P]);
  }
  let heap = new MinHeap();

  let parent = Array.from({ length: N + 1 }, () => []);
  let dist = new Array(N + 1).fill(Infinity);
  dist[S] = 0;
  heap.push([S, 0]);
  let initialWeight = Infinity;
  while (heap.size() > 0) {
    let [position, weight] = heap.pop();
    //더이상최단경로 없음
    if (initialWeight < weight) {
      break;
    }
    // 최단경로 추가
    if (position === D) {
      initialWeight = weight;
    }
    for (let i = 0; i < graph[position].length; i++) {
      let [nextP, nextW] = graph[position][i];
      if (dist[nextP] > weight + nextW) {
        heap.push([nextP, weight + nextW]);
        dist[nextP] = weight + nextW;
        parent[nextP] = [position];
      } else if (dist[nextP] === weight + nextW) {
        // heap.push([nextP, weight + nextW]);
        dist[nextP] = weight + nextW;
        parent[nextP].push(position);
      }
    }
  }
  let removedSet = new Set();
  let stack = [D];
  let visited = new Set([D]);
  while (stack.length > 0) {
    let removeA = stack.pop();
    for (let removeB of parent[removeA]) {
      removedSet.add(`${removeB}-${removeA}`);
      if (!visited.has(removeB)) {
        visited.add(removeB);
        stack.push(removeB);
      }
    }
  }

  heap = new MinHeap();
  dist = new Array(N + 1).fill(Infinity);
  dist[S] = 0;
  heap.push([S, 0]);
  let answer = -1;
  while (heap.size() > 0) {
    let [position, weight] = heap.pop();
    if (position === D) {
      if (weight !== Infinity) answer = weight;
      break;
    }
    for (let i = 0; i < graph[position].length; i++) {
      let [nextP, nextW] = graph[position][i];
      if (removedSet.has(`${position}-${nextP}`)) continue;
      if (dist[nextP] >= weight + nextW) {
        heap.push([nextP, weight + nextW]);
        dist[nextP] = weight + nextW;
      }
    }
  }

  console.log(answer);
}
// 이제 , S to D 로의 최단 root들을 제거한 뒤
// 남은 간선들로 최단경로 길이를 구한다.
// 없으면 -1
// 최단간선 어떻게 구하드라

// 다익스트라
// 플로이셜
// 그래프 DP
// DFS
// 힙으로 최단거리뽑으면서 도착지점찾으면 종료할건데, 종료시까지의 이동구간배열을 들고다녀야한다.
// 바로종료하지 말고, 그 다음 요소까지 해보면서 총거리가 이전에 찾은 최단거리와 동일하면 둘 다 최단구간이니깐 계속 반복인데, 더 길다면 그때서야 종료시킴
// 종료시 구간내 간선 graph에서 전부 제거
// 남은놈들가지고 한번더 최단구간 찾기
