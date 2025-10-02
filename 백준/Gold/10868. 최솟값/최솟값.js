const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());

let [N, M] = initN.split(" ").map(Number);
let arr = [0n, ...initArr.slice(0, N).map(BigInt)]; // 1-indexed
let variArr = initArr.slice(N).map((c) => c.split(" ").map(Number));

// 최솟값 세그먼트 트리를 만들자
const tree = new Array(4 * N).fill(0n);

function build(node, start, end) {
  if (start === end) {
    tree[node] = arr[start];
    return;
  }
  let mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  tree[node] =
    tree[node * 2] <= tree[node * 2 + 1] ? tree[node * 2] : tree[node * 2 + 1];
}
function query(node, start, end, rs, re) {
  if (start > re || end < rs) return Infinity;
  if (start >= rs && end <= re) return tree[node];
  let mid = Math.floor((start + end) / 2);
  let left = query(node * 2, start, mid, rs, re);
  let right = query(node * 2 + 1, mid + 1, end, rs, re);

  return left <= right ? left : right;
}

build(1, 1, N);

let answer = [];

for (let i = 0; i < M; i++) {
  const [s, e] = variArr[i];
  answer.push(query(1, 1, N, s, e));
}
console.log(answer.join("\n"));
