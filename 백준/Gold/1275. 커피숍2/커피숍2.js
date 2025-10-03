const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, initArr, ...gameArr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let [N, M] = initN;
initArr = [0, ...initArr]; // 1-indexed

// 합 segment tree
let tree = Array(4 * N).fill(0);

function build(node, start, end) {
  if (start === end) {
    tree[node] = initArr[start];
    return;
  }
  let mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}
function update(node, start, end, idx, value) {
  // console.log("update:", node, start, end, idx, value);

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
function query(node, start, end, rs, re) {
  if (start > re || end < rs) return 0;
  if (start >= rs && end <= re) return tree[node];
  let mid = Math.floor((start + end) / 2);
  let left = query(node * 2, start, mid, rs, re);
  let right = query(node * 2 + 1, mid + 1, end, rs, re);
  return left + right;
}

build(1, 1, N);
// console.log("init:", tree);
let answer = [];
for (let i = 0; i < M; i++) {
  let [s, e, idx, value] = gameArr[i];
  if (s > e) [s, e] = [e, s];
  answer.push(query(1, 1, N, s, e));
  update(1, 1, N, idx, value);
  // console.log("in:", tree);
}
console.log(answer.join("\n"));

//        15,
//    6,         9,
//  3    3,    4   5,
// 1,2

//        14,
//    5,         9,
//  2    3,    4   5,
// 0,2

// $ node jsolution.js
// init: [
//   0, 15, 6, 9, 3, 3, 4,
//   5,  1, 2, 0, 0, 0, 0,
//   0,  0, 0, 0, 0, 0
// ]
// update: 1 1 5 1 0
// update: 2 1 3 1 0
// update: 4 1 2 1 0
// update: 8 1 1 1 0
// update: 9 2 2 1 0
// update: 5 3 3 1 0
// update: 3 4 5 1 0
// in: [
//   0, 14, 5, 9, 2, 3, 4,
//   5,  0, 2, 0, 0, 0, 0,
//   0,  0, 0, 0, 0, 0
// ]
// update: 1 1 5 4 1
// update: 2 1 3 4 1
// update: 3 4 5 4 1
// update: 6 4 4 4 1
// update: 7 5 5 4 1
// in: [
//   0, 11, 5, 6, 2, 3, 1,
//   5,  0, 2, 0, 0, 0, 0,
//   0,  0, 0, 0, 0, 0
// ]
// 15
// 12
