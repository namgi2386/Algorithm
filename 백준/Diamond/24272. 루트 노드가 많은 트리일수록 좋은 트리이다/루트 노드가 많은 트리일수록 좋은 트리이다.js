const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue.split("\n").map((c) => c.trim().split(" "));
N = Number(N);
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  let [a, _, b] = arr[i];
  a = Number(a);
  b = Number(b);
  graph[a].push(b);
  graph[b].push(a);
}
const inIdx = new Array(N + 1).fill(0);
const outIdx = new Array(N + 1).fill(0);
let idxTimer = 1;
function oil(prev, node) {
  inIdx[node] = idxTimer++;
  for (const next of graph[node]) {
    if (next === prev) continue;
    oil(node, next);
  }
  outIdx[node] = idxTimer - 1;
}
oil(0, 1);

const tree = Array.from({ length: 4 * N }, () => [0, 0]);
const lazy = new Array(4 * N).fill(0);

function propagation(node, start, end) {
  if (lazy[node] === 0) return;
  tree[node][0] += lazy[node];
  tree[node][1] += lazy[node];
  if (start !== end) {
    lazy[node * 2] += lazy[node];
    lazy[node * 2 + 1] += lazy[node];
  }
  lazy[node] = 0;
}

function update(node, start, end, ls, rs, value) {
  propagation(node, start, end);
  if (rs < start || end < ls) return;
  if (ls <= start && end <= rs) {
    lazy[node] += value;
    propagation(node, start, end);
    return;
  }
  // if (start === end) {
  //   if (tree[node][1] === 0 && value === -1) {
  //     return;
  //   }
  //   tree[node][0] += value;
  //   tree[node][1] += value;
  //   return;
  // }
  const mid = Math.floor((start + end) / 2);
  update(node * 2, start, mid, ls, rs, value); // 1 3 , 1 2 , 1 1, 4 4
  update(node * 2 + 1, mid + 1, end, ls, rs, value); // 4 5 , 3 3 , 5 5
  propagation(node * 2, start, mid);
  propagation(node * 2 + 1, mid + 1, end);
  tree[node][0] = Math.max(tree[node * 2][0], tree[node * 2 + 1][0]);
  tree[node][1] = Math.min(tree[node * 2][1], tree[node * 2 + 1][1]);
}
function query(node, start, end, value) {
  propagation(node, start, end);
  if (tree[node][0] < value) return 0;
  if (tree[node][0] === value && tree[node][1] === value)
    return end - start + 1;
  if (start === end) return 0;
  const mid = Math.floor((start + end) / 2);
  return (
    query(node * 2, start, mid, value) +
    query(node * 2 + 1, mid + 1, end, value)
  );
}
function findOp(aIdx, bIdx, op) {
  if (aIdx < bIdx) {
    if (op === "->") {
      op = "in";
    } else if (op === "<-") {
      op = "out";
    } else if (op === "--") {
      op = "on";
    }
  } else {
    if (op === "<-") {
      op = "in";
    } else if (op === "->") {
      op = "out";
    } else if (op === "--") {
      op = "on";
    }
  }
  return op;
}
// ------------------------------------------------------------------------------------------------------
const graphWay = new Array(N + 1);
let totalRoluesCnt = 0; // 현재 반영중인 규칙 수 (전부다 만족할때, 가능한 node)
for (let i = 0; i < N - 1; i++) {
  let [a, op, b] = arr[i];
  a = Number(a);
  b = Number(b);
  const [aIdx, bIdx] = [inIdx[a], inIdx[b]];
  op = findOp(aIdx, bIdx, op);
  const childIdxForDiff = inIdx[a] > inIdx[b] ? a : b;
  const childIdx = Math.max(aIdx, bIdx);
  // 높은 노드 (자식노드) 기준으로 방향기록
  const startIdx = inIdx[childIdxForDiff];
  const endIdx = outIdx[childIdxForDiff];
  graphWay[childIdx] = op;

  if (op === "in") {
    // 역방향
    totalRoluesCnt++;
    update(1, 1, N, 1, startIdx === 1 ? 1 : startIdx - 1, 1);
    update(1, 1, N, endIdx === N ? N : endIdx + 1, N, 1);
  } else if (op === "out") {
    // 정방향
    totalRoluesCnt++;
    update(1, 1, N, startIdx, endIdx, 1);
  }
}
// 시작하자
const M = Number(arr[N - 1]);
for (let i = N; i < N + M; i++) {
  let [a, initOp, b] = arr[i];
  a = Number(a);
  b = Number(b);
  const [aIdx, bIdx] = [inIdx[a], inIdx[b]];
  op = findOp(aIdx, bIdx, initOp);
  const childIdxForDiff = inIdx[a] > inIdx[b] ? a : b;
  const childIdx = Math.max(aIdx, bIdx);
  // 높은 노드 (자식노드) 기준으로 방향기록
  const startIdx = inIdx[childIdxForDiff];
  const endIdx = outIdx[childIdxForDiff];
  const prevOp = graphWay[childIdx];
  // if (op === prevOp) continue;
  if (op === "on") totalRoluesCnt--;
  if (prevOp === "on") totalRoluesCnt++;
  graphWay[childIdx] = op;

  if (op === "on") {
    // 삭제
    if (prevOp === "in") {
      // 역방향 이었음
      update(1, 1, N, 1, startIdx - 1, -1);
      update(1, 1, N, endIdx + 1, N, -1);
    } else if (prevOp === "out") {
      // 정방향 이었음
      update(1, 1, N, startIdx, endIdx, -1); // 자식들 도르마무
    }
  } else if (op === "in") {
    // 역방향
    if (prevOp === "on") {
      // 없었음
      update(1, 1, N, 1, startIdx - 1, 1);
      update(1, 1, N, endIdx + 1, N, 1);
    } else if (prevOp === "out") {
      // 정방향 이었음
      update(1, 1, N, 1, startIdx - 1, 1);
      update(1, 1, N, endIdx + 1, N, 1);
      update(1, 1, N, startIdx, endIdx, -1); // 자식들 도르마무
    }
  } else if (op === "out") {
    // 정방향
    if (prevOp === "on") {
      // 없었음
      update(1, 1, N, startIdx, endIdx, 1); // 자식들 도르마무
    } else if (prevOp === "in") {
      // 역방향 이었음
      update(1, 1, N, 1, startIdx - 1, -1);
      update(1, 1, N, endIdx + 1, N, -1);
      update(1, 1, N, startIdx, endIdx, 1);
    }
  }

  console.log(query(1, 1, N, totalRoluesCnt));
}
