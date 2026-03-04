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

// 세그먼트 트리 (lazy 없음!)
let tree = new Array(4 * N).fill(0);

// 구간 업데이트 (lazy 없이)
function update(node, start, end, rs, re, value) {
  if (start > re || end < rs) return;
  // 완전히 포함되면 여기 저장하고 끝
  if (rs <= start && end <= re) {
    tree[node] += value;
    return; // 더 내려가지 않음!
  }
  const mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, rs, re, value);
  update(node * 2 + 1, mid + 1, end, rs, re, value);
}

// 포인트 쿼리 (경로상 값 누적)
function search(node, start, end, idx) {
  // 리프 노드 도달
  if (start === end) return tree[node];

  const mid = Math.floor((start + end) / 2);
  if (idx <= mid) {
    return tree[node] + search(node * 2, start, mid, idx);
  } else {
    return tree[node] + search(node * 2 + 1, mid + 1, end, idx);
  }
}

// 쿼리 처리
let answer = [];
for (let i = 0; i < M; i++) {
  const line = lines[2 + i].split(" ").map(Number);
  if (line[0] === 1) {
    const [idx, point] = [line[1], line[2]];
    update(1, 1, N, in_time[idx], out_time[idx], point);
  } else {
    const idx = line[1];
    answer.push(search(1, 1, N, in_time[idx]));
  }
}

process.stdout.write(answer.join("\n"));
