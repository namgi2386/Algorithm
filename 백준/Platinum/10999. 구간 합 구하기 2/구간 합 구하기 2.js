const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());

let [N, M, K] = initN.split(" ").map(Number);
let arr = [0n, ...initArr.slice(0, N).map(BigInt)]; // 1-indexed
let variArr = initArr.slice(N).map((c) => c.split(" ").map(Number));

// 합 세그먼트 트리
let tree = Array(4 * N).fill(0n);
// lazy배열 추가 (지연업데이트)
let lazy = Array(4 * N).fill(0n);

function build(node, start, end) {
  if (start === end) {
    tree[node] = arr[start];
    return;
  }
  let mid = Math.floor((start + end) / 2);
  build(node * 2, start, mid);
  build(node * 2 + 1, mid + 1, end);
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

//>>>>>lazy값 전파하는 함수>>>>>>>>>
// 현재위치만 적용해두고 하위 node는 나중에 처리하자
function propagate(node, start, end) {
  if (lazy[node] === 0n) return; // lazy없음
  // 현재 node만 적용시킴
  tree[node] += lazy[node] * BigInt(end - start + 1);
  // 자식엔 lazy만 전파해둠
  if (start !== end) {
    lazy[node * 2] += lazy[node];
    lazy[node * 2 + 1] += lazy[node];
  }
  lazy[node] = 0n; // lazy초기화
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

function update(node, start, end, rs, re, value) {
  propagate(node, start, end); // 현재 node lazy부터 처리
  if (start > re || end < rs) return;
  //완벽포함 상태일때는 lazy에 미뤄두고 return
  if (rs <= start && end <= re) {
    lazy[node] += value;
    propagate(node, start, end); // 바로 반영
    return;
  }
  let mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, rs, re, value);
  update(node * 2 + 1, mid + 1, end, rs, re, value);
  propagate(node * 2, start, mid); // 
  propagate(node * 2 + 1, mid + 1, end); // 
  tree[node] = tree[node * 2] + tree[node * 2 + 1];
}
//          [1-8]
//        /       \
//       /         \
//    [1-4]        [5-8]
//    /   \         /  \
// [1-2]  [3-4]  [5-6]  [7-8]
//  / \    / \    / \    / \
// 1   2  3   4  5   6  7   8  (단말노드)
function query(node, start, end, rs, re) {
  propagate(node, start, end);
  if (start > re || end < rs) return 0n;
  if (start >= rs && end <= re) return tree[node];
  let mid = Math.floor((start + end) / 2);
  let leftSum = query(node * 2, start, mid, rs, re);
  let rightSum = query(node * 2 + 1, mid + 1, end, rs, re);
  return leftSum + rightSum;
}

build(1, 1, N);
let answer = [];

for (let i = 0; i < M + K; i++) {
  let vari = variArr[i];
  if (vari[0] === 1) {
    let [s, e, v] = [vari[1], vari[2], BigInt(vari[3])];
    update(1, 1, N, s, e, v);
  } else {
    let [s, e] = [vari[1], vari[2]];
    answer.push(query(1, 1, N, s, e));
  }
}
// console.log(tree);

console.log(answer.join("\n"));
