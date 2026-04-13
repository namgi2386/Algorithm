const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, ...queries] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
const [N, M] = initN;
const graph = Array.from({ length: 2 * N + 1 }, () => []);

function getIdx(idx) {
  return idx > 0 ? idx : ~idx + 1 + N;
}
function getNot(idx) {
  return idx > N ? idx - N : idx + N;
}

for (let i = 0; i < M; i++) {
  const [a, b] = queries[i];
  const [tAIdx, tBIdx] = [getIdx(a), getIdx(b)];

  graph[getNot(tAIdx)].push(tBIdx);
  graph[getNot(tBIdx)].push(tAIdx);
}
// console.log(graph.join("|"));
// 1>2 , -2>-1 , 2>3 , -3>-2 , -1>3 , -3>1 , -3>2 , -2>3
// 1>2 , 5>4 , 2>3 , 6>5 , 4>3 , 6>1 , 6>2 , 5>3
// 0 | 1 - 2 | 2 - 3 | 4 - 3 | 5 - 4,3 | 6 - 5,1,2
// 완

const visited = new Array(2 * N + 1).fill(0);
const isFinished = new Array(2 * N + 1).fill(false);
const sccIds = new Array(2 * N + 1).fill(0);
let time = 0;
let sccCount = 0;
const stack = [];
const sccList = [];

function dfs(node) {
  visited[node] = ++time;
  stack.push(node);
  let parent = visited[node];
  for (const next of graph[node]) {
    if (visited[next] === 0) {
      parent = Math.min(parent, dfs(next));
    } else {
      if (isFinished[next]) continue;
      parent = Math.min(parent, visited[next]);
    }
  }
  if (parent === visited[node]) {
    const temp = [];
    sccCount++;
    while (true) {
      const peek = stack.pop();
      isFinished[peek] = true;
      sccIds[peek] = sccCount;
      temp.push(peek);
      if (peek === node) break;
    }
    sccList.push(temp);
  }
  return parent;
}

for (let i = 1; i < 2 * N + 1; i++) {
  if (visited[i] !== 0) continue;
  dfs(i);
}
let answer = true;
for (let i = 1; i < N + 1; i++) {
  if (sccIds[i] === sccIds[i + N]) {
    answer = false;
    break;
  }
}

console.log(answer ? 1 : 0);
// if (answer) {
//   for(const sccc of sccList){

//   }
// }
