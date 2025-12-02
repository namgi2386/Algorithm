const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

const [initN, initArr] = inputValue
  .split("\n")
  .map((c) => c.split(" ").map(Number));
const [N, M] = initN;
initArr.sort((a, b) => a - b);
function dfs() {
  if (result.length === M) {
    answer.add(result.join(" "));
    return;
  }
  for (let i = 0; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    result.push(initArr[i]);
    dfs();
    visited[i] = false;
    result.pop();
  }
}

const visited = new Array(N).fill(false);
const result = [];
const answer = new Set();
dfs();
console.log([...answer].join("\n"));
