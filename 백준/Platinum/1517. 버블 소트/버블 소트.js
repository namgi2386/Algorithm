const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, initArr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);
initArr = initArr.split(" ").map(Number);

let sortedArr = [...initArr].sort((a, b) => a - b);
let map = new Map();
for (let i = 0; i < N; i++) {
  if (!map.has(sortedArr[i])) {
    map.set(sortedArr[i], map.size + 1);
  }
}
let arr = [];
for (let i = 0; i < N; i++) {
  arr.push(map.get(initArr[i]));
}
// console.log(arr); // [ 3, 2, 1, 5, 2, 4 ]

let tree = Array(4 * N).fill(0);

function query(node, start, end, left, right) {
  if (right < start || end < left) return 0;
  if (left <= start && end <= right) return tree[node];

  let mid = Math.floor((start + end) / 2);
  return (
    query(node * 2, start, mid, left, right) +
    query(node * 2 + 1, mid + 1, end, left, right)
  );
}

function update(node, start, end, index) {
  if (start > index || end < index) return;
  if (start === end) {
    tree[node]++;
    return;
  }
  let mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, index);
  update(node * 2 + 1, mid + 1, end, index);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

let answer = 0;
for (let i = N - 1; i >= 0; i--) {
  let num = arr[i];
  if (num > 1) answer += query(1, 1, N, 1, num - 1);
  update(1, 1, N, num);
}
console.log(answer);
