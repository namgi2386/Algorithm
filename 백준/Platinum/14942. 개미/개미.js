const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue.split("\n");
N = Number(N);
const energy = new Array(N + 1).fill(0);
for (let i = 0; i < N; i++) {
  energy[i + 1] = Number(initArr[i]);
}
class Graph {
  constructor() {
    this.map = new Map();
  }
  set(a, b, c) {
    this.map.set(`${a},${b}`, c);
  }
  get(a, b) {
    return this.map.get(`${a},${b}`) || this.map.get(`${b},${a}`) || null;
  }
}
let graph = new Graph();
let graph2 = Array.from({ length: N + 1 }, () => []);
for (let i = N; i < 2 * N - 1; i++) {
  const [a, b, c] = initArr[i].split(" ").map(Number);
  graph.set(a, b, c);
  graph2[a].push(b);
  graph2[b].push(a);
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
const queue = new Queue();
const parent = Array(N + 1).fill(-1);

function bfs() {
  queue.push([1, -1]);
  while (queue.size() > 0) {
    const [node, papa] = queue.shift();
    parent[node] = papa;
    for (const next of graph2[node]) {
      if (next === papa) continue;
      queue.push([next, node]);
    }
  }
}
bfs();

function find(idx) {
  let myEnergy = energy[idx];
  while (true) {
    if (idx === 1) return 1;
    const papa = parent[idx];
    const nextPoint = graph.get(idx, papa);
    if (nextPoint > myEnergy) return idx;
    myEnergy -= nextPoint;
    idx = papa;
  }
}
let answer = [];
for (let i = 1; i < N + 1; i++) {
  answer.push(find(i));
}
console.log(answer.join("\n"));
