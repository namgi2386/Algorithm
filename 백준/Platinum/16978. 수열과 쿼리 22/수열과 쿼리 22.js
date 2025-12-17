const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, board, M, ...initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));

N = Number(N);
M = Number(M);

class Queue {
  constructor() {
    this.queue = [];
    this.start = 0;
    this.end = 0;
  }
  push(val) {
    this.queue.push(val);
    this.end++;
  }
  shift() {
    if (this.end === this.start) return null;
    return this.queue[this.start++];
  }
  size() {
    return this.end - this.start;
  }
}
class QueryList {
  constructor() {
    this.list = [];
    this.idx = 0;
  }
  push(val) {
    const [_, a, b, c] = val;
    this.list.push([this.idx++, a, b, c]);
  }
  pop(index) {
    return this.list[index];
  }
  sort() {
    this.list.sort((a, b) => a[1] - b[1]);
  }
  size() {
    return this.list.length;
  }
}

const tree = new Array(N * 4).fill(0);

const updateQueue = new Queue();
const querylist = new QueryList();

function build(node, start, end) {
  if (start === end) {
    tree[node] = board[start - 1];
    return;
  }
  let mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}
function update(node, start, end, idx, value) {
  if (start > idx || end < idx) return;
  if (start === end) {
    tree[node] = value;
    return;
  }
  let mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, idx, value);
  update(node * 2 + 1, mid + 1, end, idx, value);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}
function query(node, start, end, left, right) {
  if (start > right || end < left) return 0;
  if (start >= left && end <= right) return tree[node];
  let mid = Math.floor((start + end) / 2);
  return (
    query(node * 2, start, mid, left, right) +
    query(node * 2 + 1, mid + 1, end, left, right)
  );
}

build(1, 1, N);
for (let i = 0; i < M; i++) {
  const line = initArr[i];
  line[0] === 1 ? updateQueue.push(line) : querylist.push(line);
}
let answer = new Array(querylist.size()).fill(0);
querylist.sort();
let updatedLev = 0;

for (let i = 0; i < querylist.size(); i++) {
  const [index, lev, s, e] = querylist.pop(i);

  while (lev !== updatedLev) {
    const [_, updateIdx, updateValue] = updateQueue.shift();

    update(1, 1, N, updateIdx, updateValue);
    updatedLev++;
  }
  answer[index] = query(1, 1, N, s, e);
}

console.log(answer.join("\n"));
