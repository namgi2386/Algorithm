const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
N = Number(N);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N; i++) {
  const [a, b] = arr[i];
  graph[a].push(b);
  graph[b].push(a);
}

const visited = new Array(N + 1).fill(false);
const finished = new Array(N + 1).fill(false);
const isCycle = new Array(N + 1).fill(false);
const parent = new Array(N + 1).fill(-1);
let cycleEnd = -1;
let cycleStart = -1;

function dfs(node, prev) {
  visited[node] = true;
  parent[node] = prev;

  for (const next of graph[node]) {
    if (next === prev) continue;

    if (!visited[next]) {
      if (dfs(next, node)) return true; // 사이클 찾으면 즉시 종료
    } else if (!finished[next]) {
      // 사이클 발견
      cycleStart = next;
      cycleEnd = node;
      return true;
    }
  }

  finished[node] = true;
  return false;
}

// 사이클 찾기
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    if (dfs(i, -1)) break; // 사이클 찾으면 종료
  }
}

// 부모 배열로 사이클 경로 복원
let position = cycleEnd;
while (position !== cycleStart) {
  isCycle[position] = true;
  position = parent[position];
}
isCycle[cycleStart] = true;

const answer = Array(N + 1).fill(-1);
const queue = [];

for (let i = 1; i <= N; i++) {
  if (isCycle[i]) {
    answer[i] = 0;
    queue.push(i);
  }
}

let idx = 0;
while (idx < queue.length) {
  const node = queue[idx++];

  for (const next of graph[node]) {
    if (answer[next] === -1) {
      answer[next] = answer[node] + 1;
      queue.push(next);
    }
  }
}

console.log(answer.slice(1).join(" "));
