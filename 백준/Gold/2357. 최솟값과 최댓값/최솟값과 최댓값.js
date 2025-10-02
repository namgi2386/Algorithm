const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());

let [N, M] = initN.split(" ").map(Number);
let arr = [0n, ...initArr.slice(0, N).map(BigInt)]; // 1-indexed
let variArr = initArr.slice(N).map((c) => c.split(" ").map(Number));

// 최솟값 세그먼트 트리를 만들자
const minTree = new Array(4 * N).fill(0n);
// 최댓값 세그먼트 트리를 만들자
const maxTree = new Array(4 * N).fill(0n);

function build(node, start, end) {
  if (start === end) {
    minTree[node] = arr[start];
    maxTree[node] = arr[start];
    return;
  }
  let mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  minTree[node] =
    minTree[node * 2] <= minTree[node * 2 + 1]
      ? minTree[node * 2]
      : minTree[node * 2 + 1];
  maxTree[node] =
    maxTree[node * 2] >= maxTree[node * 2 + 1]
      ? maxTree[node * 2]
      : maxTree[node * 2 + 1];
}
function minQuery(node, start, end, rs, re) {
  if (start > re || end < rs) return Infinity;
  if (start >= rs && end <= re) return minTree[node];
  let mid = Math.floor((start + end) / 2);
  let left = minQuery(node * 2, start, mid, rs, re);
  let right = minQuery(node * 2 + 1, mid + 1, end, rs, re);

  return left <= right ? left : right;
}
function maxQuery(node, start, end, rs, re) {
  if (start > re || end < rs) return 0;
  if (start >= rs && end <= re) return maxTree[node];
  let mid = Math.floor((start + end) / 2);
  let left = maxQuery(node * 2, start, mid, rs, re);
  let right = maxQuery(node * 2 + 1, mid + 1, end, rs, re);

  return left >= right ? left : right;
}

build(1, 1, N);
// console.log(minTree);
// console.log(maxTree);

let answer = [];

for (let i = 0; i < M; i++) {
  let temp = [];
  const [s, e] = variArr[i];
  temp.push(minQuery(1, 1, N, s, e));
  temp.push(maxQuery(1, 1, N, s, e));
  answer.push(temp.join(" "));
}
console.log(answer.join("\n"));
