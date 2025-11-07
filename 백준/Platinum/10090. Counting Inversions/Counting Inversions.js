const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

N = Number(N);

let answer = 0;
const tree = new Array(N * 4).fill(0);
function update(node, start, end, idx) {
  if (start > idx || end < idx) return;
  tree[node]++;
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  update(node * 2, mid + 1, end, idx);
  update(node * 2 + 1, start, mid, idx);
}
function query(node, start, end, left, right) {
  if (start > right || end < left) return 0;
  if (start >= left && end <= right) return tree[node];
  const mid = Math.floor((start + end) / 2);
  return (
    query(node * 2, mid + 1, end, left, right) +
    query(node * 2 + 1, start, mid, left, right)
  );
}
for (let i = 0; i < N; i++) {
  const num = arr[i];
  answer += query(1, 1, N, num + 1, N);
  update(1, 1, N, num);
}
console.log(answer);
