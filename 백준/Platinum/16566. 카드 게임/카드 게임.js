const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, myCards, variCards] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
let [N, M, K] = initN;
// - 내카드 정렬
myCards.sort((a, b) => a - b);

// 이분탐색 : 상대카드보다 한단계 높은카드의 index return
function binarySearch(num) {
  let [s, e] = [0, M - 1];
  while (s <= e) {
    let mid = Math.floor((s + e) / 2);
    myCards[mid] > num ? (e = mid - 1) : (s = mid + 1);
  }
  return s;
}

// - 세그먼트트리 초기화 (누적합)
let tree = Array(4 * M).fill(0);

function build(node, start, end) {
  if (start === end) {
    tree[node] = 1;
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
    tree[node] += value;
    if (tree[node] < 0) tree[node] = 0;
    return;
  }
  let mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, idx, value);
  update(node * 2 + 1, mid + 1, end, idx, value);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}
// 세그먼트트리에는 정렬된 내 카드의 사용여부를 1값으로 초기화된 상태로 시작한다.
build(1, 1, M);

// - 해당 index부터 N-1번째 index까지의 카드 중 뽑지않은 가장작은 카드를 찾아야한다.
function findKth(node, start, end, kth) {
  // console.log(tree[node * 2], kth, start, end);
  if (start === end) {
    // - 찾은 후에는 1→0으로 update하여 뽑은카드임을 체크한다.
    update(1, 1, M, start, -1);

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

function sumQuery(node, start, end, left, right) {
  if (right < start || end < left) return 0;
  if (left <= start && end <= right) return tree[node];
  let mid = Math.floor((start + end) / 2);
  return (
    sumQuery(node * 2, start, mid, left, right) +
    sumQuery(node * 2 + 1, mid + 1, end, left, right)
  );
}

let answer = [];
for (let i = 0; i < K; i++) {
  let yourCardNum = variCards[i];
  let startIdx = binarySearch(yourCardNum); // 0-indexed
  let answerIdx = findKth(1, 1, M, sumQuery(1, 1, M, 1, startIdx) + 1); // 1-indexed 반환
  answer.push(myCards[answerIdx - 1]); // 0-indexed로 변환
}
console.log(answer.join("\n"));
