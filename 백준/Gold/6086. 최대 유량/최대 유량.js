const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue.split("\n").map((c) => c.trim().split(" "));
N = Number(N);

function swichASCII(str) {
  const code = str.charCodeAt(0);
  if (code >= 65 && code <= 90) {  // 대문자 A-Z
    return code - 65;  // 0~25
  } else {  // 소문자 a-z
    return code - 97 + 26;  // 26~51
  }
}

class Queue {
  constructor() {
    this.queue = new Map();
    this.peek = 0;
    this.idx = 0;
  }
  push(val) {
    this.queue.set(this.idx++, val);
  }
  shift() {
    if (this.peek === this.idx) return null;
    return this.queue.get(this.peek++);
  }
  size() {
    return this.idx - this.peek;
  }
}

let graph = Array.from({ length: 52 }, () => new Array(52).fill(0));
for (let i = 0; i < N; i++) {
  const [a, b, cost] = initArr[i];
  const [asciiA, asciiB] = [swichASCII(a), swichASCII(b)];
  graph[asciiA][asciiB] += Number(cost);
  graph[asciiB][asciiA] += Number(cost);
}

function findWay(start, end) {
  let parent = new Array(52).fill(-1);
  let visited = new Array(52).fill(false);
  visited[start] = true;
  let queue = new Queue();
  queue.push(start);
  while (queue.size() > 0) {
    const position = queue.shift();
    if (position === end) return parent;
    for (let i = 0; i < 52; i++) {
      const next = graph[position][i];

      if (next === 0) continue;
      if (visited[i]) continue;

      parent[i] = position;
      visited[i] = true;
      queue.push(i);
    }
  }
  return -1;
}

function fnc() {
  let parent = findWay(swichASCII("A"), swichASCII("Z"));
  if (parent === -1) return -1;
  let position = swichASCII("Z");
  let minCost = Infinity;
  let visited = new Set();
  while (true) {
    const prevPosition = parent[position];

    if (visited.has(prevPosition) || prevPosition === -1) {
      minCost = -1;
      break;
    }
    visited.add(prevPosition);
    minCost = Math.min(minCost, graph[prevPosition][position]);
    position = prevPosition;
    if (prevPosition === 0) break;
  }
  position = swichASCII("Z");
  visited = new Set();
  while (true) {
    const prevPosition = parent[position];

    if (visited.has(prevPosition) || prevPosition === -1) {
      break;
    }
    visited.add(prevPosition);
    graph[prevPosition][position] -= minCost;
    graph[position][prevPosition] += minCost;
    position = prevPosition;
    if (prevPosition === 0) break;
  }
  return minCost;
}
let answer = 0;
while (true) {
  let minCost = fnc();
  if (minCost === -1) break;
  answer += minCost;
}
console.log(answer);
