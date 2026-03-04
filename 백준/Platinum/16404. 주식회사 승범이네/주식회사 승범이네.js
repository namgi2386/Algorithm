const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const lines = inputValue.split("\n");
const [N, M] = lines[0].split(" ").map(Number);
const parents = lines[1].split(" ").map(Number);

// 자식배열
const children = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i < N; i++) {
  children[parents[i]].push(i + 1);
}

// dfs 자식구간반영 가능한 형태로 index 재할당
let timer = 0;
const in_time = new Array(N + 1).fill(0); // 시작(본인) index 재할당
const out_time = new Array(N + 1).fill(0); // 끝자식 index

function dfs(node) {
  in_time[node] = ++timer;
  for (const child of children[node]) {
    dfs(child);
  }
  out_time[node] = timer;
}

dfs(1);
// 전파할 자식선정 완료

// 현재 시점에 구간에 반영된 value값
let tree = new Array(4 * N).fill(0);
// 아직 반영되지 않은 구간 value 값
let lazy = new Array(4 * N).fill(0);

function propagate(node, start, end) {
  if (lazy[node] === 0) return;
  tree[node] += lazy[node]; // 나만 처리하고 나머지는 미뤄.
  if (start !== end) {
    lazy[node * 2] += lazy[node];
    lazy[node * 2 + 1] += lazy[node];
  }
  lazy[node] = 0; // 나는 처리 완료
}
function update(node, start, end, left, right, val) {
  propagate(node, start, end); // 남아있던 lazy 처리
  if (start > right || end < left) return;
  // 포함된다면 lazy에 먼저 추가한뒤 현재 구간만 처리
  if (start >= left && end <= right) {
    lazy[node] += val;
    propagate(node, start, end);
    return;
  }
  const mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, left, right, val);
  update(node * 2 + 1, mid + 1, end, left, right, val);
}
function query(node, start, end, idx) {
  propagate(node, start, end); // 남아있던 lazy 처리
  if (start === end) {
    return tree[node];
  }
  const mid = Math.floor((start + end) / 2);
  if (idx <= mid) {
    return query(node * 2, start, mid, idx);
  } else {
    return query(node * 2 + 1, mid + 1, end, idx);
  }
}

let answer = [];
for (let i = 0; i < M; i++) {
  const line = lines[2 + i].split(" ").map(Number);
  if (line[0] === 1) {
    const [idx, point] = [line[1], line[2]];
    update(1, 1, N, in_time[idx], out_time[idx], point);
  } else {
    const idx = line[1];
    answer.push(query(1, 1, N, in_time[idx]));
  }
}
console.log(answer.join("\n"));
