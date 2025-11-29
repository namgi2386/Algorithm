const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, items, ...initRoadsInfo] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));

const [N, maxRange, M] = initN;
const graph = Array.from({ length: N + 1 }, () => []);
const searchPoint = new Array(N + 1).fill(0);
for (let i = 0; i < M; i++) {
  const [a, b, cost] = initRoadsInfo[i];
  graph[a].push([b, cost]);
  graph[b].push([a, cost]);
}
function dfs(node, visited, health, initialNode) {
  for (const next of graph[node]) {
    const [nextIdx, nextCost] = next;
    if (visited[nextIdx] > health) continue;
    if (nextCost > health) continue;
    if (visited[nextIdx] === -1) {
      searchPoint[initialNode] += items[nextIdx - 1];
    }
    visited[nextIdx] = health - nextCost;
    dfs(nextIdx, visited, health - nextCost, initialNode);
  }
}
let answer = 0;
for (let s = 1; s < N + 1; s++) {
  const visited = new Array(N + 1).fill(-1);
  visited[s] = maxRange;
  searchPoint[s] += items[s - 1];
  dfs(s, visited, maxRange, s);
  // console.log("in:", s, searchPoint[s]);
  answer = Math.max(answer, searchPoint[s]);
}
console.log(answer);
