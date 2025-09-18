const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputValue = require("fs").readFileSync(path).toString().trim();
const [N, M] = inputValue.split(" ").map(Number);

const stack = [];
const answer = [];
const visited = new Array(N + 1).fill(false);
function dfs(level) {
  if (level === M) {
    answer.push(stack.join(" "));
    return;
  }
  for (let i = 1; i < N + 1; i++) {
    if (!visited[i]) {
      stack.push(i);
      visited[i] = true;
      dfs(level + 1);
      stack.pop();
      visited[i] = false;
    }
  }
}
dfs(0);
console.log(answer.join("\n"));
