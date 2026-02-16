const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map(Number);
const Max = 500000;
class Seg {
  constructor() {
    this.tree = new Array(500000 * 4).fill(0);
  }
  update(node, start, end, idx) {
    if (idx < start || idx > end) return;
    if (start === end) {
      this.tree[node] = 1;
      return;
    }
    let mid = Math.floor((start + end) / 2);
    this.update(node * 2, start, mid, idx);
    this.update(node * 2 + 1, mid + 1, end, idx);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }
  findKth(node, start, end, idx) {
    if (start >= idx) return this.tree[node];
    if (end < idx) return 0;
    let mid = Math.floor((start + end) / 2);
    return (
      this.findKth(node * 2, start, mid, idx) +
      this.findKth(node * 2 + 1, mid + 1, end, idx)
    );
  }
}

let seg = new Seg();
const sortedArr = [...arr].sort((a, b) => a - b);
const map = new Map();
for (let i = 0; i < N; i++) {
  map.set(sortedArr[i], i + 1);
}
const answer = [];
for (let i = 0; i < N; i++) {
  const num = map.get(arr[i]);
  const result = seg.findKth(1, 1, Max, num);
  seg.update(1, 1, Max, num);

  answer.push(result + 1);
}
console.log(answer.join("\n"));
