const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
const [N, M] = lines[0].split(" ").map(Number);

// 1. 트리 구성
const initTree = Array.from({ length: N + 1 }, () => []);
const parents = lines[1].split(" ").map(Number);

for (let i = 1; i < N; i++) {
  initTree[parents[i]].push(i + 1);
}

// 2. DFS로 구간 정보 획득
let timer = 0;
const in_time = new Array(N + 1).fill(0);
const out_time = new Array(N + 1).fill(0);

function dfs(node) {
  in_time[node] = ++timer;
  for (const child of initTree[node]) {
    dfs(child);
  }
  out_time[node] = timer;
}

dfs(1);

// 합 세그먼트 트리
let tree = new Array(4 * N).fill(0);
// lazy배열 추가 (지연업데이트)
let lazy = new Array(4 * N).fill(0);

//>>>>>lazy값 전파하는 함수>>>>>>>>>
// 현재위치만 적용해두고 하위 node는 나중에 처리하자
function propagate(node, start, end) {
  if (lazy[node] === 0) return; // lazy없음
  // 현재 node만 적용시킴
  tree[node] += lazy[node];
  // 자식엔 lazy만 전파해둠
  if (start !== end) {
    lazy[node * 2] += lazy[node];
    lazy[node * 2 + 1] += lazy[node];
  }
  lazy[node] = 0; // lazy초기화
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
  const mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, rs, re, value);
  update(node * 2 + 1, mid + 1, end, rs, re, value);
}

function query(node, start, end, idx) {
  propagate(node, start, end);
  if (start === end) return tree[node];
  const mid = Math.floor((start + end) / 2);
  if (idx <= mid) {
    return query(node * 2, start, mid, idx);
  } else {
    return query(node * 2 + 1, mid + 1, end, idx);
  }
}
// console.log(in_time);
// console.log(out_time);

let answer = [];
for (let i = 0; i < M; i++) {
  const line = lines[2 + i].split(" ").map(Number);
  if (line[0] === 1) {
    const [idx, point] = [line[1], line[2]];
    // console.log("up", idx, in_time[idx], out_time[idx], point);

    update(1, 1, N, in_time[idx], out_time[idx], point);
    // update
  } else {
    const idx = line[1];
    answer.push(query(1, 1, N, in_time[idx]));
    // query
  }
}
console.log(answer.join("\n"));
