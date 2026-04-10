const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, ...queries] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < M; i++) {
  const [a, b] = queries[i];
  graph[a].push(b);
}
const visited = new Array(N + 1).fill(0);
const isFinished = new Array(N + 1).fill(false);
const answer = [];

let time = 0;
const stack = [];
const dfs = (node) => {
  visited[node] = ++time;
  stack.push(node);
  let parent = visited[node];
  for (const next of graph[node]) {
    if (visited[next] === 0) {
      // 첫방문
      parent = Math.min(parent, dfs(next));
    } else {
      // 재방문
      if (!isFinished[next]) {
        parent = Math.min(parent, visited[next]);
      }
    }
  }
  if (parent === visited[node]) {
    // 이 노드가 최초 노드
    const scc = [];
    while (true) {
      const peekNode = stack.pop();
      isFinished[peekNode] = true;
      scc.push(peekNode);
      if (peekNode === node) break;
    }
    answer.push(scc.sort((a, b) => a - b));
    answer[answer.length - 1].push(-1);
  }
  return parent;
};

for (let i = 1; i <= N; i++) {
  if (visited[i] !== 0) continue;
  dfs(i);
}
console.log(answer.length);
answer.sort((a, b) => a[0] - b[0]);
console.log(answer.map((c) => c.join(" ")).join("\n"));
