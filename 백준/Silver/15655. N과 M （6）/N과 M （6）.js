const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();

let [initN, arr] = inputValue
  .split("\n")
  .map((c) => c.trim().split(" ").map(Number));
arr.sort((a, b) => a - b);
const [N, M] = initN;

const stack = [];
const answer = [];

function dfs(visited, cnt, prev) {
  if (cnt === M) {
    answer.push(stack.join(" "));
    return;
  }
  for (let i = prev; i <= N; i++) {
    const node = 1 << i;
    if (visited & node) continue;
    stack.push(arr[i - 1]);
    dfs(visited | node, cnt + 1, i);
    stack.pop();
  }
}
dfs(0, 0, 1);
console.log(answer.join("\n"));
