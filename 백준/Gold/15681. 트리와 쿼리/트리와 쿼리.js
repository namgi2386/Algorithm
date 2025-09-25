const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, ...initArr] = inputValue.split("\n").map((c) => c.trim());
let [N, M, _] = initN.split(" ").map(Number);
let arr = initArr.slice(0, N - 1).map((c) => c.split(" ").map(Number));
let variArr = initArr.splice(N - 1).map(Number);

// 트리 구성
let graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < N - 1; i++) {
  let [s, e] = arr[i];
  graph[s].push(e);
  graph[e].push(s);
}

// 서브트리 노드수 계산
let subtreeSize = Array(N + 1).fill(0);
function dfs(node, parent) {
  subtreeSize[node] = 1;
  for (let c of graph[node]) {
    if (c !== parent) {
      dfs(c, node);
      subtreeSize[node] += subtreeSize[c];
    }
  }
}
dfs(M, -1);

let answer = [];
for (let c of variArr) {
  answer.push(subtreeSize[c]);
}
console.log(answer.join("\n"));
