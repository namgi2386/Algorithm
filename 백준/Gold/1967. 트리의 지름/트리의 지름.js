const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [N, ...initArr] = inputValue.split("\n").map((c) => c.trim());
N = Number(N);

// 인접리스트 방식으로 바꾸자
let graph = Array.from({ length: N + 1 }).map(() => []);
for (let i = 0; i < N - 1; i++) {
  let [s, e, w] = initArr[i].split(" ").map(Number);
  graph[s].push([e, w]);
  graph[e].push([s, w]);
}

function dfs(initPosition) {
  let visited = new Array(N + 1).fill(false);
  let stack = [[initPosition, 0]]; // [노드, 누적거리]
  visited[initPosition] = true;
  let maximumLength = 0;
  let position = initPosition;
  while (stack.length > 0) {
    let [node, sum] = stack.pop();
    if (sum > maximumLength) {
      maximumLength = sum;
      position = node;
    }
    for (let [t, w] of graph[node]) {
      if (!visited[t]) {
        visited[t] = true;
        stack.push([t, sum + w]);
      }
    }
  }
  return [position, maximumLength];
}

//1차실행(1번node부터 출발)
let [lastPosition, maximumLength] = dfs(1);
//2차실행 (lastPosition로부터 출발)
let [_, answer] = dfs(lastPosition);
console.log(answer);
