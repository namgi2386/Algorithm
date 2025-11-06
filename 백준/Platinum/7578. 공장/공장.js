const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, arrA, arrB] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);
let map = new Map();
for (let i = 0; i < N; i++) {
  map.set(arrA[i], i + 1); // 1-indexed
}
let arr = new Array(N).fill(-1);
for (let i = 0; i < N; i++) {
  arr[i] = map.get(arrB[i]);
}
// console.log("arr", arr);

const tree = Array(4 * N).fill(0);

function update(node, start, end, idx) {
  if (idx < start || idx > end) return;
  tree[node]++;
  if (start === end) return;
  const mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, idx); // 왼쪽 탐색
  update(node * 2 + 1, mid + 1, end, idx); // 오른쪽 탐색
}
function query(node, start, end, left, right) {
  if (right < start || end < left) return 0;
  if (left <= start && end <= right) return tree[node];

  const mid = Math.floor((start + end) / 2);
  return (
    query(node * 2, start, mid, left, right) +
    query(node * 2 + 1, mid + 1, end, left, right)
  );
}
let answer = 0;
for (let i = 0; i < N; i++) {
  const position = arr[i];
  if (position < N) {
    answer += query(1, 1, N, position + 1, N);
  }
  update(1, 1, N, position);
}
console.log(answer);
