const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [N, initArr, M, ...variArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
M = Number(M);
initArr = initArr.map((c) => c - 1);
let answerArr = [...initArr].sort((a, b) => a - b);

let graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  let [s, e, w] = variArr[i];
  graph[s - 1].push([e - 1, w]);
  graph[e - 1].push([s - 1, w]);
}

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
      if (this.heap[parentIdx][1] <= this.heap[idx][1]) break;
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
      if (this.heap[idx][1] <= this.heap[small][1]) break;
      this.swap(idx, small);
      idx = small;
    }
  }
  size() {
    return this.heap.length;
  }
}

// console.log(initArr);
// console.log(variArr.join("\n"));
// console.log(answerArr);
// console.log("--");

// 0321
// 0 1 4
// 1 2 3
// 2 3 2
// 0 3 10

function run(end) {
  let dist = new Map();
  let heap = new MinHeap();

  // 시작 상태는 비용 0으로 설정
  let startState = initArr.join("");
  dist.set(startState, 0);
  heap.push([startState, 0, -1, -1]); // 초기 상태는 prev 정보 없음

  while (heap.size() > 0) {
    let [position, cost] = heap.pop();

    // 이미 더 좋은 경로로 방문했으면 스킵
    if (dist.get(position) < cost) continue;

    if (position === end) return cost;

    let arr = position.split("").map(Number);

    // 모든 가능한 스왑 탐색
    for (let i = 0; i < M; i++) {
      let [s, e, w] = variArr[i];
      s--;
      e--; // 0-indexed로 변환

      let tempArr = [...arr];
      [tempArr[s], tempArr[e]] = [tempArr[e], tempArr[s]];
      let nextPosition = tempArr.join("");
      let nextCost = cost + w;

      // 새로운 상태이거나 더 적은 비용으로 도달 가능하면
      if (!dist.has(nextPosition) || dist.get(nextPosition) > nextCost) {
        dist.set(nextPosition, nextCost);
        heap.push([nextPosition, nextCost]);
      }
    }
  }
  return -1;
}

console.log(run(answerArr.join("")));

/**
 *
 *
 *
 *
 *
 *
 *
 */

// let map = new Map();
// map.set(initArr.join(""), 0);

// function swap(s, e) {
//   [initArr[s - 1], initArr[e - 1]] = [initArr[e - 1], initArr[s - 1]];
// }

// function fnc(prevIdx, prevW) {
//   for (let i = 0; i < M; i++) {
//     if (i === prevIdx) continue;
//     let [s, e, w] = variArr[i];
//     swap(s, e);
//     let num = initArr.join("");
//     let prevmap = map.get(num);
//     console.log("in:", num, prevmap, prevW, w, "?", i, s, e, w);

//     if (prevmap && prevmap > prevW + w) {
//       // console.log("1");
//       map.set(num, prevW + w);
//       fnc(i, prevW + w);
//     } else if (prevmap === undefined) {
//       // console.log("2");
//       map.set(num, prevW + w);
//       fnc(i, prevW + w);
//     }
//     swap(s, e);
//   }
// }

// // 출력
// fnc(-1, 0);
// // console.log(map);

// let answer = map.get(answerArr.join("")) || -1;
// console.log(answer);
