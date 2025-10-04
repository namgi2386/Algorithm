const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);

const BM = 1000000;
tree = Array(4 * BM).fill(0);

function update(node, start, end, index, value) {
  if (start > index || end < index) return;
  if (start === end) {
    tree[node] += value;
    if (tree[node] < 0) tree[node] = 0;
    return;
  }
  let mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, index, value);
  update(node * 2 + 1, mid + 1, end, index, value);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}
function findKth(node, start, end, kth) {
  if (start === end) {
    update(1, 1, BM, start, -1);
    return start;
  }
  let mid = Math.floor((start + end) / 2);
  let leftCount = tree[node * 2];
  if (leftCount >= kth) {
    // 왼쪽 노드가 정답
    return findKth(node * 2, start, mid, kth);
  } else {
    // 오른쪽 노드가 정답
    return findKth(node * 2 + 1, mid + 1, end, kth - leftCount);
  }
}

let answer = [];
for (let i = 0; i < N; i++) {
  if (arr[i][0] === 2) {
    let [_, candyValue, candyCnt] = arr[i];
    update(1, 1, BM, candyValue, candyCnt);
  } else {
    let searchingIndex = arr[i][1];
    // console.log(i, searchingIndex, , answer);
    answer.push(findKth(1, 1, BM, searchingIndex));
  }
}
console.log(answer.join("\n"));
