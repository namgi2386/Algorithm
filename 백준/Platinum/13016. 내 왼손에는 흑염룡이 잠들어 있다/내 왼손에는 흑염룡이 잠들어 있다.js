const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));

N = Number(N);

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

let graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N - 1; i++) {
  const [a, b, cost] = initArr[i];
  graph[a].push([b, cost]);
  graph[b].push([a, cost]);
}

function getTree(start) {
  let visited = new Array(N + 1).fill(false);
  visited[start] = true;
  let queue = new Queue();
  queue.push([start, 0]);
  let [maxP, maxC] = [-1, -1];
  while (queue.size() > 0) {
    const [position, pCost] = queue.shift();
    if (position !== start && graph[position].length === 1) {
      if (maxC < pCost) {
        [maxP, maxC] = [position, pCost];
      }
      continue;
    }

    for (let i = 0; i < graph[position].length; i++) {
      const [next, nextCost] = graph[position][i];
      if (visited[next]) continue;
      visited[next] = true;
      queue.push([next, pCost + nextCost]);
    }
  }
  return [maxP, maxC];
}
function getFromTree(start) {
  let visited = new Array(N + 1).fill(false);
  visited[start] = true;
  let queue = new Queue();
  queue.push([start, 0]);
  while (queue.size() > 0) {
    const [position, pCost] = queue.shift();
    if (position !== start && graph[position].length === 1) {
      continue;
    }
    for (let i = 0; i < graph[position].length; i++) {
      const [next, nextCost] = graph[position][i];
      if (visited[next]) continue;
      visited[next] = true;
      lenArr[next] = Math.max(lenArr[next], pCost + nextCost);
      queue.push([next, pCost + nextCost]);
    }
  }
}
const lenArr = new Array(N + 1).fill(0);
const [point1, _] = getTree(1);
const [point2, maxLen] = getTree(point1);
// console.log(point1, point2, maxLen);
getFromTree(point1);
// console.log(lenArr);
getFromTree(point2);
// console.log("ans:");
console.log(lenArr.slice(1).join("\n"));
