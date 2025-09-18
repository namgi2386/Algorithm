const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
let [initNums, arr] = inputValue.split("\n").map((c) => c.trim());
const [N, M] = initNums.split(" ").map(Number);

arr = arr
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

const stack = [];
const answer = [];
const visited = [];
function dfs(level) {
  if (level === M) {
    answer.push(stack.join(" "));
    return;
  }
  for (let i = 0; i < N; i++) {
    if (!visited[i]) {
      stack.push(arr[i]);
      visited[i] = true;
      dfs(level + 1);
      visited[i] = false;
      stack.pop();
    }
  }
}
dfs(0);
console.log(answer.join("\n"));
