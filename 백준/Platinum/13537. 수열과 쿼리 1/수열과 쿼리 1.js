const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, initArr, M, ...variArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
[N, M] = [Number(N), Number(M)];

const tree = Array.from({ length: 4 * (N + 1) }, () => []);
function build(node, start, end) {
  if (start === end) {
    tree[node] = [initArr[start - 1]]; // 리프: 단일 원소
    return;
  }
  const mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
}
function merge(left, right) {
  const result = [];
  let [i, j] = [0, 0];
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);
  return result;
}
function query(node, start, end, left, right, value) {
  if (start > right || end < left) return 0;
  if (start >= left && end <= right) {
    return binarySearch(tree[node], value);
  }
  const mid = Math.floor((start + end) / 2);
  return (
    query(node * 2, start, mid, left, right, value) +
    query(node * 2 + 1, mid + 1, end, left, right, value)
  );
}
function binarySearch(arr, value) {
  let [s, e] = [0, arr.length];
  while (s < e) {
    const mid = Math.floor((s + e) / 2);
    if (arr[mid] <= value) {
      s = mid + 1;
    } else {
      e = mid;
    }
  }
  return arr.length - s;
}

build(1, 1, N);
const answer = [];
for (let i = 0; i < M; i++) {
  const [s, e, value] = variArr[i];
  const result = query(1, 1, N, s, e, value);
  answer.push(result);
}
console.log(answer.join("\n"));
